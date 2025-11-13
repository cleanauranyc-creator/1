// Time calculation configuration - adjust these values to fine-tune estimates

export const TIME_CONFIG = {
  // Base time per bedroom (in hours)
  bedroomTime: {
    0: 1.5, // Studio
    1: 2.0,
    2: 2.5,
    3: 3.0,
    4: 3.5,
    5: 4.0,
  },

  // Additional time per bathroom (in hours)
  bathroomTime: {
    1: 0.5,
    2: 1.0,
    3: 1.5,
    4: 2.0,
  },

  // Square footage multiplier
  sqftMultiplier: {
    small: 1.0, // < 800 sq ft
    medium: 1.2, // 800-1500 sq ft
    large: 1.5, // 1500-2500 sq ft
    xlarge: 2.0, // > 2500 sq ft
  },

  // Add-on services time (in hours)
  addOns: {
    insideOven: 0.5,
    insideFridge: 0.5,
    insideCabinets: 1.0,
    windows: 1.0,
    laundry: 0.5,
    organizing: 1.0, // Base organizing time per hour selected
  },

  // Recent professional cleaning adjustment
  recentCleaningDiscount: 0.8, // 20% less time if cleaned in last 2 months
  noRecentCleaningMultiplier: 1.2, // 20% more time if not cleaned recently

  // Buffer for time range (±)
  timeRangeBuffer: 0.5, // hours
}

export function getSqftCategory(sqft: number): keyof typeof TIME_CONFIG.sqftMultiplier {
  if (sqft < 800) return "small"
  if (sqft < 1500) return "medium"
  if (sqft < 2500) return "large"
  return "xlarge"
}
