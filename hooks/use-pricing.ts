// ============================================
// PRICING REACT HOOK
// ============================================
// Easy way to use pricing in components
// Automatically updates when state changes

"use client"

import { useMemo } from "react"
import { calculateBookingPrice, formatPrice, formatTime, canCalculatePrice } from "@/lib/pricing-calculator"
import type { BookingState } from "@/lib/booking-types"

export function usePricing(state: BookingState) {
  const breakdown = useMemo(() => {
    try {
      if (!canCalculatePrice(state)) {
        return null
      }
      return calculateBookingPrice(state)
    } catch (error) {
      console.error("[v0] Pricing calculation error:", error)
      return null
    }
  }, [state]) // Updated to use the entire state object as a dependency

  return {
    breakdown,
    formattedTotal: breakdown ? formatPrice(breakdown.grandTotal) : "$0",
    formattedTime: breakdown ? formatTime(breakdown.estimatedMinutes) : "0h",
    hasPrice: breakdown !== null,
  }
}
