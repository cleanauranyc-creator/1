// ============================================
// 🎯 MASTER CONFIGURATION
// ============================================
// SINGLE SOURCE OF TRUTH for ALL pricing, timing, and business logic
// Change values here and they update EVERYWHERE automatically!
//
// Last updated: 2025-01-13
// ============================================

// ============================================
// 💰 FLAT RATE PRICING - Standard/Deep/Move
// ============================================
// These are complete fixed prices for residential services
// Based on property size (bedrooms/bathrooms)

export const FLAT_RATE_PRICING = {
  // STANDARD CLEANING
  standard: [
    { bedrooms: 0, bathrooms: 1, price: 100, hours: 2.0, label: "Studio / 1BA" },
    { bedrooms: 1, bathrooms: 1, price: 130, hours: 2.5, label: "1BR / 1BA" },
    { bedrooms: 1, bathrooms: 2, price: 170, hours: 3.5, label: "1BR / 2BA" },
    { bedrooms: 2, bathrooms: 1, price: 160, hours: 3.0, label: "2BR / 1BA" },
    { bedrooms: 2, bathrooms: 2, price: 190, hours: 4.0, label: "2BR / 2BA" },
    { bedrooms: 3, bathrooms: 1, price: 210, hours: 4.0, label: "3BR / 1BA" },
    { bedrooms: 3, bathrooms: 2, price: 240, hours: 5.0, label: "3BR / 2BA" },
    { bedrooms: 3, bathrooms: 3, price: 280, hours: 5.5, label: "3BR / 3+BA" },
    { bedrooms: 4, bathrooms: 2, price: 300, hours: 6.0, label: "4BR / 2+BA" },
  ],

  // DEEP CLEANING
  deep: [
    { bedrooms: 0, bathrooms: 1, price: 200, hours: 3.5, label: "Studio / 1BA" },
    { bedrooms: 1, bathrooms: 1, price: 235, hours: 4.0, label: "1BR / 1BA" },
    { bedrooms: 1, bathrooms: 2, price: 275, hours: 5.0, label: "1BR / 2BA" },
    { bedrooms: 2, bathrooms: 1, price: 275, hours: 5.0, label: "2BR / 1BA" },
    { bedrooms: 2, bathrooms: 2, price: 315, hours: 5.5, label: "2BR / 2BA" },
    { bedrooms: 3, bathrooms: 1, price: 320, hours: 5.5, label: "3BR / 1BA" },
    { bedrooms: 3, bathrooms: 2, price: 360, hours: 6.0, label: "3BR / 2BA" },
    { bedrooms: 3, bathrooms: 3, price: 405, hours: 7.0, label: "3BR / 3+BA" },
    { bedrooms: 4, bathrooms: 2, price: 390, hours: 7.0, label: "4BR / 2+BA" },
  ],

  // MOVE IN/OUT
  move: [
    { bedrooms: 0, bathrooms: 1, price: 245, hours: 3.5, label: "Studio / 1BA" },
    { bedrooms: 1, bathrooms: 1, price: 285, hours: 4.0, label: "1BR / 1BA" },
    { bedrooms: 1, bathrooms: 2, price: 330, hours: 5.0, label: "1BR / 2BA" },
    { bedrooms: 2, bathrooms: 1, price: 330, hours: 5.0, label: "2BR / 1BA" },
    { bedrooms: 2, bathrooms: 2, price: 380, hours: 5.5, label: "2BR / 2BA" },
    { bedrooms: 3, bathrooms: 1, price: 385, hours: 5.5, label: "3BR / 1BA" },
    { bedrooms: 3, bathrooms: 2, price: 430, hours: 6.0, label: "3BR / 2BA" },
    { bedrooms: 3, bathrooms: 3, price: 485, hours: 7.0, label: "3BR / 3+BA" },
    { bedrooms: 4, bathrooms: 2, price: 465, hours: 7.0, label: "4BR / 2+BA" },
  ],
} as const

// ============================================
// ⏱️ HOURLY RATES
// ============================================
// For custom cleaning and organizing services

export const HOURLY_RATES = {
  custom: 50, // Custom Cleaning: $50/hour per cleaner
  organizing: 65, // Professional Organizing: $65/hour
} as const

// ============================================
// 🎁 ADD-ONS PRICING
// ============================================
// Additional services customers can add to their booking

