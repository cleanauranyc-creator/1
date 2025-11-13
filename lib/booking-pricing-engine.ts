// ============================================
// BOOKING PRICING ENGINE - CLEAN AURA NYC
// ============================================
// Полная система расчета цен для всех типов сервисов

// ============================================
// FLAT RATE PRICING DATA
// ============================================
// Source: Копия_CleanAura_flat_rates_v1_xlsx_-_FlatRates.tsv

export const FLAT_RATES = [
  // STANDARD CLEANING
  { sizeId: "studio_1ba", service: "standard", price: 100, hours: 2.0 },
  { sizeId: "1br_1ba", service: "standard", price: 130, hours: 2.5 },
  { sizeId: "1br_2ba", service: "standard", price: 170, hours: 3.5 },
  { sizeId: "2br_1ba", service: "standard", price: 160, hours: 3.0 },
  { sizeId: "2br_2ba", service: "standard", price: 190, hours: 4.0 },
  { sizeId: "3br_1ba", service: "standard", price: 210, hours: 4.0 },
  { sizeId: "3br_2ba", service: "standard", price: 240, hours: 5.0 },
  { sizeId: "3br_3ba_plus", service: "standard", price: 280, hours: 5.5 },
  { sizeId: "4br_2ba_plus", service: "standard", price: 300, hours: 6.0 },

  // DEEP CLEANING
  { sizeId: "studio_1ba", service: "deep", price: 200, hours: 3.5 },
  { sizeId: "1br_1ba", service: "deep", price: 235, hours: 4.0 },
  { sizeId: "1br_2ba", service: "deep", price: 275, hours: 5.0 },
  { sizeId: "2br_1ba", service: "deep", price: 275, hours: 5.0 },
  { sizeId: "2br_2ba", service: "deep", price: 315, hours: 5.5 },
  { sizeId: "3br_1ba", service: "deep", price: 320, hours: 5.5 },
  { sizeId: "3br_2ba", service: "deep", price: 360, hours: 6.0 },
  { sizeId: "3br_3ba_plus", service: "deep", price: 405, hours: 7.0 },
  { sizeId: "4br_2ba_plus", service: "deep", price: 390, hours: 7.0 },

  // MOVE IN/OUT
  { sizeId: "studio_1ba", service: "move", price: 245, hours: 3.5 },
  { sizeId: "1br_1ba", service: "move", price: 285, hours: 4.0 },
  { sizeId: "1br_2ba", service: "move", price: 330, hours: 5.0 },
  { sizeId: "2br_1ba", service: "move", price: 330, hours: 5.0 },
  { sizeId: "2br_2ba", service: "move", price: 380, hours: 5.5 },
  { sizeId: "3br_1ba", service: "move", price: 385, hours: 5.5 },
  { sizeId: "3br_2ba", service: "move", price: 430, hours: 6.0 },
  { sizeId: "3br_3ba_plus", service: "move", price: 485, hours: 7.0 },
  { sizeId: "4br_2ba_plus", service: "move", price: 465, hours: 7.0 },
]

// ============================================
// ADD-ONS PRICING DATA
// ============================================

