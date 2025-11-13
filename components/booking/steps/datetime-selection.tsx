"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { DateTimeData } from "@/lib/booking-types"

interface DateTimeSelectionProps {
  dateTime: DateTimeData
  onChange: (data: Partial<DateTimeData>) => void
}

export function DateTimeSelection({ dateTime, onChange }: DateTimeSelectionProps) {
  // Skeleton for Phase 2
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>Select Date & Time</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Step 4: Date/time selection will be implemented in Phase 2</p>
      </CardContent>
    </Card>
  )
}
