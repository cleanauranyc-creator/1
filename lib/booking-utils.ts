// ============================================
// BOOKING UTILITY FUNCTIONS
// ============================================
// All calculations now use master-config.ts as single source of truth

import type { BookingState, EstimateBreakdown, AddOnSelection } from "./booking-types"
import {
  SERVICES,
  getFlatRate,
  getAddonPrice,
  checkBundleDiscount,
  HOURLY_RATES,
  formatPrice,
  formatTime,
  type ServiceType,
} from "./master-config"

// ============================================
// MAIN ESTIMATE CALCULATION
// ============================================

export function calculateEstimate(state: BookingState): {
  total: number
  totalTime: number
  basePrice: number
  addOnsTotal: number
  breakdown: Array<{ label: string; amount: number; time?: number }>
} {
  // Default empty estimate
  if (!state.serviceId) {
    return {
      total: 0,
      totalTime: 0,
      basePrice: 0,
      addOnsTotal: 0,
      breakdown: [],
    }
  }

  const service = SERVICES[state.serviceId as ServiceType]
  if (!service) {
    return {
      total: 0,
      totalTime: 0,
      basePrice: 0,
      addOnsTotal: 0,
      breakdown: [],
    }
  }

  // CONSULTATION SERVICES - Custom Quote
  if (service.type === "consultation") {
    return {
      total: 0,
      totalTime: 0,
      basePrice: 0,
      addOnsTotal: 0,
      breakdown: [
        {
          label: `${service.name} - Custom Quote`,
          amount: 0,
        },
      ],
    }
  }

  // HOURLY SERVICES - Custom/Organizing
  if (service.type === "hourly") {
    const hours = state.propertyData.hours || 2
    const teamSize = state.propertyData.teamSize || 1
    const rate = HOURLY_RATES[state.serviceId as "custom" | "organizing"]
    const total = hours * rate * teamSize

    return {
      total,
      totalTime: hours * 60,
      basePrice: total,
      addOnsTotal: 0,
      breakdown: [
        {
          label: `${service.name} - ${hours}h × ${teamSize} cleaner${teamSize > 1 ? "s" : ""}`,
          amount: total,
          time: hours * 60,
        },
      ],
    }
  }

  // FLAT RATE SERVICES - Standard/Deep/Move
  if (service.type === "flat") {
    const bedrooms = state.propertyData.bedrooms
    const bathrooms = state.propertyData.bathrooms

    if (bedrooms === null || bathrooms === null) {
      return {
        total: 0,
        totalTime: 0,
        basePrice: 0,
        addOnsTotal: 0,
        breakdown: [],
      }
    }

    // Get base rate from master config
    const flatRate = getFlatRate(state.serviceId as "standard" | "deep" | "move", bedrooms, bathrooms)

    if (!flatRate) {
      return {
        total: 0,
        totalTime: 0,
        basePrice: 0,
        addOnsTotal: 0,
        breakdown: [],
      }
    }

    const basePrice = flatRate.price
    const baseTime = flatRate.hours * 60 // convert to minutes

    const breakdown: Array<{ label: string; amount: number; time?: number }> = []

    breakdown.push({
      label: `${service.name} - ${flatRate.label}`,
      amount: basePrice,
      time: baseTime,
    })

    // Calculate add-ons
    let addOnsTotal = 0
    let addOnsTime = 0

    state.addOns.forEach((addon) => {
      const addonCalc = getAddonPrice(addon.id as any, addon.quantity || 1, bedrooms, state.serviceId as string)

      if (addonCalc.price > 0 || addonCalc.time > 0) {
        addOnsTotal += addonCalc.price
        addOnsTime += addonCalc.time

        breakdown.push({
          label: addon.id + (addon.quantity && addon.quantity > 1 ? ` ×${addon.quantity}` : ""),
          amount: addonCalc.price,
          time: addonCalc.time,
        })
      }
    })

    // Check for bundle discounts
    const bundleDiscount = checkBundleDiscount(state.addOns.map((a) => a.id))
    if (bundleDiscount > 0) {
      addOnsTotal -= bundleDiscount
      breakdown.push({
        label: "Bundle Discount",
        amount: -bundleDiscount,
      })
    }

    return {
      total: basePrice + addOnsTotal,
      totalTime: baseTime + addOnsTime,
      basePrice,
      addOnsTotal,
      breakdown,
    }
  }

  // Fallback
  return {
    total: 0,
    totalTime: 0,
    basePrice: 0,
    addOnsTotal: 0,
    breakdown: [],
  }
}

// ============================================
// FORMAT ESTIMATE FOR DISPLAY
// ============================================

export function formatEstimate(estimate: ReturnType<typeof calculateEstimate>): EstimateBreakdown {
  return {
    total: estimate.total,
    totalTime: estimate.totalTime,
    breakdown: estimate.breakdown,
    displayTotal: estimate.total > 0 ? formatPrice(estimate.total) : "Custom Quote",
    displayTime: estimate.totalTime > 0 ? formatTime(estimate.totalTime) : "TBD",
  }
}

// ============================================
// VALIDATION HELPERS
// ============================================

export function validateStep(
  step: number,
  state: BookingState
): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (!state.serviceId) {
    return { valid: false, errors: ["Service not selected"] }
  }

  const service = SERVICES[state.serviceId as ServiceType]
  if (!service) {
    return { valid: false, errors: ["Invalid service"] }
  }

  switch (step) {
    case 1:
      // Service selection - always valid if we got here
      break

    case 2:
      // Property details
      if (service.type === "flat") {
        if (state.propertyData.bedrooms === null) errors.push("Please select number of bedrooms")
        if (state.propertyData.bathrooms === null) errors.push("Please select number of bathrooms")
      } else if (service.type === "hourly") {
        if (!state.propertyData.hours || state.propertyData.hours < 2) {
          errors.push("Please select at least 2 hours")
        }
        if (!state.propertyData.teamSize || state.propertyData.teamSize < 1) {
          errors.push("Please select team size")
        }
      }
      break

    case 3:
      // Add-ons - optional, always valid
      break

    case 4:
      // Date/Time
      if (!state.dateTime.date) errors.push("Please select a date")
      if (!state.dateTime.time) errors.push("Please select a time")
      break

    case 5:
      // Contact info
      if (!state.contactInfo.firstName) errors.push("First name required")
      if (!state.contactInfo.email) errors.push("Email required")
      if (!state.contactInfo.phone) errors.push("Phone required")
      if (!state.contactInfo.address) errors.push("Address required")
      break
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

// ============================================
// DATE/TIME HELPERS
// ============================================

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

export const TIME_SLOTS = {
  morning: "Morning (8am - 11am)",
  midday: "Midday (11am - 2pm)",
  afternoon: "Afternoon (2pm - 5pm)",
  evening: "Evening (5pm - 8pm)",
}

// ============================================
// RE-EXPORT FROM MASTER CONFIG
// ============================================

export { formatPrice, formatTime }