export const ADDONS = {
  // Kitchen Deep Clean
  fridge: { id: "fridge", name: "Refrigerator Inside", price: 460, time: 30, maxQty: 1, category: "kitchen" },
  oven: { id: "oven", name: "Oven Inside", price: 45, time: 30, maxQty: 1, category: "kitchen" },
  cabinets: {
    id: "cabinets",
    name: "Interior Cabinets",
    pricePerUnit: 80,
    time: 78,
    maxQty: 4,
    hasQuantity: true,
    category: "kitchen",
  },

  // Windows & Surfaces
  windows: {
    id: "windows",
    name: "Inside Windows",
    pricePerUnit: 15,
    time: 15,
    maxQty: 10,
    hasQuantity: true,
    category: "windows",
  },
  blinds: {
    id: "blinds",
    name: "Blinds Dusting",
    pricePerUnit: 25,
    time: 25,
    maxQty: 8,
    hasQuantity: true,
    category: "windows",
  },
  baseboards: {
    id: "baseboards",
    name: "Baseboards Detail",
    price: 20,
    time: 20,
    maxQty: 1,
    category: "windows",
    includedWith: ["deep"],
  },
  walls: {
    id: "walls",
    name: "Walls Spot Cleaning",
    pricePerUnit: 30,
    time: 30,
    maxQty: 6,
    hasQuantity: true,
    category: "windows",
  },
  stairs: {
    id: "stairs",
    name: "Staircase Cleaning",
    pricePerUnit: 35,
    time: 25,
    maxQty: 3,
    hasQuantity: true,
    category: "windows",
  },

  // Household Tasks
  laundry: {
    id: "laundry",
    name: "Laundry Service",
    pricePerUnit: 25,
    time: 30,
    maxQty: 6,
    hasQuantity: true,
    hasOptions: true,
    category: "household",
  },
  dishes: {
    id: "dishes",
    name: "Dishes",
    pricePerUnit: 30,
    time: 30,
    maxQty: 3,
    hasQuantity: true,
    category: "household",
  },
  ironing: { id: "ironing", name: "Ironing Service", price: 20, time: 20, maxQty: 1, category: "household" },

  // Premium Equipment
  vacuum: { id: "vacuum", name: "Professional Vacuum", price: 50, time: 0, maxQty: 1, category: "equipment" },
  steamer: { id: "steamer", name: "Steam Cleaner", price: 75, time: 0, maxQty: 1, category: "equipment" },
}

// ============================================
// BUNDLE DEFINITION WITH DISCOUNT LOGIC
// ============================================

export const BUNDLES = {
  essentialDeepClean: {
    id: "essentialDeepClean",
    name: "Essential Deep Clean Bundle",
    subtitle: "Everything you need for a thorough kitchen refresh",
    items: ["fridge", "oven", "cabinets"],
    originalPrice: 160,
    bundlePrice: 130,
    savings: 30,
    badge: "⭐ MOST POPULAR",
  },
}

// ============================================
// HOURLY RATES
// ============================================

export const HOURLY_RATES = {
  custom: 50, // Custom Cleaning: $50/hour
  organizing: 65, // Professional Organizing: $65/hour
}

// ============================================
// SERVICE METADATA
// ============================================

