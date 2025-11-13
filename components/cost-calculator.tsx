"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { TIME_CONFIG, getSqftCategory } from "@/lib/time-config"

const HomeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
)

const RulerIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    />
  </svg>
)

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
)

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
)

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
)

const CheckCircle2Icon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

type Step = 1 | 2 | 3 | 4 | 5 | 6

interface FormData {
  bedrooms: number
  bathrooms: number
  sqft: string
  addOns: {
    insideOven: boolean
    insideFridge: boolean
    insideCabinets: boolean
    windows: boolean
    laundry: boolean
    organizing: boolean
  }
  organizingHours: number
  recentCleaning: string
  name: string
  phone: string
  email: string
}

export function CostCalculator() {
  const [step, setStep] = useState<Step>(1)
  const [formData, setFormData] = useState<FormData>({
    bedrooms: 0,
    bathrooms: 1,
    sqft: "",
    addOns: {
      insideOven: false,
      insideFridge: false,
      insideCabinets: false,
      windows: false,
      laundry: false,
      organizing: false,
    },
    organizingHours: 0,
    recentCleaning: "",
    name: "",
    phone: "",
    email: "",
  })

  const handleBedroomSelect = (value: number) => {
    setFormData((prev) => ({ ...prev, bedrooms: value }))
    setTimeout(() => setStep(2), 300)
  }

  const handleBathroomSelect = (value: number) => {
    setFormData((prev) => ({ ...prev, bathrooms: value }))
    setTimeout(() => setStep(3), 300)
  }

  const handleSqftSubmit = () => {
    if (formData.sqft && Number.parseInt(formData.sqft) > 0) {
      setTimeout(() => setStep(4), 300)
    }
  }

  const handleAddOnsNext = () => {
    setTimeout(() => setStep(5), 300)
  }

  const handleRecentCleaningSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, recentCleaning: value }))
    setTimeout(() => setStep(6), 300)
  }

  const prevStep = () => {
    if (step > 1) setStep((step - 1) as Step)
  }

  const toggleAddOn = (addon: keyof FormData["addOns"]) => {
    setFormData((prev) => ({
      ...prev,
      addOns: {
        ...prev.addOns,
        [addon]: !prev.addOns[addon],
      },
    }))
  }

  const calculateEstimate = () => {
    let totalTime = 0

    totalTime += TIME_CONFIG.bedroomTime[formData.bedrooms as keyof typeof TIME_CONFIG.bedroomTime] || 4.0

    totalTime += TIME_CONFIG.bathroomTime[formData.bathrooms as keyof typeof TIME_CONFIG.bathroomTime] || 2.0

    const sqft = Number.parseInt(formData.sqft) || 1000
    const sqftCategory = getSqftCategory(sqft)
    totalTime *= TIME_CONFIG.sqftMultiplier[sqftCategory]

    Object.entries(formData.addOns).forEach(([key, value]) => {
      if (value && key !== "organizing") {
        totalTime += TIME_CONFIG.addOns[key as keyof typeof TIME_CONFIG.addOns]
      }
    })

    if (formData.addOns.organizing && formData.organizingHours > 0) {
      totalTime += formData.organizingHours * TIME_CONFIG.addOns.organizing
    }

    if (formData.recentCleaning === "yes") {
      totalTime *= TIME_CONFIG.recentCleaningDiscount
    } else if (formData.recentCleaning === "no") {
      totalTime *= TIME_CONFIG.noRecentCleaningMultiplier
    }

    const minHours = Math.max(1, Math.floor(totalTime - TIME_CONFIG.timeRangeBuffer))
    const maxHours = Math.ceil(totalTime + TIME_CONFIG.timeRangeBuffer)

    return {
      minHours,
      maxHours,
      estimatedHours: totalTime.toFixed(1),
    }
  }

  const estimate = step === 6 ? calculateEstimate() : null

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl border-primary/20">
      <CardHeader className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <ClockIcon className="h-5 w-5 text-primary" />
          <CardTitle className="text-2xl md:text-3xl">See Your Time in 60 Seconds</CardTitle>
        </div>
        <CardDescription className="text-base">
          Get an instant estimate of how long your cleaning will take
        </CardDescription>

        <div className="flex gap-2 pt-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${s <= step ? "bg-primary" : "bg-muted"}`}
            ></div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <Label className="text-lg font-semibold">How many bedrooms?</Label>
            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2, 3, 4, 5].map((num) => (
                <Button
                  key={num}
                  variant={formData.bedrooms === num ? "default" : "outline"}
                  className="h-16 text-lg"
                  onClick={() => handleBedroomSelect(num)}
                >
                  {num === 0 ? "Studio" : num === 5 ? "5+" : num}
                </Button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <Label className="text-lg font-semibold">How many bathrooms?</Label>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((num) => (
                <Button
                  key={num}
                  variant={formData.bathrooms === num ? "default" : "outline"}
                  className="h-16 text-lg"
                  onClick={() => handleBathroomSelect(num)}
                >
                  {num === 4 ? "4+" : num}
                </Button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            <Label htmlFor="sqft" className="text-lg font-semibold">
              What's the square footage?
            </Label>
            <Input
              id="sqft"
              type="number"
              placeholder="e.g., 1200"
              value={formData.sqft}
              onChange={(e) => setFormData((prev) => ({ ...prev, sqft: e.target.value }))}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSqftSubmit()
              }}
              className="text-lg h-14"
              autoFocus
            />
            <p className="text-sm text-muted-foreground">Enter approximate square footage of your space</p>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 animate-fade-in">
            <Label className="text-lg font-semibold">Any add-on tasks? (Optional)</Label>
            <div className="space-y-3">
              {[
                { key: "insideOven", label: "Inside Oven" },
                { key: "insideFridge", label: "Inside Fridge" },
                { key: "insideCabinets", label: "Inside Cabinets" },
                { key: "windows", label: "Windows" },
                { key: "laundry", label: "Laundry" },
                { key: "organizing", label: "Organizing" },
              ].map((addon) => (
                <div key={addon.key} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50">
                  <Checkbox
                    id={addon.key}
                    checked={formData.addOns[addon.key as keyof FormData["addOns"]]}
                    onCheckedChange={() => toggleAddOn(addon.key as keyof FormData["addOns"])}
                  />
                  <Label htmlFor={addon.key} className="flex-1 cursor-pointer">
                    {addon.label}
                  </Label>
                </div>
              ))}

              {formData.addOns.organizing && (
                <div className="ml-8 space-y-2">
                  <Label htmlFor="organizingHours" className="text-sm">
                    How many hours of organizing?
                  </Label>
                  <Input
                    id="organizingHours"
                    type="number"
                    min="1"
                    max="8"
                    placeholder="e.g., 2"
                    value={formData.organizingHours || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, organizingHours: Number.parseInt(e.target.value) || 0 }))
                    }
                    className="w-32"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4 animate-fade-in">
            <Label className="text-lg font-semibold">Has there been professional cleaning in the last 2 months?</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={formData.recentCleaning === "yes" ? "default" : "outline"}
                className="h-16 text-lg"
                onClick={() => handleRecentCleaningSelect("yes")}
              >
                Yes
              </Button>
              <Button
                variant={formData.recentCleaning === "no" ? "default" : "outline"}
                className="h-16 text-lg"
                onClick={() => handleRecentCleaningSelect("no")}
              >
                No
              </Button>
            </div>
          </div>
        )}

        {step === 6 && estimate && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-2 border-primary/30 rounded-2xl p-8 text-center space-y-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <CheckCircle2Icon className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-bold">Your Estimated Time</h3>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-lg">Your cleaning will take approximately:</p>
                <div className="text-5xl font-bold text-primary my-6">
                  {estimate.minHours}-{estimate.maxHours}
                  <span className="text-2xl ml-2">hours</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on {formData.bedrooms === 0 ? "studio" : `${formData.bedrooms} bedroom`}, {formData.bathrooms}{" "}
                  bathroom, {formData.sqft} sq ft
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Get Your Free Detailed Quote</h4>
              <p className="text-sm text-muted-foreground">We'll provide exact pricing and schedule your cleaning</p>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <Button className="w-full" size="lg">
              Get My Free Quote
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              We'll contact you within 15 minutes with exact pricing and availability
            </p>
          </div>
        )}

        {step < 6 && step !== 1 && step !== 2 && step !== 5 && (
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back
            </Button>
            {step === 3 && (
              <Button
                onClick={handleSqftSubmit}
                disabled={!formData.sqft || Number.parseInt(formData.sqft) <= 0}
                className="flex-1"
              >
                Next
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            )}
            {step === 4 && (
              <Button onClick={handleAddOnsNext} className="flex-1">
                Next
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        )}

        {(step === 2 || step === 5) && (
          <div className="pt-4">
            <Button variant="outline" onClick={prevStep} className="w-full bg-transparent">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
