// ============================================
// CENTRALIZED PRICING CALCULATOR
// ============================================
// Single source of truth for all price calculations
// Any price change in booking-pricing-engine.ts automatically reflects everywhere

import {
  FLAT_RATES,
  ADDONS,
  BUNDLES,
  HOURLY_RATES,
  SERVICES,
  mapToSizeId,
  calculateAddonPrice,
} from "@/lib/booking-pricing-engine"
import type { BookingState, AddOnSelection } from "@/lib/booking-types"

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface PriceBreakdown {
  basePrice: number | "CUSTOM_QUOTE"
  baseLabel: string
  addons: Array<{
    id: string
    name: string
    price: number
    quantity: number
    time: number
  }>
  addonsSubtotal: number
  bundleDiscount: number
  addonsTotal: number
  subtotal: number | "CUSTOM_QUOTE"
  grandTotal: number | "CUSTOM_QUOTE"
  estimatedMinutes: number
  estimatedHours: number
}

// ============================================
// MAIN CALCULATOR FUNCTION
// ============================================

/**
 * Calculate complete pricing breakdown for current booking state
 * All prices pulled from booking-pricing-engine.ts config
 */
export function calculateBookingPrice(state: BookingState): PriceBreakdown {
  const service = SERVICES[state.serviceId as keyof typeof SERVICES]

  if (!service) {
    throw new Error(`Unknown service: ${state.serviceId}`)
  }

  // ============================================
  // CONSULTATION SERVICES - Custom Quote
  // ============================================
  if (service.type === "consultation") {
    return {
      basePrice: "CUSTOM_QUOTE",
      baseLabel: service.name,
      addons: [],
      addonsSubtotal: 0,
      bundleDiscount: 0,
      addonsTotal: 0,
      subtotal: "CUSTOM_QUOTE",
      grandTotal: "CUSTOM_QUOTE",
      estimatedMinutes: 0,
      estimatedHours: 0,
    }
  }

  // ============================================
  // FLAT RATE SERVICES - Standard/Deep/Move
  // ============================================
  if (service.type === "flat") {
    const { bedrooms, bathrooms } = state.propertyData

    if (bedrooms === null || bathrooms === null) {
      throw new Error("Bedrooms and bathrooms required for flat rate pricing")
    }

    // Get base price from config
    const sizeId = mapToSizeId(bedrooms, bathrooms)
    const flatRate = FLAT_RATES.find((r) => r.sizeId === sizeId && r.service === state.serviceId)

    if (!flatRate) {
      throw new Error(`No pricing found for ${state.serviceId} - ${sizeId}`)
    }

    // Calculate add-ons
    const addonsData = calculateAddonsPrice(state.addOns, bedrooms, state.serviceId as string)

    // Check if bundle is active
    const bundleDiscount = checkBundleDiscount(state.addOns)

    const subtotal = flatRate.price
    const addonsTotal = addonsData.total - bundleDiscount
    const grandTotal = subtotal + addonsTotal

    return {
      basePrice: flatRate.price,
      baseLabel: `${service.name} (${bedrooms}BR/${bathrooms}BA)`,
      addons: addonsData.addons,
      addonsSubtotal: addonsData.total,
      bundleDiscount,
      addonsTotal,
      subtotal,
      grandTotal,
      estimatedMinutes: flatRate.hours * 60 + addonsData.totalMinutes,
      estimatedHours: flatRate.hours + addonsData.totalMinutes / 60,
    }
  }

  // ============================================
  // HOURLY SERVICES - Custom/Organizing
  // ============================================
  if (service.type === "hourly") {
    const { hours, teamSize } = state.propertyData

    if (!hours) {
      throw new Error("Hours required for hourly pricing")
    }

    const hourlyRate = HOURLY_RATES[state.serviceId as keyof typeof HOURLY_RATES]
    if (!hourlyRate) {
      throw new Error(`No hourly rate found for ${state.serviceId}`)
    }

    const totalPrice = hourlyRate * hours * (teamSize || 1)

    return {
      basePrice: totalPrice,
      baseLabel: `${service.name} (${hours}h × ${teamSize || 1} cleaner${(teamSize || 1) > 1 ? "s" : ""})`,
      addons: [],
      addonsSubtotal: 0,
      bundleDiscount: 0,
      addonsTotal: 0,
      subtotal: totalPrice,
      grandTotal: totalPrice,
      estimatedMinutes: hours * 60,
      estimatedHours: hours,
    }
  }

  throw new Error("Invalid service type")
}

// ============================================
// ADD-ONS CALCULATION
// ============================================

function calculateAddonsPrice(
  selectedAddons: AddOnSelection[],
  bedrooms: number,
  serviceId: string,
): {
  addons: Array<{ id: string; name: string; price: number; quantity: number; time: number }>
  total: number
  totalMinutes: number
} {
  const addons: Array<{ id: string; name: string; price: number; quantity: number; time: number }> = []
  let total = 0
  let totalMinutes = 0

  selectedAddons.forEach((addon) => {
    const addonData = ADDONS[addon.id as keyof typeof ADDONS]
    if (!addonData) return

    const quantity = addon.quantity || 1

    // Calculate price using config function
    let price = 0
    let time = 0

    // Special handling for baseboards
    if (addon.id === "baseboards") {
      if (bedrooms <= 2) price = 20
      else if (bedrooms === 3) price = 30
      else price = 40

      // Free for Deep Clean
      if (serviceId === "deep") price = 0

      time = addonData.time
    } else {
      const calculated = calculateAddonPrice(addon.id, quantity, bedrooms)
      price = calculated.price
      time = calculated.time
    }

    addons.push({
      id: addon.id,
      name: addonData.name,
      price,
      quantity,
      time,
    })

    total += price
    totalMinutes += time
  })

  return { addons, total, totalMinutes }
}

// ============================================
// BUNDLE DISCOUNT CALCULATION
// ============================================

function checkBundleDiscount(selectedAddons: AddOnSelection[]): number {
  const bundle = BUNDLES.essentialDeepClean
  const hasAllItems = bundle.items.every((item) => selectedAddons.some((a) => a.id === item))

  return hasAllItems ? bundle.savings : 0
}

// ============================================
// DISPLAY HELPERS
// ============================================

/**
 * Format price for display
 */
export function formatPrice(price: number | "CUSTOM_QUOTE"): string {
  if (price === "CUSTOM_QUOTE") return "Custom Quote"
  return `$${price.toLocaleString()}`
}

/**
 * Format time for display
 */
export function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes} min`

  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (mins === 0) return `${hours}h`
  return `${hours}h ${mins}m`
}

/**
 * Get starting price for service card (from config)
 */
export function getServiceDisplayPrice(serviceId: string): string {
  const service = SERVICES[serviceId as keyof typeof SERVICES]
  return service?.displayPrice || "Custom Quote"
}

/**
 * Check if service has add-ons (from config)
 */
export function serviceHasAddons(serviceId: string): boolean {
  const service = SERVICES[serviceId as keyof typeof SERVICES]
  return service?.hasAddOns || false
}

// ============================================
// VALIDATION
// ============================================

/**
 * Validate that all required data is present for pricing
 */
export function canCalculatePrice(state: BookingState): boolean {
  const service = SERVICES[state.serviceId as keyof typeof SERVICES]
  if (!service) return false

  if (service.type === "flat") {
    return state.propertyData.bedrooms !== null && state.propertyData.bathrooms !== null
  }

  if (service.type === "hourly") {
    return (state.propertyData.hours || 0) > 0
  }

  // Consultation services don't need validation for pricing
  return true
}
