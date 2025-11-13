"use client"

import { useState } from "react"
import type { ContactInfoData, EstimateBreakdown, BookingState } from "@/lib/booking-types"
import { usePricing } from "@/hooks/use-pricing"

interface ContactInfoProps {
  contactInfo: ContactInfoData
  estimate: EstimateBreakdown
  onChange: (data: Partial<ContactInfoData>) => void
  state?: BookingState
}

export function ContactInfo({ contactInfo, estimate, onChange, state }: ContactInfoProps) {
  const [validated, setValidated] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    address: false,
  })

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  })

  const [contactMethod, setContactMethod] = useState<"email" | "phone" | "text" | null>(null)
  const [timePreference, setTimePreference] = useState<"morning" | "afternoon" | "evening" | "flexible" | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>("")

  // Get pricing if state is available
  const pricing = usePricing(state)

  // Phone formatting
  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    const limited = cleaned.slice(0, 10)

    if (limited.length >= 6) {
      return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`
    } else if (limited.length >= 3) {
      return `(${limited.slice(0, 3)}) ${limited.slice(3)}`
    }
    return limited
  }

  // Validation functions
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email.trim())
  }

  const validatePhone = (phone: string) => {
    const regex = /^$$\d{3}$$ \d{3}-\d{4}$/
    return regex.test(phone)
  }

  const handleInputChange = (field: keyof ContactInfoData, value: string) => {
    if (field === "phone") {
      const formatted = formatPhone(value)
      onChange({ [field]: formatted })

      if (formatted.length > 0) {
        const isValid = validatePhone(formatted)
        setValidated((prev) => ({ ...prev, [field]: isValid }))
        setErrors((prev) => ({ ...prev, [field]: isValid ? "" : "Please enter a valid phone number" }))
      }
    } else if (field === "email") {
      onChange({ [field]: value })

      if (value.length > 0) {
        const isValid = validateEmail(value)
        setValidated((prev) => ({ ...prev, [field]: isValid }))
        setErrors((prev) => ({ ...prev, [field]: isValid ? "" : "Please enter a valid email address" }))
      }
    } else {
      onChange({ [field]: value })

      if (value.trim().length > 0) {
        setValidated((prev) => ({ ...prev, [field]: true }))
        setErrors((prev) => ({ ...prev, [field]: "" }))
      }
    }
  }

  const handleBlur = (field: keyof typeof validated) => {
    if (contactInfo[field]?.length === 0) {
      setValidated((prev) => ({ ...prev, [field]: false }))
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  // Set minimum date to today
  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Almost done!</h1>
        <p className="text-base md:text-lg text-muted-foreground">
          Just a few details to get your personalized estimate
        </p>
      </div>

      {/* Section 1: Personal Information */}
      <div
        className="bg-card rounded-2xl p-5 md:p-6 shadow-sm border border-border hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500"
        style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-xl shadow-lg">
            👤
          </div>
          <h2 className="text-xl font-bold text-foreground">Personal Information</h2>
        </div>

        <div className="space-y-4">
          {/* First Name */}
          <div className="relative">
            <input
              type="text"
              id="firstName"
              value={contactInfo.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              onBlur={() => handleBlur("firstName")}
              placeholder=" "
              className={`w-full h-14 px-4 pt-5 pb-2 bg-muted/50 border-2 rounded-xl text-base transition-all duration-300 outline-none
                ${
                  validated.firstName
                    ? "border-green-500 bg-green-50/50 dark:bg-green-950/20"
                    : errors.firstName
                      ? "border-red-500 bg-red-50/50 dark:bg-red-950/20"
                      : "border-border focus:border-primary focus:bg-background"
                }`}
            />
            <label
              htmlFor="firstName"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-base text-muted-foreground pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary"
              style={{
                top: contactInfo.firstName ? "8px" : "50%",
                fontSize: contactInfo.firstName ? "13px" : "16px",
                fontWeight: contactInfo.firstName ? 600 : 400,
                color: validated.firstName ? "rgb(34, 197, 94)" : undefined,
              }}
            >
              First Name
            </label>
            {validated.firstName && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 text-lg font-bold animate-in zoom-in duration-300">
                ✓
              </span>
            )}
          </div>

          {/* Last Name */}
          <div className="relative">
            <input
              type="text"
              id="lastName"
              value={contactInfo.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              onBlur={() => handleBlur("lastName")}
              placeholder=" "
              className={`w-full h-14 px-4 pt-5 pb-2 bg-muted/50 border-2 rounded-xl text-base transition-all duration-300 outline-none
                ${
                  validated.lastName
                    ? "border-green-500 bg-green-50/50 dark:bg-green-950/20"
                    : errors.lastName
                      ? "border-red-500 bg-red-50/50 dark:bg-red-950/20"
                      : "border-border focus:border-primary focus:bg-background"
                }`}
            />
            <label
              htmlFor="lastName"
              className="absolute left-4 pointer-events-none transition-all duration-300"
              style={{
                top: contactInfo.lastName ? "8px" : "50%",
                transform: contactInfo.lastName ? "none" : "translateY(-50%)",
                fontSize: contactInfo.lastName ? "13px" : "16px",
                fontWeight: contactInfo.lastName ? 600 : 400,
                color: validated.lastName ? "rgb(34, 197, 94)" : undefined,
              }}
            >
              Last Name
            </label>
            {validated.lastName && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 text-lg font-bold animate-in zoom-in duration-300">
                ✓
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Section 2: Contact Details */}
      <div
        className="bg-card rounded-2xl p-5 md:p-6 shadow-sm border border-border hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500"
        style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-xl shadow-lg">
            📧
          </div>
          <h2 className="text-xl font-bold text-foreground">Contact Details</h2>
        </div>

        <div className="space-y-4">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              id="email"
              value={contactInfo.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              placeholder=" "
              className={`w-full h-14 px-4 pt-5 pb-2 bg-muted/50 border-2 rounded-xl text-base transition-all duration-300 outline-none
                ${
                  validated.email
                    ? "border-green-500 bg-green-50/50 dark:bg-green-950/20"
                    : errors.email
                      ? "border-red-500 bg-red-50/50 dark:bg-red-950/20"
                      : "border-border focus:border-primary focus:bg-background"
                }`}
            />
            <label
              htmlFor="email"
              className="absolute left-4 pointer-events-none transition-all duration-300"
              style={{
                top: contactInfo.email ? "8px" : "50%",
                transform: contactInfo.email ? "none" : "translateY(-50%)",
                fontSize: contactInfo.email ? "13px" : "16px",
                fontWeight: contactInfo.email ? 600 : 400,
                color: validated.email ? "rgb(34, 197, 94)" : undefined,
              }}
            >
              Email
            </label>
            {validated.email && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 text-lg font-bold animate-in zoom-in duration-300">
                ✓
              </span>
            )}
            {errors.email && (
              <p className="text-xs text-red-500 mt-1.5 animate-in fade-in duration-200">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="relative">
            <input
              type="tel"
              id="phone"
              value={contactInfo.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              onBlur={() => handleBlur("phone")}
              placeholder=" "
              className={`w-full h-14 px-4 pt-5 pb-2 bg-muted/50 border-2 rounded-xl text-base transition-all duration-300 outline-none
                ${
                  validated.phone
                    ? "border-green-500 bg-green-50/50 dark:bg-green-950/20"
                    : errors.phone
                      ? "border-red-500 bg-red-50/50 dark:bg-red-950/20"
                      : "border-border focus:border-primary focus:bg-background"
                }`}
            />
            <label
              htmlFor="phone"
              className="absolute left-4 pointer-events-none transition-all duration-300"
              style={{
                top: contactInfo.phone ? "8px" : "50%",
                transform: contactInfo.phone ? "none" : "translateY(-50%)",
                fontSize: contactInfo.phone ? "13px" : "16px",
                fontWeight: contactInfo.phone ? 600 : 400,
                color: validated.phone ? "rgb(34, 197, 94)" : undefined,
              }}
            >
              Phone
            </label>
            {validated.phone && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 text-lg font-bold animate-in zoom-in duration-300">
                ✓
              </span>
            )}
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1.5 animate-in fade-in duration-200">{errors.phone}</p>
            )}
            {validated.phone && (
              <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1.5 animate-in fade-in duration-300">
                <span>📱</span>
                We'll text you updates
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Section 3: Service Address */}
      <div
        className="bg-card rounded-2xl p-5 md:p-6 shadow-sm border border-border hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500"
        style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-xl shadow-lg">
            📍
          </div>
          <h2 className="text-xl font-bold text-foreground">Service Address</h2>
        </div>

        <div className="relative">
          <input
            type="text"
            id="address"
            value={contactInfo.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            onBlur={() => handleBlur("address")}
            placeholder=" "
            className={`w-full h-14 px-4 pt-5 pb-2 bg-muted/50 border-2 rounded-xl text-base transition-all duration-300 outline-none
              ${
                validated.address
                  ? "border-green-500 bg-green-50/50 dark:bg-green-950/20"
                  : errors.address
                    ? "border-red-500 bg-red-50/50 dark:bg-red-950/20"
                    : "border-border focus:border-primary focus:bg-background"
              }`}
          />
          <label
            htmlFor="address"
            className="absolute left-4 pointer-events-none transition-all duration-300"
            style={{
              top: contactInfo.address ? "8px" : "50%",
              transform: contactInfo.address ? "none" : "translateY(-50%)",
              fontSize: contactInfo.address ? "13px" : "16px",
              fontWeight: contactInfo.address ? 600 : 400,
              color: validated.address ? "rgb(34, 197, 94)" : undefined,
            }}
          >
            Street Address
          </label>
          {validated.address && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 text-lg font-bold animate-in zoom-in duration-300">
              ✓
            </span>
          )}
        </div>
      </div>

      {/* Section 4: How to Reach You */}
      <div
        className="bg-card rounded-2xl p-5 md:p-6 shadow-sm border border-border hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500"
        style={{ animationDelay: "0.4s", animationFillMode: "backwards" }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-xl shadow-lg">
            💬
          </div>
          <h2 className="text-xl font-bold text-foreground">How to Reach You</h2>
        </div>

        <div className="space-y-3">
          {(["email", "phone", "text"] as const).map((method) => (
            <label
              key={method}
              className={`flex items-center gap-3 p-4 bg-muted/30 border-2 rounded-xl cursor-pointer transition-all duration-300 active:scale-[0.98]
                ${
                  contactMethod === method
                    ? "border-primary bg-primary/10 shadow-sm"
                    : "border-transparent hover:bg-muted/50"
                }`}
              onClick={() => setContactMethod(method)}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                  ${contactMethod === method ? "border-primary border-[6px]" : "border-border"}`}
              />
              <span className="flex-1 text-base font-medium text-foreground">
                {method === "email" ? "Email" : method === "phone" ? "Phone Call" : "Text Message"}
              </span>
              <span className="text-xl">{method === "email" ? "📧" : method === "phone" ? "📞" : "💬"}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Section 5: Scheduling */}
      <div
        className="bg-card rounded-2xl p-5 md:p-6 shadow-sm border border-border hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500"
        style={{ animationDelay: "0.5s", animationFillMode: "backwards" }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-xl shadow-lg">
            📅
          </div>
          <h2 className="text-xl font-bold text-foreground">When would you like service?</h2>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={today}
              className="w-full h-14 px-4 pt-5 pb-2 bg-muted/50 border-2 border-border rounded-xl text-base transition-all duration-300 outline-none focus:border-primary focus:bg-background"
            />
            <label
              htmlFor="date"
              className="absolute left-4 top-2 text-xs font-semibold text-muted-foreground pointer-events-none"
            >
              Preferred Date
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "morning", icon: "🌅", label: "Morning", sublabel: "8am-12pm" },
              { value: "afternoon", icon: "☀️", label: "Afternoon", sublabel: "12pm-4pm" },
              { value: "evening", icon: "🌆", label: "Evening", sublabel: "4pm-8pm" },
            ].map((time) => (
              <button
                key={time.value}
                type="button"
                onClick={() => setTimePreference(time.value as any)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 active:scale-95
                  ${
                    timePreference === time.value
                      ? "border-primary bg-gradient-to-br from-primary to-primary/90 text-primary-foreground shadow-lg"
                      : "border-transparent bg-muted/30 hover:bg-muted/50"
                  }`}
              >
                <span className="text-2xl">{time.icon}</span>
                <span className="text-sm font-semibold">{time.label}</span>
                <span className="text-xs opacity-80">{time.sublabel}</span>
              </button>
            ))}

            <button
              type="button"
              onClick={() => setTimePreference("flexible")}
              className={`col-span-2 p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden active:scale-95
                ${
                  timePreference === "flexible"
                    ? "border-orange-500 bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg"
                    : "border-transparent bg-muted/30 hover:bg-muted/50"
                }`}
            >
              <span className="text-2xl">⭐</span>
              <div className="flex flex-col items-center">
                <span className="text-sm font-semibold">I'm Flexible</span>
                <span className="text-xs opacity-90">Best availability</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div
        className="flex justify-around py-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
        style={{ animationDelay: "0.6s", animationFillMode: "backwards" }}
      >
        {[
          { icon: "💰", text: "Free\nEstimate" },
          { icon: "✓", text: "No\nObligation" },
          { icon: "⚡", text: "Quick\nResponse" },
        ].map((badge, i) => (
          <div key={i} className="flex flex-col items-center gap-2 text-center">
            <div className="text-3xl animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>
              {badge.icon}
            </div>
            <div className="text-xs font-medium text-muted-foreground whitespace-pre-line">{badge.text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