export const ADDONS = {
  // Kitchen Deep Clean
  fridge: {
    id: "fridge",
    name: "Refrigerator Inside",
    price: 60,
    time: 30, // minutes
    category: "kitchen",
    description: "Deep clean inside shelves, drawers, and seals",
  },
  oven: {
    id: "oven",
    name: "Oven Inside",
    price: 45,
    time: 30,
    category: "kitchen",
    description: "Scrub racks, walls, and door glass",
  },
  cabinets: {
    id: "cabinets",
    name: "Interior Cabinets",
    pricePerUnit: 80,
    time: 78, // per set of cabinets
    maxQty: 4,
    category: "kitchen",
    description: "Empty, wipe, and reorganize cabinet interiors",
  },

  // Windows & Surfaces
  windows: {
    id: "windows",
    name: "Inside Windows",
    pricePerUnit: 15,
    time: 15, // per window
    maxQty: 10,
    category: "windows",
    description: "Streak-free window cleaning inside",
  },
  blinds: {
    id: "blinds",
    name: "Blinds Dusting",
    pricePerUnit: 25,
    time: 25, // per blind set
    maxQty: 8,
    category: "windows",
    description: "Deep dusting of all blind slats",
  },
  baseboards: {
    id: "baseboards",
    name: "Baseboards Detail",
    priceByBedrooms: {
      0: 20, // Studio
      1: 20, // 1BR
      2: 20, // 2BR
      3: 30, // 3BR
      4: 40, // 4BR+
    },
    time: 20,
    category: "surfaces",
    description: "Detailed cleaning of all baseboards",
    freeWith: ["deep"], // Free with Deep Cleaning
  },
  walls: {
    id: "walls",
    name: "Walls Spot Cleaning",
    pricePerUnit: 30,
    time: 30, // per room
    maxQty: 6,
    category: "surfaces",
    description: "Remove marks and stains from walls",
  },
  stairs: {
    id: "stairs",
    name: "Staircase Cleaning",
    pricePerUnit: 35,
    time: 25, // per flight
    maxQty: 3,
    category: "surfaces",
    description: "Vacuum, wipe railings, clean steps",
  },

  // Household Tasks
  laundry: {
    id: "laundry",
    name: "Laundry Service",
    pricePerUnit: 25,
    time: 30, // per load
    maxQty: 6,
    category: "household",
    description: "Wash, dry, and fold",
    hasOptions: true,
  },
  dishes: {
    id: "dishes",
    name: "Dishes",
    pricePerUnit: 30,
    time: 30, // per sink load
    maxQty: 3,
    category: "household",
    description: "Wash and put away dishes",
  },
  ironing: {
    id: "ironing",
    name: "Ironing Service",
    price: 20,
    time: 20,
    category: "household",
    description: "Iron and hang clothes",
  },

  // Premium Equipment
  vacuum: {
    id: "vacuum",
    name: "Professional Vacuum",
    price: 50,
    time: 0,
    category: "equipment",
    description: "HEPA vacuum for deep carpet cleaning",
  },
  steamer: {
    id: "steamer",
    name: "Steam Cleaner",
    price: 75,
    time: 0,
    category: "equipment",
    description: "Professional steam cleaning equipment",
  },
} as const

// ============================================
// 📦 BUNDLES & DISCOUNTS
// ============================================
// Package deals that save customers money

export const BUNDLES = {
  essentialDeepClean: {
    id: "essentialDeepClean",
    name: "Essential Deep Clean Bundle",
    subtitle: "Everything you need for a thorough kitchen refresh",
    includes: ["fridge", "oven", "cabinets"],
    originalPrice: 185, // $60 + $45 + $80
    bundlePrice: 155,
    savings: 30,
    badge: "⭐ MOST POPULAR",
  },
} as const

// ============================================
// 🎟️ FREQUENCY DISCOUNTS
// ============================================
// Discounts for recurring cleanings

export const FREQUENCY_DISCOUNTS = {
  "one-time": {
    id: "one-time",
    name: "One-Time",
    discount: 0,
    description: "Perfect for special occasions",
  },
  weekly: {
    id: "weekly",
    name: "Weekly",
    discount: 15, // 15% off
    description: "Best value - priority scheduling",
    badge: "BEST VALUE",
  },
  "bi-weekly": {
    id: "bi-weekly",
    name: "Bi-Weekly",
    discount: 10, // 10% off
    description: "Most popular choice",
    badge: "POPULAR",
  },
  monthly: {
    id: "monthly",
    name: "Monthly",
    discount: 5, // 5% off
    description: "Maintain your space",
  },
} as const

// ============================================
// 🏢 SERVICE METADATA
// ============================================
// Display information for each service type

