// ============================================
// PRICING CONFIGURATION
// ============================================
// Edit the values below to update pricing across the entire site
// All prices are hourly rates - customers are charged for actual time worked

export const PRICING = {
  // ============================================
  // SERVICE TYPES & HOURLY RATES
  // ============================================
  // Edit hourlyRate to change the price per hour
  // Edit baseHours to change estimated time for average home
  services: [
    {
      id: "standard",
      name: "Standard Cleaning",
      hourlyRate: 45, // ← EDIT THIS to change hourly rate
      baseHours: 2.5, // ← EDIT THIS to change base time estimate
      estimatedHours: { min: 2, max: 4 }, // ← EDIT THIS to change typical time range shown
      description: "Regular maintenance cleaning for lived-in homes",
      includes: [
        "Dust all surfaces",
        "Vacuum & mop floors",
        "Clean bathrooms (sink, toilet, shower)",
        "Kitchen cleaning (counters, appliances)",
        "Trash removal",
      ],
    },
    {
      id: "deep",
      name: "Deep Cleaning",
      hourlyRate: 50, // ← EDIT THIS
      baseHours: 4, // ← EDIT THIS
      estimatedHours: { min: 3, max: 6 }, // ← EDIT THIS
      description: "Thorough top-to-bottom clean for neglected spaces",
      includes: [
        "Everything in Standard +",
        "Inside oven cleaning",
        "Inside fridge cleaning",
        "Baseboards & window sills",
        "Inside cabinets (optional)",
        "Behind/under furniture",
      ],
    },
    {
      id: "move",
      name: "Move In/Out",
      hourlyRate: 55, // ← EDIT THIS
      baseHours: 4.5, // ← EDIT THIS
      estimatedHours: { min: 4, max: 7 }, // ← EDIT THIS
      description: "Complete empty home cleaning for moving",
      includes: [
        "Complete empty home cleaning",
        "All rooms, all surfaces",
        "Inside all cabinets & drawers",
        "Walls spot cleaning",
        "Light fixtures",
        "Landlord inspection ready",
      ],
    },
    {
      id: "construction",
      name: "Post-Construction",
      hourlyRate: 60, // ← EDIT THIS
      baseHours: 6, // ← EDIT THIS
      estimatedHours: { min: 5, max: 10 }, // ← EDIT THIS
      description: "Heavy-duty cleaning after renovations",
      includes: [
        "Construction debris removal",
        "Heavy dust elimination",
        "Window cleaning (interior)",
        "Floor scrubbing & polishing",
        "Multiple passes for dust",
      ],
    },
  ],

  // ============================================
  // TIME CALCULATIONS
  // ============================================
  // Edit these to change how property size affects estimated time
  timeFactors: {
    perBedroom: 0.5, // ← EDIT: hours added per bedroom (30 min = 0.5 hours)
    perBathroom: 0.75, // ← EDIT: hours added per bathroom (45 min = 0.75 hours)
    per500SqFt: 0.25, // ← EDIT: hours added per 500 sq ft (15 min = 0.25 hours)
  },

  // ============================================
  // ADD-ON SERVICES
  // ============================================
  addOns: [
    { id: "windows", name: "Interior Windows", estimatedTime: "30-45 min", hourlyRate: 45 },
    { id: "fridge", name: "Refrigerator Deep Clean", estimatedTime: "30-45 min", hourlyRate: 50 },
    { id: "oven", name: "Oven Deep Clean", estimatedTime: "30-45 min", hourlyRate: 50 },
    { id: "laundry", name: "Laundry Service", estimatedTime: "45-60 min", hourlyRate: 40 },
    { id: "dishes", name: "Dish Washing", estimatedTime: "20-30 min", hourlyRate: 40 },
    { id: "organization", name: "Organization Service", estimatedTime: "60+ min", hourlyRate: 55 },
  ],

  frequencies: [
    { id: "one-time", name: "One-Time", description: "Perfect for special occasions", discount: 0 },
    { id: "weekly", name: "Weekly", description: "Best value - priority scheduling", discount: 15 },
    { id: "bi-weekly", name: "Bi-Weekly", description: "Most popular choice", discount: 10 },
    { id: "monthly", name: "Monthly", description: "Maintain your space", discount: 5 },
  ],
}

// ============================================
// CALCULATION FUNCTIONS
// ============================================

export function calculateEstimatedHours(
  serviceId: string,
  bedrooms: number,
  bathrooms: number,
  sqft: number,
): { min: number; max: number } {
  const service = PRICING.services.find((s) => s.id === serviceId)
  if (!service) return { min: 0, max: 0 }

  // Start with base hours for the service
  const baseHours = service.baseHours

  // Add time based on property size
  const bedroomHours = bedrooms * PRICING.timeFactors.perBedroom
  const bathroomHours = bathrooms * PRICING.timeFactors.perBathroom
  const sqftHours = (sqft / 500) * PRICING.timeFactors.per500SqFt

  const totalHours = baseHours + bedroomHours + bathroomHours + sqftHours

  // Return a range (±20% for variation)
  return {
    min: Math.round(totalHours * 0.8 * 10) / 10, // Round to 1 decimal
    max: Math.round(totalHours * 1.2 * 10) / 10,
  }
}

export function calculateEstimatedPrice(
  serviceId: string,
  bedrooms: number,
  bathrooms: number,
  sqft: number,
  addOns: string[] = [],
) {
  const service = PRICING.services.find((s) => s.id === serviceId)
  if (!service) return { min: 0, max: 0, hours: { min: 0, max: 0 } }

  const hours = calculateEstimatedHours(serviceId, bedrooms, bathrooms, sqft)

  // Calculate base price
  let priceMin = Math.round(hours.min * service.hourlyRate)
  let priceMax = Math.round(hours.max * service.hourlyRate)

  // Add add-ons
  addOns.forEach((addonId) => {
    const addon = PRICING.addOns.find((a) => a.id === addonId)
    if (addon) {
      const timeRange = addon.estimatedTime.split("-")
      const minMinutes = Number.parseInt(timeRange[0])
      const maxMinutes = timeRange[1] ? Number.parseInt(timeRange[1]) : minMinutes
      priceMin += Math.round((minMinutes / 60) * addon.hourlyRate)
      priceMax += Math.round((maxMinutes / 60) * addon.hourlyRate)
    }
  })

  return { min: priceMin, max: priceMax, hours }
}
