"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Clock } from "@/components/booking/icons"
import type { BookingState } from "@/lib/booking-types"
import { calculateEstimate, formatEstimate } from "@/lib/booking-utils"

interface PriceBreakdownProps {
  state: BookingState
}

export function PriceBreakdown({ state }: PriceBreakdownProps) {
  if (!state.serviceId || !state.propertyData.propertyType) {
    return null
  }

  const estimate = calculateEstimate(state)
  const formatted = formatEstimate(estimate)

  return (
    <Card className="border-2 shadow-xl bg-gradient-to-br from-primary/10 via-primary/5 to-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Your Estimate</CardTitle>
          <Badge variant="secondary" className="bg-primary/10">
            <Sparkles className="h-3 w-3 mr-1" />
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center py-4">
          <div className="text-5xl font-bold text-primary mb-2">${estimate.total}</div>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>
              {Math.floor(estimate.totalTime / 60)}h {estimate.totalTime % 60}m estimated
            </span>
          </div>
        </div>

        {formatted.breakdown.length > 0 && (
          <div className="space-y-2 border-t pt-4">
            {formatted.breakdown.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-semibold">${item.amount}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