export const SERVICES = {
  standard: {
    id: "standard",
    name: "Standard Cleaning",
    type: "flat",
    startingPrice: 100,
    displayPrice: "Starting from $120",
    hasAddOns: true,
  },
  deep: {
    id: "deep",
    name: "Deep Cleaning",
    type: "flat",
    startingPrice: 200,
    displayPrice: "Starting from $235",
    hasAddOns: true,
  },
  move: {
    id: "move",
    name: "Move In/Out",
    type: "flat",
    startingPrice: 245,
    displayPrice: "Starting from $285",
    hasAddOns: true,
  },
  construction: {
    id: "construction",
    name: "Post-Construction",
    type: "consultation",
    displayPrice: "Custom Quote",
    hasAddOns: false,
  },
  heavy: {
    id: "heavy",
    name: "Heavy-Duty / Hoarding",
    type: "consultation",
    displayPrice: "Custom Quote",
    hasAddOns: false,
  },
  airbnb: {
    id: "airbnb",
    name: "Airbnb Turnover",
    type: "consultation",
    displayPrice: "Custom Quote",
    hasAddOns: false,
  },
  custom: {
    id: "custom",
    name: "Custom Cleaning",
    type: "hourly",
    hourlyRate: 50,
    displayPrice: "$50/hour",
    hasAddOns: false,
  },
  organizing: {
    id: "organizing",
    name: "Professional Organizing",
    type: "consultation",
    hourlyRate: 65,
    displayPrice: "$45-65/hour",
    hasAddOns: false,
  },
  commercial: {
    id: "commercial",
    name: "Office/Commercial",
    type: "consultation",
    displayPrice: "Custom Quote",
    hasAddOns: false,
  },
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Map bedrooms/bathrooms to size_id for flat rate lookup
 */
export function mapToSizeId(bedrooms: number, bathrooms: number): string {
  // Studio
  if (bedrooms === 0 && bathrooms === 1) return "studio_1ba"

  // 1 Bedroom
  if (bedrooms === 1 && bathrooms === 1) return "1br_1ba"
  if (bedrooms === 1 && bathrooms >= 2) return "1br_2ba"

  // 2 Bedrooms
  if (bedrooms === 2 && bathrooms === 1) return "2br_1ba"
  if (bedrooms === 2 && bathrooms >= 2) return "2br_2ba"

  // 3 Bedrooms
  if (bedrooms === 3 && bathrooms === 1) return "3br_1ba"
  if (bedrooms === 3 && bathrooms === 2) return "3br_2ba"
  if (bedrooms === 3 && bathrooms >= 3) return "3br_3ba_plus"

  // 4+ Bedrooms
  if (bedrooms >= 4) return "4br_2ba_plus"

  // Default fallback
  return "1br_1ba"
}

/**
 * Get flat rate price for Standard/Deep/Move services
 */
export function getFlatRatePrice(
  serviceId: "standard" | "deep" | "move",
  bedrooms: number,
  bathrooms: number,
): { price: number; hours: number } | null {
  const sizeId = mapToSizeId(bedrooms, bathrooms)
  const pricing = FLAT_RATES.find((r) => r.sizeId === sizeId && r.service === serviceId)

  if (!pricing) {
    console.error(`No pricing found for ${serviceId} - ${sizeId}`)
    return null
  }

  return {
    price: pricing.price,
    hours: pricing.hours,
  }
}

/**
 * Calculate single add-on price
 */
export function calculateAddonPrice(addonId: string, quantity = 1, bedrooms?: number): { price: number; time: number } {
  const addon = ADDONS[addonId as keyof typeof ADDONS]

  if (!addon) {
    console.error(`Unknown addon: ${addonId}`)
    return { price: 0, time: 0 }
  }

  // Auto-calculated add-ons (e.g., baseboards)
  if (addon.autoCalculated && bedrooms) {
    return {
      price: addon.pricePerBedroom! * bedrooms,
      time: addon.time * bedrooms,
    }
  }

  // Per-unit pricing
  if (addon.hasQuantity && addon.pricePerUnit) {
    return {
      price: addon.pricePerUnit * quantity,
      time: addon.time * quantity,
    }
  }

  // Fixed price
  return {
    price: addon.price || 0,
    time: addon.time,
  }
}

/**
 * Calculate total for all selected add-ons
 */
export function calculateAddOnsTotal(
  selectedAddons: Array<{ id: string; quantity?: number }>,
  bedrooms?: number,
): { total: number; totalTime: number } {
  let total = 0
  let totalTime = 0

  selectedAddons.forEach((addon) => {
    const { price, time } = calculateAddonPrice(addon.id, addon.quantity || 1, bedrooms)
    total += price
    totalTime += time
  })

  return { total, totalTime }
}

/**
 * Calculate hourly service price
 */
export function calculateHourlyPrice(serviceId: "custom" | "organizing", hours: number, teamSize = 1): number {
  const rate = HOURLY_RATES[serviceId]
  return rate * hours * teamSize
}

// ============================================
// MAIN PRICING CALCULATION
// ============================================

export interface BookingData {
  serviceId: string
  bedrooms?: number
  bathrooms?: number
  sqft?: number
  hours?: number
  teamSize?: number
  selectedAddons?: Array<{ id: string; quantity?: number }>
}

export interface PricingResult {
  basePrice: number | "CUSTOM_QUOTE"
  addOnsTotal: number
  grandTotal: number | "CUSTOM_QUOTE"
  estimatedHours?: number
  breakdown: {
    serviceName: string
    basePrice: number | "CUSTOM_QUOTE"
    addOns: Array<{ name: string; price: number; quantity?: number }>
  }
}

/**
 * Master pricing calculation function
 * Handles all service types: flat, hourly, consultation
 */
export function calculateBookingPrice(data: BookingData): PricingResult {
  const service = SERVICES[data.serviceId as keyof typeof SERVICES]

  if (!service) {
    throw new Error(`Unknown service: ${data.serviceId}`)
  }

  // ============================================
  // CONSULTATION SERVICES
  // ============================================
  if (service.type === "consultation") {
    return {
      basePrice: "CUSTOM_QUOTE",
      addOnsTotal: 0,
      grandTotal: "CUSTOM_QUOTE",
      breakdown: {
        serviceName: service.name,
        basePrice: "CUSTOM_QUOTE",
        addOns: [],
      },
    }
  }

  // ============================================
  // FLAT RATE SERVICES
  // ============================================
  if (service.type === "flat") {
    if (!data.bedrooms || !data.bathrooms) {
      throw new Error("Bedrooms and bathrooms required for flat rate pricing")
    }

    const flatRate = getFlatRatePrice(data.serviceId as "standard" | "deep" | "move", data.bedrooms, data.bathrooms)

    if (!flatRate) {
      throw new Error("Could not calculate flat rate price")
    }

    // Calculate add-ons
    const addOnsResult = data.selectedAddons
      ? calculateAddOnsTotal(data.selectedAddons, data.bedrooms)
      : { total: 0, totalTime: 0 }

    const breakdown = {
      serviceName: service.name,
      basePrice: flatRate.price,
      addOns: data.selectedAddons
        ? data.selectedAddons.map((addon) => {
            const addonData = ADDONS[addon.id as keyof typeof ADDONS]
            const { price } = calculateAddonPrice(addon.id, addon.quantity || 1, data.bedrooms)
            return {
              name: addonData.name,
              price,
              quantity: addon.quantity,
            }
          })
        : [],
    }

    return {
      basePrice: flatRate.price,
      addOnsTotal: addOnsResult.total,
      grandTotal: flatRate.price + addOnsResult.total,
      estimatedHours: flatRate.hours,
      breakdown,
    }
  }

  // ============================================
  // HOURLY SERVICES
  // ============================================
  if (service.type === "hourly") {
    if (!data.hours) {
      throw new Error("Hours required for hourly pricing")
    }

    const totalPrice = calculateHourlyPrice(data.serviceId as "custom" | "organizing", data.hours, data.teamSize || 1)

    return {
      basePrice: totalPrice,
      addOnsTotal: 0,
      grandTotal: totalPrice,
      estimatedHours: data.hours,
      breakdown: {
        serviceName: service.name,
        basePrice: totalPrice,
        addOns: [],
      },
    }
  }

  throw new Error("Invalid service type")
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
 * Get starting price for service cards
 */
export function getStartingPrice(serviceId: string): string {
  const service = SERVICES[serviceId as keyof typeof SERVICES]
  return service.displayPrice
}

/**
 * Check if service has add-ons
 */
export function hasAddOns(serviceId: string): boolean {
  const service = SERVICES[serviceId as keyof typeof SERVICES]
  return service.hasAddOns
}

/**
 * Get filtered add-ons for specific service
 */
export function getAddOnsForService(serviceId: string): typeof ADDONS {
  const filteredAddons: any = {}

  Object.entries(ADDONS).forEach(([key, addon]) => {
    // If addon specifies showOnlyFor, check if current service is included
    if (addon.showOnlyFor && !addon.showOnlyFor.includes(serviceId)) {
      return // Skip this addon
    }
    filteredAddons[key] = addon
  })

  return filteredAddons
}

// ============================================
// VALIDATION HELPERS
// ============================================

/**
 * Validate booking data before price calculation
 */
export function validateBookingData(data: BookingData): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []
  const service = SERVICES[data.serviceId as keyof typeof SERVICES]

  if (!service) {
    errors.push("Invalid service type")
    return { valid: false, errors }
  }

  // Flat rate validation
  if (service.type === "flat") {
    if (!data.bedrooms) errors.push("Bedrooms required")
    if (!data.bathrooms) errors.push("Bathrooms required")
  }

  // Hourly validation
  if (service.type === "hourly") {
    if (!data.hours) errors.push("Hours required")
    if (data.hours && (data.hours < 2 || data.hours > 8)) {
      errors.push("Hours must be between 2-8")
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

// ============================================
// EXPORT ALL
// ============================================

export default {
  FLAT_RATES,
  ADDONS,
  HOURLY_RATES,
  SERVICES,
  BUNDLES,
  mapToSizeId,
  getFlatRatePrice,
  calculateAddonPrice,
  calculateAddOnsTotal,
  calculateHourlyPrice,
  calculateBookingPrice,
  formatPrice,
  getStartingPrice,
  hasAddOns,
  getAddOnsForService,
  validateBookingData,
}
