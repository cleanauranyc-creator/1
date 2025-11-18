"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import type { ServiceId, PropertyData } from "@/lib/booking-types"
import { SERVICES } from "@/lib/booking-pricing-engine"
import { cn } from "@/lib/utils"

interface PropertyDetailsProps {
  serviceId: ServiceId
  propertyData: PropertyData
  onChange: (data: Partial<PropertyData>) => void
}

export function PropertyDetails({ serviceId, propertyData, onChange }: PropertyDetailsProps) {
  const service = SERVICES[serviceId]

  if (service.type === "flat") {
    return <FlatRateForm propertyData={propertyData} onChange={onChange} />
  }

  if (service.type === "hourly") {
    return <HourlyForm serviceId={serviceId} propertyData={propertyData} onChange={onChange} />
  }

  if (service.type === "consultation") {
    return <ConsultationForm serviceId={serviceId} propertyData={propertyData} onChange={onChange} />
  }

  return null
}

function FlatRateForm({ propertyData, onChange }: Omit<PropertyDetailsProps, "serviceId">) {
  const [sqft, setSqft] = useState(propertyData.sqft?.toString() || "")
  const [bedrooms, setBedrooms] = useState(propertyData.bedrooms?.toString() || "")
  const [bathrooms, setBathrooms] = useState(propertyData.bathrooms?.toString() || "")
  const [unfurnished, setUnfurnished] = useState(false)
  const [hasPets, setHasPets] = useState(false)
  const [petsType, setPetsType] = useState("")
  const [frequency, setFrequency] = useState<"weekly" | "biweekly" | "monthly" | null>(null)

  const handleSqftChange = (value: string) => {
    setSqft(value)
    const num = Number.parseInt(value) || 0
    if (num >= 100 && num <= 10000) {
      onChange({ sqft: num })
    }
  }

  const handleBedroomsChange = (value: string) => {
    setBedrooms(value)
    const num = value === "studio" ? 0 : Number.parseInt(value) || 0
    onChange({ bedrooms: num })
  }

  const handleBathroomsChange = (value: string) => {
    setBathrooms(value)
    const num = Number.parseFloat(value) || 0
    onChange({ bathrooms: num })
  }

  const handleUnfurnishedToggle = (checked: boolean) => {
    setUnfurnished(checked)
    onChange({ unfurnished: checked })
  }

  const handlePetsToggle = (checked: boolean) => {
    setHasPets(checked)
    onChange({ hasPets: checked })
  }

  const handleFrequencySelect = (freq: "weekly" | "biweekly" | "monthly") => {
    setFrequency(freq)
    onChange({ frequency: freq })
  }

  return (
    <div className="space-y-6 pb-24">
      <div>
        <h2 className="text-[28px] font-bold tracking-tight leading-tight mb-1">Tell us about your property</h2>
      </div>

      {/* Square Footage - Optional */}
      <div className="relative">
        <Input
          id="sqft"
          type="number"
          className="peer h-14 pt-6 pb-2 px-4 text-lg pr-16"
          placeholder=" "
          value={sqft}
          onChange={(e) => handleSqftChange(e.target.value)}
          min="100"
          max="10000"
        />
        <label
          htmlFor="sqft"
          className={cn(
            "absolute left-4 transition-all pointer-events-none text-muted-foreground",
            "peer-placeholder-shown:top-4 peer-placeholder-shown:text-base",
            "peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary",
            sqft ? "top-2 text-xs" : "top-4 text-base",
          )}
        >
          Square Footage (optional)
        </label>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-base font-medium text-muted-foreground">
          sq ft
        </span>
        {sqft && Number.parseInt(sqft) >= 100 && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center animate-in zoom-in duration-200">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-1 ml-1">Approximate total living space</p>
      </div>

      {/* Bedrooms and Bathrooms - Required Selects */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <select
            id="bedrooms"
            value={bedrooms}
            onChange={(e) => handleBedroomsChange(e.target.value)}
            className={cn(
              "w-full h-14 px-4 rounded-lg border-2 text-lg font-semibold text-center appearance-none cursor-pointer transition-all",
              "focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20",
              bedrooms ? "border-primary bg-card" : "border-border bg-card text-muted-foreground",
            )}
          >
            <option value="" disabled>
              Bedrooms
            </option>
            <option value="studio">Studio</option>
            <option value="1">1 BR</option>
            <option value="2">2 BR</option>
            <option value="3">3 BR</option>
            <option value="4">4 BR</option>
            <option value="5">5+ BR</option>
          </select>
        </div>

        <div className="relative">
          <select
            id="bathrooms"
            value={bathrooms}
            onChange={(e) => handleBathroomsChange(e.target.value)}
            className={cn(
              "w-full h-14 px-4 rounded-lg border-2 text-lg font-semibold text-center appearance-none cursor-pointer transition-all",
              "focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20",
              bathrooms ? "border-primary bg-card" : "border-border bg-card text-muted-foreground",
            )}
          >
            <option value="" disabled>
              Bathrooms
            </option>
            <option value="1">1</option>
            <option value="1.5">1.5</option>
            <option value="2">2</option>
            <option value="2.5">2.5</option>
            <option value="3">3</option>
            <option value="3.5">3+</option>
          </select>
        </div>
      </div>

      {/* Unfurnished Toggle */}
      <div className="flex items-center justify-between py-3 px-1 gap-x-8">
        <label htmlFor="unfurnished-toggle" className="text-lg font-medium text-foreground cursor-pointer">
          Is your apartment unfurnished?
        </label>
        <button
          type="button"
          role="switch"
          aria-checked={unfurnished}
          onClick={() => handleUnfurnishedToggle(!unfurnished)}
          className={cn(
            "relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            "border-2",
            unfurnished ? "bg-primary border-primary" : "bg-muted border-border",
          )}
        >
          <span
            className={cn(
              "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
              unfurnished ? "translate-x-7" : "translate-x-1",
              "mt-0.5",
            )}
          />
        </button>
      </div>

      {/* Pets Toggle */}
      <div className="space-y-3">
        <div className="flex items-center justify-between py-3 px-1 gap-x-8">
          <label htmlFor="pets-toggle" className="text-lg font-medium text-foreground cursor-pointer">
            Do you have pets at home?
          </label>
          <button
            type="button"
            role="switch"
            aria-checked={hasPets}
            onClick={() => handlePetsToggle(!hasPets)}
            className={cn(
              "relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              "border-2",
              hasPets ? "bg-primary border-primary" : "bg-muted border-border",
            )}
          >
            <span
              className={cn(
                "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
                hasPets ? "translate-x-7" : "translate-x-1",
                "mt-0.5",
              )}
            />
          </button>
        </div>

        {/* Expandable Pets Type Input */}
        {hasPets && (
          <div className="animate-in slide-in-from-top-2 duration-300 space-y-2">
            <label htmlFor="pets-type" className="block text-sm text-muted-foreground">
              What kind?
            </label>
            <Input
              id="pets-type"
              type="text"
              className="h-14 px-4 text-base"
              placeholder="e.g. dog, cat, etc."
              value={petsType}
              onChange={(e) => setPetsType(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Some of our cleaners have allergies, so please let us know what kind of pets you have.
            </p>
          </div>
        )}
      </div>

      {/* Frequency Options */}
      <div className="space-y-4 pt-4">
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => handleFrequencySelect("weekly")}
            className={cn(
              "px-3 py-4 rounded-lg border-2 transition-all text-center",
              frequency === "weekly"
                ? "border-primary bg-primary/10 shadow-md"
                : "border-border bg-card hover:border-primary/50",
            )}
          >
            <div className="font-semibold text-base mb-2">Weekly</div>
            <div className="text-sm text-muted-foreground leading-tight">
              Save <span className="font-bold text-primary">25%</span> with weekly cleanings
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleFrequencySelect("biweekly")}
            className={cn(
              "px-3 py-4 rounded-lg border-2 transition-all text-center",
              frequency === "biweekly"
                ? "border-primary bg-primary/10 shadow-md"
                : "border-border bg-card hover:border-primary/50",
            )}
          >
            <div className="font-semibold text-base mb-2">Biweekly</div>
            <div className="text-sm text-muted-foreground leading-tight">
              Save <span className="font-bold text-primary">15%</span> with biweekly cleanings
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleFrequencySelect("monthly")}
            className={cn(
              "px-3 py-4 rounded-lg border-2 transition-all text-center",
              frequency === "monthly"
                ? "border-primary bg-primary/10 shadow-md"
                : "border-border bg-card hover:border-primary/50",
            )}
          >
            <div className="font-semibold text-base mb-2">Monthly</div>
            <div className="text-sm text-muted-foreground leading-tight">
              Save <span className="font-bold text-primary">10%</span> with monthly cleanings
            </div>
          </button>
        </div>
      </div>

      {/* Warning Alert for Non-Standard Size */}
      {sqft && bedrooms && bathrooms && Number.parseInt(sqft) > 2000 && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-start gap-3">
            <div className="text-xl flex-shrink-0">⚠️</div>
            <div>
              <div className="font-semibold text-sm text-yellow-900 dark:text-yellow-100 mb-1">Non-Standard Size</div>
              <div className="text-xs text-yellow-800 dark:text-yellow-200 leading-relaxed">
                Your property exceeds standard ceiling. Manager will review and provide custom quote within 24 hours.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function HourlyForm({ serviceId, propertyData, onChange }: PropertyDetailsProps) {
  const service = SERVICES[serviceId]
  const [hours, setHours] = useState(propertyData.hours?.toString() || "3")
  const [teamSize, setTeamSize] = useState(propertyData.teamSize?.toString() || "1")

  const handleHoursChange = (value: string) => {
    setHours(value)
    const num = Number.parseInt(value) || 0
    if (num >= 2 && num <= 8) {
      onChange({ hours: num })
    }
  }

  const handleTeamSizeChange = (value: string) => {
    setTeamSize(value)
    const num = Number.parseInt(value) || 1
    if (num >= 1 && num <= 4) {
      onChange({ teamSize: num })
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Customize your service</h2>
        <p className="text-muted-foreground">
          {service.name} at {service.hourlyRate ? `$${service.hourlyRate}/hour` : "$50/hour"}
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-3">How many hours do you need?</label>
          <div className="grid grid-cols-4 gap-3">
            {[2, 3, 4, 5, 6, 7, 8].map((h) => (
              <button
                key={h}
                onClick={() => handleHoursChange(h.toString())}
                className={cn(
                  "h-12 rounded-lg border-2 font-semibold transition-all",
                  Number.parseInt(hours) === h
                    ? "bg-primary border-primary text-primary-foreground shadow-md"
                    : "bg-card border-border hover:border-primary/50 hover:bg-primary/5",
                )}
              >
                {h}h
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-3">Team size</label>
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((size) => (
              <button
                key={size}
                onClick={() => handleTeamSizeChange(size.toString())}
                className={cn(
                  "h-12 rounded-lg border-2 font-semibold transition-all",
                  Number.parseInt(teamSize) === size
                    ? "bg-primary border-primary text-primary-foreground shadow-md"
                    : "bg-card border-border hover:border-primary/50 hover:bg-primary/5",
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Minimum 2 hours. Additional team members help complete work faster.
          </p>
        </div>
      </div>
    </div>
  )
}

function ConsultationForm({ serviceId, propertyData, onChange }: PropertyDetailsProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Tell us about your space</h2>
        <p className="text-muted-foreground">This helps us prepare an accurate quote</p>
      </div>

      {serviceId === "airbnb" && <AirbnbSpecificFields propertyData={propertyData} onChange={onChange} />}
      {serviceId === "construction" && <ConstructionSpecificFields propertyData={propertyData} onChange={onChange} />}
      {serviceId === "commercial" && <CommercialSpecificFields propertyData={propertyData} onChange={onChange} />}
      {serviceId === "heavy" && <HeavyDutySpecificFields propertyData={propertyData} onChange={onChange} />}
      {serviceId === "organizing" && <OrganizingSpecificFields propertyData={propertyData} onChange={onChange} />}

      {serviceId !== "organizing" && <ServiceFrequencySection propertyData={propertyData} onChange={onChange} />}

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg
              className="w-3 h-3 text-yellow-600 dark:text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">
            <span className="font-semibold">Custom Quote:</span> A manager will contact you within 1 hour to discuss
            your specific needs and provide an accurate estimate.
          </p>
        </div>
      </div>
    </div>
  )
}

function AirbnbSpecificFields({ propertyData, onChange }: Omit<PropertyDetailsProps, "serviceId">) {
  const urgencies = [
    { id: "same-day", label: "Same-Day Turnover", badge: "+30% RUSH FEE", badgeColor: "yellow" },
    { id: "next-day", label: "Next-Day Turnover", badge: "MOST COMMON", badgeColor: "blue" },
    { id: "flexible", label: "Flexible Timing", badge: "-10% DISCOUNT", badgeColor: "green" },
  ]

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold">When do you need cleaning?</label>
      <div className="space-y-3">
        {urgencies.map((urgency) => (
          <RadioCard
            key={urgency.id}
            selected={propertyData.urgency === urgency.id}
            onClick={() => onChange({ urgency: urgency.id })}
            label={urgency.label}
            badge={urgency.badge}
            badgeColor={urgency.badgeColor}
          />
        ))}
      </div>
    </div>
  )
}

function ConstructionSpecificFields({ propertyData, onChange }: Omit<PropertyDetailsProps, "serviceId">) {
  const projectTypes = [
    { id: "light", label: "Light Renovation", description: "Paint, floors, minor work" },
    { id: "moderate", label: "Moderate Renovation", description: "Kitchen/bath updates" },
    { id: "heavy", label: "Heavy Construction", description: "Gut renovation, structural" },
  ]

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold">Construction scope</label>
      <div className="space-y-3">
        {projectTypes.map((type) => (
          <RadioCard
            key={type.id}
            selected={propertyData.constructionType === type.id}
            onClick={() => onChange({ constructionType: type.id })}
            label={type.label}
            description={type.description}
          />
        ))}
      </div>
    </div>
  )
}

function CommercialSpecificFields({ propertyData, onChange }: Omit<PropertyDetailsProps, "serviceId">) {
  const [sqft, setSqft] = useState(propertyData.sqft?.toString() || "")
  const [offices, setOffices] = useState(propertyData.offices?.toString() || "")
  const [confRooms, setConfRooms] = useState(propertyData.confRooms?.toString() || "")

  const spaceTypes = [
    { id: "office", label: "Office Space", description: "Desks, meeting rooms" },
    { id: "retail", label: "Retail Store", description: "Customer-facing space" },
    { id: "medical", label: "Medical Facility", description: "Higher sanitation standards" },
    { id: "other", label: "Other Commercial", description: "Tell us more" },
  ]

  return (
    <>
      {/* Office Dimensions */}
      <div className="space-y-4">
        <label className="block text-sm font-semibold">Office Dimensions</label>
        <div className="grid grid-cols-3 gap-4">
          <FloatingInput
            id="sqft"
            label="Sq. Ft."
            type="number"
            value={sqft}
            onChange={(e) => {
              setSqft(e.target.value)
              onChange({ sqft: Number.parseInt(e.target.value) || 0 })
            }}
            min="500"
            step="100"
            placeholder=" "
          />

          <FloatingInput
            id="offices"
            label="Offices"
            type="number"
            value={offices}
            onChange={(e) => {
              setOffices(e.target.value)
              onChange({ offices: Number.parseInt(e.target.value) || 0 })
            }}
            min="0"
            max="50"
            placeholder=" "
          />

          <FloatingInput
            id="confRooms"
            label="Conf Rooms"
            type="number"
            value={confRooms}
            onChange={(e) => {
              setConfRooms(e.target.value)
              onChange({ confRooms: Number.parseInt(e.target.value) || 0 })
            }}
            min="0"
            max="20"
            placeholder=" "
          />
        </div>
        <p className="text-xs text-muted-foreground italic">Approximate total square footage</p>
      </div>

      {/* Space Type */}
      <div className="space-y-4">
        <label className="block text-sm font-semibold">Space type</label>
        <div className="space-y-3">
          {spaceTypes.map((type) => (
            <RadioCard
              key={type.id}
              selected={propertyData.spaceType === type.id}
              onClick={() => onChange({ spaceType: type.id })}
              label={type.label}
              description={type.description}
            />
          ))}
        </div>
      </div>
    </>
  )
}

function HeavyDutySpecificFields({ propertyData, onChange }: Omit<PropertyDetailsProps, "serviceId">) {
  const [sqft, setSqft] = useState(propertyData.sqft?.toString() || "")
  const [bedrooms, setBedrooms] = useState(propertyData.bedrooms?.toString() || "")

  const severityLevels = [
    { id: "moderate", label: "Moderate Clutter", description: "Some areas need deep cleaning" },
    { id: "heavy", label: "Heavy Clutter", description: "Multiple rooms affected" },
    { id: "severe", label: "Severe Hoarding", description: "Professional intervention needed" },
  ]

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <FloatingInput
          id="bedrooms"
          label="Bedrooms"
          type="number"
          value={bedrooms}
          onChange={(e) => {
            setBedrooms(e.target.value)
            onChange({ bedrooms: Number.parseInt(e.target.value) || 0 })
          }}
          min="0"
          max="10"
          placeholder=" "
        />

        <FloatingInput
          id="sqft"
          label="Sq. Ft."
          type="number"
          value={sqft}
          onChange={(e) => {
            setSqft(e.target.value)
            onChange({ sqft: Number.parseInt(e.target.value) || 0 })
          }}
          min="0"
          placeholder=" "
        />
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-semibold">Severity Level</label>
        <div className="space-y-3">
          {severityLevels.map((level) => (
            <RadioCard
              key={level.id}
              selected={propertyData.severityLevel === level.id}
              onClick={() => onChange({ severityLevel: level.id })}
              label={level.label}
              description={level.description}
            />
          ))}
        </div>
      </div>
    </>
  )
}

function OrganizingSpecificFields({ propertyData, onChange }: Omit<PropertyDetailsProps, "serviceId">) {
  const [hours, setHours] = useState(propertyData.hours || 3)
  const [organizers, setOrganizers] = useState(propertyData.teamSize || 1)
  const [otherProperty, setOtherProperty] = useState("")

  const propertyTypes = [
    { id: "apartment", icon: "🏢", label: "Apartment", description: "Residential unit in building" },
    { id: "house", icon: "🏠", label: "House", description: "Single-family residence" },
    { id: "other", icon: "📍", label: "Other", description: "Specify your property type" },
  ]

  const minRate = 45
  const maxRate = 65
  const minTotal = hours * organizers * minRate
  const maxTotal = hours * organizers * maxRate

  const handlePropertySelect = (typeId: string) => {
    onChange({ organizingType: typeId })
    if (typeId !== "other") {
      setOtherProperty("")
    }
  }

  const incrementHours = () => {
    if (hours < 10) {
      const newHours = hours + 1
      setHours(newHours)
      onChange({ hours: newHours })
    }
  }

  const decrementHours = () => {
    if (hours > 3) {
      const newHours = hours - 1
      setHours(newHours)
      onChange({ hours: newHours })
    }
  }

  const incrementOrganizers = () => {
    if (organizers < 6) {
      const newOrganizers = organizers + 1
      setOrganizers(newOrganizers)
      onChange({ teamSize: newOrganizers })
    }
  }

  const decrementOrganizers = () => {
    if (organizers > 1) {
      const newOrganizers = organizers - 1
      setOrganizers(newOrganizers)
      onChange({ teamSize: newOrganizers })
    }
  }

  return (
    <>
      {/* Property Type Selection */}
      <div className="space-y-4">
        <label className="block text-sm font-semibold">Property Type</label>
        <div className="space-y-3">
          {propertyTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handlePropertySelect(type.id)}
              className={cn(
                "w-full min-h-[80px] px-4 py-3 rounded-xl border-2 transition-all text-left",
                "hover:border-primary/50 hover:bg-primary/5 active:scale-[0.98]",
                propertyData.organizingType === type.id
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-border bg-card",
              )}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl flex-shrink-0">{type.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-base">{type.label}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{type.description}</div>
                </div>
                <div
                  className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
                    propertyData.organizingType === type.id ? "border-primary bg-primary" : "border-border",
                  )}
                >
                  {propertyData.organizingType === type.id && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary-foreground" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Other Property Type Input */}
        {propertyData.organizingType === "other" && (
          <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <FloatingInput
              id="otherProperty"
              label="Please specify"
              type="text"
              value={otherProperty}
              onChange={(e) => setOtherProperty(e.target.value)}
              placeholder=" "
            />
          </div>
        )}
      </div>

      {/* Service Configuration */}
      <div className="space-y-4">
        <label className="block text-sm font-semibold">Service Configuration</label>

        <p className="text-xs text-muted-foreground">Minimum 3 hours</p>

        {/* Hours Stepper */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="font-semibold">Hours Needed</div>
          </div>

          <div className="flex items-center justify-center gap-4 h-14 mb-3">
            <button
              onClick={decrementHours}
              disabled={hours <= 3}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95",
                "bg-primary text-primary-foreground shadow-md hover:bg-primary/90",
                "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-primary",
              )}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
              </svg>
            </button>

            <div className="text-5xl font-bold tracking-tight min-w-[64px] text-center tabular-nums">{hours}</div>

            <button
              onClick={incrementHours}
              disabled={hours >= 10}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95",
                "bg-primary text-primary-foreground shadow-md hover:bg-primary/90",
                "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-primary",
              )}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <p className="text-sm text-muted-foreground text-center">Select service duration</p>
        </div>

        {/* Organizers Stepper */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="font-semibold">Number of Organizers</div>
            <div className="text-xs text-muted-foreground">Max 6 organizers</div>
          </div>

          <div className="flex items-center justify-center gap-4 h-14 mb-3">
            <button
              onClick={decrementOrganizers}
              disabled={organizers <= 1}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95",
                "bg-primary text-primary-foreground shadow-md hover:bg-primary/90",
                "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-primary",
              )}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
              </svg>
            </button>

            <div className="text-5xl font-bold tracking-tight min-w-[64px] text-center tabular-nums">{organizers}</div>

            <button
              onClick={incrementOrganizers}
              disabled={organizers >= 6}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95",
                "bg-primary text-primary-foreground shadow-md hover:bg-primary/90",
                "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-primary",
              )}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <p className="text-sm text-muted-foreground text-center">Additional organizers available</p>
        </div>

        {/* Price Breakdown Card */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-5">
          <div className="font-semibold text-sm text-primary mb-4">Price Breakdown</div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-primary flex items-center gap-2">
                Hourly Rate
                <span className="group relative inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] cursor-help">
                  <span className="font-bold">i</span>
                  <span className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-foreground text-background text-xs rounded-lg whitespace-normal text-center z-10">
                    Rate varies by complexity - apartments typically $45-55/hr, houses $55-65/hr
                    <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-foreground" />
                  </span>
                </span>
              </span>
              <span className="text-primary font-medium">
                ${minRate}-{maxRate}/hr
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-primary">Team Size</span>
              <span className="text-primary font-medium">
                {organizers} organizer{organizers > 1 ? "s" : ""}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-primary">Duration</span>
              <span className="text-primary font-medium">
                {hours} hour{hours > 1 ? "s" : ""}
              </span>
            </div>

            <div className="h-px bg-primary/20 my-3" />

            <div className="flex items-start justify-between">
              <span className="font-semibold text-primary">Estimated Total</span>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary tabular-nums">
                  ${minTotal} - ${maxTotal}
                </div>
                <p className="text-xs text-primary/70 italic mt-1">Depends on project complexity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function ServiceFrequencySection({ propertyData, onChange }: Omit<PropertyDetailsProps, "serviceId">) {
  const frequencies = [
    {
      id: "one-time",
      label: "One-Time Deep Clean",
      description: "Thorough cleaning for special occasions",
      badge: "POPULAR",
      badgeColor: "blue" as const,
    },
    {
      id: "recurring",
      label: "Recurring Service Setup",
      description: "Regular schedule (consultation required)",
      badge: null,
      badgeColor: null,
    },
  ]

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold">Service Frequency</label>
      <div className="space-y-3">
        {frequencies.map((freq) => (
          <RadioCard
            key={freq.id}
            selected={propertyData.frequency === freq.id}
            onClick={() => onChange({ frequency: freq.id })}
            label={freq.label}
            description={freq.description}
            badge={freq.badge || undefined}
            badgeColor={freq.badgeColor || undefined}
          />
        ))}
      </div>
    </div>
  )
}

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
}

function FloatingInput({ label, id, ...props }: FloatingInputProps) {
  return (
    <div className="relative">
      <Input id={id} className="peer h-14 pt-6 pb-2 px-4" {...props} />
      <label
        htmlFor={id}
        className={cn(
          "absolute left-4 transition-all pointer-events-none text-muted-foreground",
          "peer-placeholder-shown:top-4 peer-placeholder-shown:text-base",
          "peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary",
          "top-2 text-xs",
        )}
      >
        {label}
      </label>
    </div>
  )
}

interface RadioCardProps {
  selected: boolean
  onClick: () => void
  label: string
  description?: string
  badge?: string
  badgeColor?: "yellow" | "blue" | "green"
}

function RadioCard({ selected, onClick, label, description, badge, badgeColor = "blue" }: RadioCardProps) {
  const badgeColors = {
    yellow: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
    blue: "bg-primary/10 text-primary border-primary/20",
    green: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full min-h-[60px] px-4 py-3 rounded-xl border-2 transition-all text-left relative",
        "hover:border-primary/50 hover:bg-primary/5",
        selected ? "border-primary bg-primary/10 shadow-md" : "border-border bg-card",
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
            selected ? "border-primary bg-primary" : "border-border",
          )}
        >
          {selected && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm">{label}</div>
          {description && <div className="text-xs text-muted-foreground mt-0.5">{description}</div>}
        </div>

        {badge && (
          <div
            className={cn(
              "text-[10px] font-bold px-2 py-1 rounded-md border uppercase tracking-wide",
              badgeColors[badgeColor],
            )}
          >
            {badge}
          </div>
        )}
      </div>
    </button>
  )
}
