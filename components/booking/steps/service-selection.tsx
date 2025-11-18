"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SERVICES } from "@/lib/booking-pricing-engine"
import { SERVICE_DISPLAY_INFO } from "@/lib/booking-flow-config"
import { Check } from "@/components/booking/icons"
import { cn } from "@/lib/utils"

interface ServiceSelectionProps {
  selectedService: string | null
  onSelect: (serviceId: string) => void
}

const SERVICE_DETAILS = {
  standard_cleaning: {
    included: [
      "Dusting all surfaces",
      "Vacuum & mop floors",
      "Kitchen cleaning (counters, sink, exterior appliances)",
      "Bathroom cleaning (toilet, shower, sink)",
      "Trash removal",
    ],
    duration: "2-6 hours depending on size",
    bestFor: "Weekly or bi-weekly maintenance of your home",
  },
  deep_cleaning: {
    included: [
      "Everything in Standard Cleaning",
      "Baseboards & trim cleaning",
      "Behind and inside appliances",
      "Detail cleaning of fixtures",
      "Window sills and tracks",
    ],
    duration: "3.5-7 hours depending on size",
    bestFor: "First-time deep clean or seasonal refresh",
  },
  move_in_out: {
    included: [
      "Deep clean of empty unit",
      "All rooms & bathrooms",
      "Windows (inside)",
      "Appliances (inside & outside)",
      "Baseboards and trim",
    ],
    duration: "3.5-7 hours depending on size",
    bestFor: "Moving in or out of your apartment",
  },
  post_construction: {
    included: [
      "Dust & debris removal",
      "Construction residue cleaning",
      "Detail cleaning of all surfaces",
      "Final polish and touch-ups",
      "Disposal coordination if needed",
    ],
    duration: "Varies by project scope",
    bestFor: "After renovations, repairs, or construction work",
  },
  heavy_duty: {
    included: [
      "Extreme cleaning cases",
      "Specialized equipment & products",
      "Multiple cleaners if needed",
      "Extended hours",
      "Disposal coordination",
    ],
    duration: "Assessed on-site by manager",
    bestFor: "Hoarding situations, extreme neglect, or specialized cleaning needs",
  },
  airbnb_turnover: {
    included: [
      "Quick turnaround time",
      "Linen changing (if provided)",
      "Restocking supplies",
      "Inspection checklist",
      "Photo documentation available",
    ],
    duration: "Fast turnaround scheduling",
    bestFor: "Airbnb hosts needing fast turnover between guests",
  },
  custom_cleaning: {
    included: [
      "Choose 1-6+ cleaners",
      "Select 3-8+ hours",
      "All supplies included",
      "Flexible scope of work",
      "You direct the priorities",
    ],
    duration: "Minimum 3 hours",
    bestFor: "Large spaces, special events, or unique requirements",
  },
  professional_organizing: {
    included: [
      "Space assessment",
      "Sorting & categorizing items",
      "Storage solutions planning",
      "Labeling system setup",
      "Maintenance plan creation",
    ],
    duration: "Minimum 3 hours",
    bestFor: "Closets, garages, offices, or any cluttered space",
  },
  office_commercial: {
    included: [
      "Customized cleaning plans",
      "Flexible scheduling (after-hours available)",
      "Eco-friendly products",
      "Trained & insured staff",
      "Competitive commercial pricing",
    ],
    duration: "Varies by project scope",
    bestFor: "Offices, retail spaces, restaurants, or any commercial property",
  },
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}

