// ============================================
// BOOKING UTILITY FUNCTIONS
// ============================================

import type { BookingFormData, PricingBreakdown, BookingState, EstimateBreakdown } from "./booking-types"
import { calculateBookingPrice, SERVICES } from "./booking-pricing-engine"

// Calculate pricing breakdown for display
export function calculatePricingBreakdown(formData: BookingFormData): PricingBreakdown | null {
  if (!formData.serviceId) return null

  const service = SERVICES[formData.serviceId as keyof typeof SERVICES]

  // Consultation services - custom quote
  if (service.type === "consultation") {
    return {
      basePrice: "CUSTOM_QUOTE",
      baseLabel: service.name,
      addOns: [],
      addOnsTotal: 0,
      subtotal: "CUSTOM_QUOTE",
      grandTotal: "CUSTOM_QUOTE",
    }
  }

  try {
    // Flat rate or hourly services
    const result = calculateBookingPrice({
      serviceId: formData.serviceId,
      bedrooms: formData.propertySize?.bedrooms,
      bathrooms: formData.propertySize?.bathrooms,
      hours: formData.hourlyData?.hours,
      teamSize: formData.hourlyData?.teamSize,
      selectedAddons: formData.selectedAddons.map((a) => ({
        id: a.id,
        quantity: a.quantity || 1,
      })),
    })

    return {
      basePrice: result.basePrice as number,
      baseLabel: service.name,
      addOns: result.breakdown.addOns,
      addOnsTotal: result.addOnsTotal,
      subtotal: result.grandTotal as number,
      grandTotal: result.grandTotal as number,
      estimatedHours: result.estimatedHours,
    }
  } catch (error) {
    console.error("[v0] Pricing calculation error:", error)
    return null
  }
}

// Format time display
export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (mins === 0) return `${hours}h`
  return `${hours}h ${mins}m`
}

// Validate step data before proceeding
export function validateStep(step: number, formData: BookingFormData): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  switch (step) {
    case 1:
      if (!formData.serviceId) errors.push("Please select a service")
      break

    case 2:
      if (formData.serviceType === "flat") {
        if (!formData.propertySize?.bedrooms && formData.propertySize?.bedrooms !== 0) {
          errors.push("Please select number of bedrooms")
        }
        if (!formData.propertySize?.bathrooms) {
          errors.push("Please select number of bathrooms")
        }
      } else if (formData.serviceType === "hourly") {
        if (!formData.hourlyData?.hours) {
          errors.push("Please select number of hours")
        }
      }
      break

    case 4: // Scheduling (step 3 or 4 depending on flow)
      if (!formData.scheduling.preferredDate) {
        errors.push("Please select a date")
      }
      if (!formData.scheduling.timeSlot) {
        errors.push("Please select a time slot")
      }
      break

    case 5: // Contact info (step 4 or 5)
      const contact = formData.contactInfo
      if (!contact.firstName) errors.push("First name required")
      if (!contact.lastName) errors.push("Last name required")
      if (!contact.email) errors.push("Email required")
      if (!contact.phone) errors.push("Phone number required")
      if (!contact.streetAddress) errors.push("Street address required")
      if (!contact.zipCode) errors.push("ZIP code required")
      if (!contact.contactMethod) errors.push("Preferred contact method required")
      break
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

// Format date for display
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

// Time slot labels
export const TIME_SLOTS = {
  morning: "Morning (8am - 11am)",
  afternoon: "Afternoon (12pm - 3pm)",
  evening: "Evening (4pm - 7pm)",
}

export function calculateEstimate(state: BookingState): {
  total: number
  totalTime: number
  basePrice: number
  addOnsTotal: number
  breakdown: Array<{ label: string; amount: number; time?: number }>
} {
  // Default empty estimate
  if (!state.serviceId || !state.propertyData.propertyType) {
    return {
      total: 0,
      totalTime: 0,
      basePrice: 0,
      addOnsTotal: 0,
      breakdown: [],
    }
  }

  try {
    const service = SERVICES.find((s) => s.id === state.serviceId)
    if (!service) {
      return {
        total: 0,
        totalTime: 0,
        basePrice: 0,
        addOnsTotal: 0,
        breakdown: [],
      }
    }

    // For flat rate services
    if (service.pricing.type === "flat_rate") {
      const propertyKey = `${state.propertyData.bedrooms || 0}br_${state.propertyData.bathrooms || 1}ba`
      const baseRate = service.pricing.baseRates.find((r) => r.config === propertyKey)

      if (!baseRate) {
        return {
          total: 0,
          totalTime: 0,
          basePrice: 0,
          addOnsTotal: 0,
          breakdown: [],
        }
      }

      const basePrice = baseRate.price
      const baseTime = baseRate.timeMinutes || 120

      // Calculate add-ons
      let addOnsTotal = 0
      let addOnsTime = 0
      const breakdown: Array<{ label: string; amount: number; time?: number }> = []

      breakdown.push({
        label: `${service.name} - ${propertyKey.replace("_", " / ")}`,
        amount: basePrice,
        time: baseTime,
      })

      state.addOns.forEach((addon) => {
        const addonDef = service.pricing.addOns?.find((a) => a.id === addon.id)
        if (addonDef) {
          const addonPrice = addonDef.price * (addon.quantity || 1)
          const addonTime = (addonDef.timeMinutes || 0) * (addon.quantity || 1)
          addOnsTotal += addonPrice
          addOnsTime += addonTime
          breakdown.push({
            label: `${addonDef.name}${addon.quantity && addon.quantity > 1 ? ` x${addon.quantity}` : ""}`,
            amount: addonPrice,
            time: addonTime,
          })
        }
      })

      return {
        total: basePrice + addOnsTotal,
        totalTime: baseTime + addOnsTime,
        basePrice,
        addOnsTotal,
        breakdown,
      }
    }

    // For hourly services
    if (service.pricing.type === "hourly") {
      const hours = state.propertyData.hours || 2
      const rate = service.pricing.hourlyRate || 50
      const total = hours * rate

      return {
        total,
        totalTime: hours * 60,
        basePrice: total,
        addOnsTotal: 0,
        breakdown: [
          {
            label: `${service.name} - ${hours} hour${hours > 1 ? "s" : ""}`,
            amount: total,
            time: hours * 60,
          },
        ],
      }
    }

    // For consultation services
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
  } catch (error) {
    console.error("[v0] Calculate estimate error:", error)
    return {
      total: 0,
      totalTime: 0,
      basePrice: 0,
      addOnsTotal: 0,
      breakdown: [],
    }
  }
}

export function formatEstimate(estimate: ReturnType<typeof calculateEstimate>): EstimateBreakdown {
  return {
    total: estimate.total,
    totalTime: estimate.totalTime,
    breakdown: estimate.breakdown,
    displayTotal: estimate.total > 0 ? `$${estimate.total}` : "Custom Quote",
    displayTime: estimate.totalTime > 0 ? formatTime(estimate.totalTime) : "TBD",
  }
}