export const SERVICES = {
  standard: {
    id: "standard",
    name: "Standard Cleaning",
    type: "flat",
    icon: "✨",
    description: "Regular maintenance cleaning",
    displayPrice: "From $130",
    hasAddOns: true,
  },
  deep: {
    id: "deep",
    name: "Deep Cleaning",
    type: "flat",
    icon: "🧽",
    description: "Thorough deep cleaning",
    displayPrice: "From $235",
    hasAddOns: true,
  },
  move: {
    id: "move",
    name: "Move In/Out",
    type: "flat",
    icon: "📦",
    description: "Move in/out cleaning",
    displayPrice: "From $285",
    hasAddOns: true,
  },
  construction: {
    id: "construction",
    name: "Post-Construction",
    type: "consultation",
    icon: "🏗️",
    description: "Post-renovation cleanup",
    displayPrice: "Custom Quote",
    hasAddOns: false,
  },
  heavy: {
    id: "heavy",
    name: "Heavy-Duty / Hoarding",
    type: "consultation",
    icon: "💪",
    description: "Heavy-duty cleaning",
    displayPrice: "Custom Quote",
    hasAddOns: false,
  },
  airbnb: {
    id: "airbnb",
    name: "Airbnb Turnover",
    type: "consultation",
    icon: "🏠",
    description: "Turnover cleaning",
    displayPrice: "Custom Quote",
    hasAddOns: false,
  },
  custom: {
    id: "custom",
    name: "Custom Cleaning",
    type: "hourly",
    icon: "⚙️",
    description: "Flexible cleaning service",
    displayPrice: "$50/hour",
    hasAddOns: false,
  },
  organizing: {
    id: "organizing",
    name: "Professional Organizing",
    type: "hourly",
    icon: "📋",
    description: "Professional organizing",
    displayPrice: "$65/hour",
    hasAddOns: false,
  },
  commercial: {
    id: "commercial",
    name: "Office/Commercial",
    type: "consultation",
    icon: "🏢",
    description: "Office & commercial spaces",
    displayPrice: "Custom Quote",
    hasAddOns: false,
  },
} as const

// ============================================
// 🔧 HELPER FUNCTIONS
// ============================================

/**
 * Get flat rate price for a service by bedrooms/bathrooms
 */
export function getFlatRate(
  serviceType: "standard" | "deep" | "move",
  bedrooms: number,
  bathrooms: number
): { price: number; hours: number; label: string } | null {
  const rates = FLAT_RATE_PRICING[serviceType]

  // Find exact match
  const exactMatch = rates.find((r) => r.bedrooms === bedrooms && r.bathrooms === bathrooms)
  if (exactMatch) return exactMatch

  // Find closest match by bedrooms, then bathrooms
  const bedroomMatches = rates.filter((r) => r.bedrooms === bedrooms)
  if (bedroomMatches.length > 0) {
    // Find the one with bathrooms >= requested
    const match = bedroomMatches.find((r) => r.bathrooms >= bathrooms)
    if (match) return match
    // Otherwise return the highest bathroom count for this bedroom
    return bedroomMatches[bedroomMatches.length - 1]
  }

  // If bedrooms > available, return the largest available
  return rates[rates.length - 1]
}

/**
 * Calculate addon price considering special rules
 */
export function getAddonPrice(
  addonId: keyof typeof ADDONS,
  quantity: number = 1,
  bedrooms?: number,
  serviceType?: string
): { price: number; time: number } {
  const addon = ADDONS[addonId]
  if (!addon) return { price: 0, time: 0 }

  // Check if free with service
  if ("freeWith" in addon && serviceType && addon.freeWith.includes(serviceType)) {
    return { price: 0, time: addon.time }
  }

  // Baseboards - price by bedrooms
  if ("priceByBedrooms" in addon && bedrooms !== undefined) {
    const bedroomKey = Math.min(bedrooms, 4) as 0 | 1 | 2 | 3 | 4
    return {
      price: addon.priceByBedrooms[bedroomKey],
      time: addon.time,
    }
  }

  // Per-unit pricing
  if ("pricePerUnit" in addon) {
    return {
      price: addon.pricePerUnit * quantity,
      time: addon.time * quantity,
    }
  }

  // Fixed price
  return {
    price: "price" in addon ? addon.price : 0,
    time: addon.time,
  }
}

/**
 * Check if bundle is active based on selected addons
 */
export function checkBundleDiscount(selectedAddonIds: string[]): number {
  const bundle = BUNDLES.essentialDeepClean
  const hasAllItems = bundle.includes.every((item) => selectedAddonIds.includes(item))
  return hasAllItems ? bundle.savings : 0
}

/**
 * Apply frequency discount to price
 */
export function applyFrequencyDiscount(
  price: number,
  frequency: keyof typeof FREQUENCY_DISCOUNTS
): { finalPrice: number; savings: number } {
  const discount = FREQUENCY_DISCOUNTS[frequency].discount
  const savings = Math.round((price * discount) / 100)
  return {
    finalPrice: price - savings,
    savings,
  }
}

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
export function formatTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (minutes === 0) return `${hours}h`
  return `${hours}h ${minutes}m`
}

// ============================================
// 📊 TYPE EXPORTS
// ============================================

export type ServiceType = keyof typeof SERVICES
export type AddonType = keyof typeof ADDONS
export type FrequencyType = keyof typeof FREQUENCY_DISCOUNTS
export type FlatRateServiceType = keyof typeof FLAT_RATE_PRICING