function ServiceBottomSheet({
  service,
  isOpen,
  onClose,
  onSelect,
}: {
  service: any
  isOpen: boolean
  onClose: () => void
  onSelect: () => void
}) {
  if (!service || !isOpen) return null

  const displayInfo = SERVICE_DISPLAY_INFO[service.id as keyof typeof SERVICE_DISPLAY_INFO]
  const details = SERVICE_DETAILS[service.id as keyof typeof SERVICE_DETAILS]

  if (!details) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-[999] backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="fixed bottom-0 left-0 right-0 bg-background rounded-t-3xl z-[1000] max-h-[85vh] overflow-y-auto shadow-2xl animate-slide-up">
        {/* Handle */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
        </div>

        <div className="p-6 space-y-6 pb-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="text-6xl">{displayInfo?.icon || "✨"}</div>
            <h2 className="text-2xl font-bold">{service.name}</h2>
            <p className="text-muted-foreground">{displayInfo?.description}</p>
          </div>

          {/* What's Included */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">What's Included</h3>
            <ul className="space-y-3">
              {details.included.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Pricing</h3>
            <div className="bg-primary/10 rounded-xl p-4 space-y-1">
              <div className="text-2xl font-bold text-primary">{service.displayPrice}</div>
              <div className="text-sm text-muted-foreground">{details.duration}</div>
            </div>
          </div>

          {/* Best For */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Best For</h3>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground">{details.bestFor}</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Button size="lg" className="w-full h-14 text-base font-semibold" onClick={onSelect}>
              Select This Service
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export function ServiceSelection({ selectedService, onSelect }: ServiceSelectionProps) {
  const [sheetService, setSheetService] = useState<any>(null)
  const servicesList = Object.values(SERVICES)

  const residentialServices = servicesList.filter((s) => s.id !== "office_commercial")
  const commercialService = servicesList.find((s) => s.id === "office_commercial")

  const handleInfoClick = (e: React.MouseEvent, service: any) => {
    e.stopPropagation()
    setSheetService(service)
  }

  const handleSelectFromSheet = () => {
    if (sheetService) {
      onSelect(sheetService.id)
      setSheetService(null)
    }
  }

  return (
    <>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold">What type of cleaning do you need?</h2>
          <p className="text-muted-foreground">Select the service that best fits your needs</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {residentialServices.map((service) => {
            const displayInfo = SERVICE_DISPLAY_INFO[service.id as keyof typeof SERVICE_DISPLAY_INFO]
            const isSelected = selectedService === service.id
            const isConsultation = service.type === "consultation"
            const isHourly = service.type === "hourly"

            return (
              <Card
                key={service.id}
                className={cn(
                  "relative cursor-pointer transition-all duration-200",
                  "border-2 min-h-[160px]",
                  isSelected
                    ? "border-primary bg-primary/5 shadow-lg scale-[0.98]"
                    : "border-border hover:border-primary/50 active:scale-[0.97]",
                )}
                onClick={() => onSelect(service.id)}
              >
                <button
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-muted hover:bg-muted-foreground/20 flex items-center justify-center transition-colors z-10"
                  onClick={(e) => handleInfoClick(e, service)}
                  aria-label={`More info about ${service.name}`}
                >
                  <InfoIcon className="w-4 h-4 text-muted-foreground" />
                </button>

                {(isConsultation || isHourly) && (
                  <div className="absolute top-2 left-2 z-10">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-[10px] font-semibold uppercase tracking-wide",
                        isConsultation && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
                        isHourly && "bg-primary/10 text-primary",
                      )}
                    >
                      {isConsultation ? "Manager Consult" : "Hourly"}
                    </Badge>
                  </div>
                )}

                <CardContent className="p-3 flex flex-col items-center text-center h-full pt-6">
                  <div className="text-4xl mb-2">{displayInfo?.icon || "✨"}</div>
                  <div className="space-y-1 flex-grow flex flex-col">
                    <h3 className="text-base font-semibold leading-tight">{service.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 flex-grow">
                      {displayInfo?.description || ""}
                    </p>
                    <div
                      className={cn(
                        "text-base font-semibold mt-auto",
                        isConsultation ? "text-amber-600 dark:text-amber-400" : "text-primary",
                      )}
                    >
                      {service.displayPrice}
                    </div>
                  </div>

                  {isSelected && (
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary border-4 border-background flex items-center justify-center shadow-lg">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {commercialService && (
          <Card
            className={cn(
              "relative cursor-pointer transition-all duration-200 border-2",
              selectedService === commercialService.id
                ? "border-primary bg-primary/5 shadow-lg"
                : "border-border hover:border-primary/50 active:scale-[0.99]",
            )}
            onClick={() => onSelect(commercialService.id)}
          >
            <button
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-muted hover:bg-muted-foreground/20 flex items-center justify-center transition-colors z-10"
              onClick={(e) => handleInfoClick(e, commercialService)}
              aria-label={`More info about ${commercialService.name}`}
            >
              <InfoIcon className="w-4 h-4 text-muted-foreground" />
            </button>

            <CardContent className="p-4 flex items-center gap-4">
              <div className="text-4xl">🏢</div>
              <div className="flex-grow space-y-1">
                <h3 className="text-lg font-semibold">{commercialService.name}</h3>
                <p className="text-base text-muted-foreground">{SERVICE_DISPLAY_INFO.office_commercial?.description}</p>
              </div>
              <div className="text-base font-semibold text-amber-600 dark:text-amber-400">
                {commercialService.displayPrice}
              </div>

              {selectedService === commercialService.id && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary border-4 border-background flex items-center justify-center shadow-lg">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <ServiceBottomSheet
        service={sheetService}
        isOpen={!!sheetService}
        onClose={() => setSheetService(null)}
        onSelect={handleSelectFromSheet}
      />
    </>
  )
}
