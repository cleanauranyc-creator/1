"use client"

import { useState, useEffect } from "react"
import type { ServiceId, AddOnSelection, PropertyData } from "@/lib/booking-types"
import { ADDONS, BUNDLES } from "@/lib/booking-pricing-engine"

interface AddOnsCustomizationProps {
  serviceId: ServiceId
  selectedAddOns: AddOnSelection[]
  propertyData: PropertyData
  onChange: (addOns: AddOnSelection[]) => void
  onTimeUpdate?: (totalMinutes: number) => void
}

export function AddOnsCustomization({
  serviceId,
  selectedAddOns,
  propertyData,
  onChange,
  onTimeUpdate,
}: AddOnsCustomizationProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["kitchen"]))
  const [showBundleSuggestion, setShowBundleSuggestion] = useState(false)
  const [bundleRejected, setBundleRejected] = useState(false)
  const [bundleActive, setBundleActive] = useState(false)
  const [summaryExpanded, setSummaryExpanded] = useState(false)
  const [laundryLocation, setLaundryLocation] = useState<"in-unit" | "building">("in-unit")

  const isDeepClean = serviceId === "deep"
  const isStandard = serviceId === "standard"

  useEffect(() => {
    if (isDeepClean && !selectedAddOns.some((a) => a.id === "baseboards")) {
      onChange([...selectedAddOns, { id: "baseboards", quantity: 1 }])
    }
  }, [isDeepClean])

  useEffect(() => {
    const bundle = BUNDLES.essentialDeepClean
    const hasAllItems = bundle.items.every((item) => selectedAddOns.some((a) => a.id === item))

    // Auto-activate bundle if all 3 items are selected
    if (hasAllItems && !bundleActive) {
      setBundleActive(true)
      setShowBundleSuggestion(false)
    }

    // Deactivate bundle if user removes any bundle item
    if (!hasAllItems && bundleActive) {
      setBundleActive(false)
    }
  }, [selectedAddOns, bundleActive])

  useEffect(() => {
    if (bundleActive || bundleRejected) return

    const bundle = BUNDLES.essentialDeepClean
    const selectedBundleItems = bundle.items.filter((item) => selectedAddOns.some((a) => a.id === item))

    // Show suggestion when exactly 2 out of 3 bundle items are selected
    if (selectedBundleItems.length === 2 && !showBundleSuggestion) {
      setShowBundleSuggestion(true)
      setTimeout(() => setShowBundleSuggestion(false), 5000)
    }
  }, [selectedAddOns, bundleActive, showBundleSuggestion, bundleRejected])

  const calculateTotals = () => {
    let subtotal = 0
    let totalTime = 0
    let savings = 0

    selectedAddOns.forEach((addon) => {
      const addonData = ADDONS[addon.id as keyof typeof ADDONS]
      if (!addonData) return

      const qty = addon.quantity || 1
      let price = 0

      if (addon.id === "baseboards") {
        const bedrooms = propertyData.bedrooms || 0
        if (bedrooms <= 2) price = 20
        else if (bedrooms === 3) price = 30
        else price = 40
        // Free for Deep Clean
        if (isDeepClean) price = 0
      } else {
        price = addonData.pricePerUnit ? addonData.pricePerUnit * qty : addonData.price || 0
      }

      const time = addonData.time * qty

      subtotal += price
      totalTime += time
    })

    // Bundle discount
    if (bundleActive) {
      const bundle = BUNDLES.essentialDeepClean
      const hasAllItems = bundle.items.every((item) => selectedAddOns.some((a) => a.id === item))
      if (hasAllItems) savings = bundle.savings
    }

    const total = subtotal - savings

    if (onTimeUpdate) onTimeUpdate(totalTime)

    return { subtotal, savings, total, totalTime, count: selectedAddOns.length }
  }

  const totals = calculateTotals()

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) newExpanded.delete(section)
    else newExpanded.add(section)
    setExpandedSections(newExpanded)
  }

  const toggleAddon = (addonId: string) => {
    // Baseboards can't be deselected for Deep Clean
    if (addonId === "baseboards" && isDeepClean) return

    const exists = selectedAddOns.find((a) => a.id === addonId)
    if (exists) {
      onChange(selectedAddOns.filter((a) => a.id !== addonId))
      // Deactivate bundle if removing bundle item
      if (BUNDLES.essentialDeepClean.items.includes(addonId)) setBundleActive(false)
    } else {
      onChange([...selectedAddOns, { id: addonId, quantity: 1 }])
    }
  }

  const updateQuantity = (addonId: string, newQty: number) => {
    const addon = ADDONS[addonId as keyof typeof ADDONS]
    if (!addon) return
    const clamped = Math.max(1, Math.min(addon.maxQty || 1, newQty))
    onChange(selectedAddOns.map((a) => (a.id === addonId ? { ...a, quantity: clamped } : a)))
  }

  const toggleBundle = () => {
    const bundle = BUNDLES.essentialDeepClean
    if (!bundleActive) {
      const newAddOns = [...selectedAddOns]
      bundle.items.forEach((item) => {
        if (!newAddOns.some((a) => a.id === item)) {
          newAddOns.push({ id: item, quantity: 1 })
        }
      })
      onChange(newAddOns)
      setBundleActive(true)
    } else {
      onChange(selectedAddOns.filter((a) => !bundle.items.includes(a.id)))
      setBundleActive(false)
    }
  }

  const applyBundle = () => {
    toggleBundle()
    setShowBundleSuggestion(false)
  }

  const rejectBundle = () => {
    setShowBundleSuggestion(false)
    setBundleRejected(true)
  }

  const removeAddon = (addonId: string) => {
    if (addonId === "baseboards" && isDeepClean) return
    toggleAddon(addonId)
  }

  const sections = [
    {
      id: "kitchen",
      title: "Kitchen Deep Clean",
      icon: "🧽",
      addons: ["fridge", "oven", "cabinets"],
    },
    {
      id: "windows",
      title: "Windows & Surfaces",
      icon: "🪟",
      addons: ["windows", "blinds", "baseboards", "walls", "stairs"],
    },
    {
      id: "household",
      title: "Household Tasks",
      icon: "🧺",
      addons: ["laundry", "dishes", "ironing"],
    },
    {
      id: "equipment",
      title: "Premium Equipment",
      icon: "✨",
      addons: ["vacuum", "steamer"],
    },
  ]

  return (
    <>
      <div className="space-y-6 pb-40">
        <div className="mb-7">
          <h2 className="text-[28px] font-bold tracking-tight leading-tight mb-2">Customize your service</h2>
          <p className="text-[17px] text-muted-foreground">Add extras to make your space shine</p>
        </div>

        <div
          onClick={toggleBundle}
          className={`relative rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
            bundleActive
              ? "bg-gradient-to-br from-amber-400/20 to-amber-500/20 border-2 border-amber-400 shadow-lg"
              : "bg-gradient-to-br from-amber-400/10 to-amber-500/10 border-2 border-amber-300/50"
          } active:scale-[0.98]`}
        >
          {bundleActive && (
            <div className="absolute top-5 right-5 w-7 h-7 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-md animate-in zoom-in-50 duration-300">
              <svg width="16" height="16" fill="none" stroke="#FFB800" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/10 dark:bg-white/10 backdrop-blur rounded-full mb-3">
            <span className="text-[13px] font-semibold text-amber-900 dark:text-amber-100">⭐ MOST POPULAR</span>
          </div>

          <h3 className="text-[22px] font-bold leading-tight mb-1">Essential Deep Clean Bundle</h3>
          <p className="text-[15px] text-muted-foreground mb-4">Everything you need for a thorough kitchen refresh</p>

          <div className="flex gap-2 mb-4 flex-wrap">
            <div className="px-3 py-2 bg-white/40 dark:bg-black/20 backdrop-blur rounded-lg text-[14px] font-medium flex items-center gap-1.5">
              <span>🧊</span> Refrigerator
            </div>
            <div className="px-3 py-2 bg-white/40 dark:bg-black/20 backdrop-blur rounded-lg text-[14px] font-medium flex items-center gap-1.5">
              <span>🔥</span> Oven
            </div>
            <div className="px-3 py-2 bg-white/40 dark:bg-black/20 backdrop-blur rounded-lg text-[14px] font-medium flex items-center gap-1.5">
              <span>🗄️</span> Cabinets
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-[17px] text-muted-foreground/50 line-through">$160</span>
              <span className="text-[28px] font-bold tabular-nums">$130</span>
            </div>
            <div className="px-2.5 py-1.5 bg-emerald-500/15 rounded-md">
              <span className="text-[13px] font-semibold text-emerald-700 dark:text-emerald-400">Save $30</span>
            </div>
          </div>
        </div>

        {sections.map((section) => {
          const isExpanded = expandedSections.has(section.id)
          const sectionAddons = section.addons
            .map((id) => ADDONS[id as keyof typeof ADDONS])
            .filter((a) => a !== undefined)

          return (
            <div key={section.id} className="space-y-3">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full h-14 bg-card border-2 border-border rounded-xl px-4 flex items-center justify-between hover:bg-accent/5 active:scale-[0.99] transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{section.icon}</span>
                  <div className="text-left">
                    <span className="text-[18px] font-semibold tracking-tight">{section.title}</span>
                    <span className="text-[15px] text-muted-foreground ml-1">({sectionAddons.length})</span>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Section Content */}
              {isExpanded && (
                <div className="space-y-3">
                  {sectionAddons.map((addon) => {
                    const selected = selectedAddOns.some((a) => a.id === addon.id)
                    const quantity = selectedAddOns.find((a) => a.id === addon.id)?.quantity || 1
                    const isIncluded = addon.id === "baseboards" && isDeepClean

                    let displayPrice = addon.price || 0
                    if (addon.id === "baseboards") {
                      const bedrooms = propertyData.bedrooms || 0
                      if (bedrooms <= 2) displayPrice = 20
                      else if (bedrooms === 3) displayPrice = 30
                      else displayPrice = 40
                    } else if (addon.pricePerUnit) {
                      displayPrice = addon.pricePerUnit
                    }

                    const descriptions: Record<string, string> = {
                      fridge: "Deep clean all shelves, drawers & door compartments",
                      oven: "Remove grease & baked-on residue from oven interior",
                      cabinets: "$80 per room • Includes 10-12 cabinets",
                      windows: "$15 per 4 panels • Streak-free shine",
                      blinds: "$25 per room • All blinds & curtains",
                      baseboards: "$20 for homes up to 2BR",
                      walls: "$30 per room • Localized cleaning only",
                      stairs: "$35 per staircase • Stairs, railings & landings",
                      laundry: "$25 per load • Wash, dry & fold",
                      dishes: "$30 per sinkful • Wash & put away",
                      ironing: "$20 per session • Up to 20 items",
                      vacuum: "One-time upgrade • HEPA filtration",
                      steamer: "One-time upgrade • Deep sanitization",
                    }

                    return (
                      <div
                        key={addon.id}
                        onClick={() => !isIncluded && toggleAddon(addon.id)}
                        className={`relative rounded-xl p-5 min-h-[100px] transition-all duration-200 ${
                          isIncluded
                            ? "bg-card border-2 border-border cursor-default"
                            : selected
                              ? "bg-primary/10 border-2 border-primary cursor-pointer active:scale-[0.98]"
                              : "bg-card border border-border hover:shadow-md cursor-pointer active:scale-[0.98]"
                        }`}
                      >
                        {selected && !isIncluded && (
                          <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-in zoom-in-50 duration-200 z-10">
                            <svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}

                        <div className="flex justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-2xl">
                                {addon.id === "fridge"
                                  ? "🧊"
                                  : addon.id === "oven"
                                    ? "🔥"
                                    : addon.id === "cabinets"
                                      ? "🗄️"
                                      : addon.id === "windows"
                                        ? "🪟"
                                        : addon.id === "blinds"
                                          ? "🎚️"
                                          : addon.id === "baseboards"
                                            ? "📏"
                                            : addon.id === "walls"
                                              ? "🧱"
                                              : addon.id === "stairs"
                                                ? "🪜"
                                                : addon.id === "laundry"
                                                  ? "👕"
                                                  : addon.id === "dishes"
                                                    ? "🍽️"
                                                    : addon.id === "ironing"
                                                      ? "👔"
                                                      : addon.id === "vacuum"
                                                        ? "🌪️"
                                                        : addon.id === "steamer"
                                                          ? "💨"
                                                          : "✨"}
                              </span>
                              <h4 className="text-[17px] font-semibold">{addon.name}</h4>
                            </div>
                            <p className="text-[15px] text-muted-foreground leading-snug">
                              {descriptions[addon.id] || addon.name}
                            </p>

                            {/* Included Badge for Deep Clean Baseboards */}
                            {isIncluded && (
                              <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 bg-gradient-to-r from-amber-400/20 to-amber-500/20 border border-amber-400/30 rounded-lg">
                                <span className="text-[12px] font-semibold text-amber-900 dark:text-amber-100">
                                  ✨ Included with Deep Clean
                                </span>
                              </div>
                            )}

                            {selected && addon.hasQuantity && !isIncluded && (
                              <div className="mt-4 pt-4 border-t border-border">
                                <label className="text-[13px] font-semibold block mb-3">
                                  {addon.id === "cabinets"
                                    ? "Number of rooms"
                                    : addon.id === "windows"
                                      ? "Number of window sets (4 panels each)"
                                      : addon.id === "laundry"
                                        ? "Number of loads"
                                        : "Quantity"}
                                </label>
                                <div className="flex items-center gap-4 bg-muted/70 rounded-xl p-1.5 w-fit">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      updateQuantity(addon.id, quantity - 1)
                                    }}
                                    disabled={quantity <= 1}
                                    className="w-9 h-9 rounded-lg bg-card shadow-sm border border-border hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center font-bold text-xl text-primary active:scale-90 transition-all"
                                  >
                                    −
                                  </button>
                                  <span className="min-w-10 text-center text-[17px] font-semibold tabular-nums">
                                    {quantity}
                                  </span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      updateQuantity(addon.id, quantity + 1)
                                    }}
                                    disabled={quantity >= (addon.maxQty || 1)}
                                    className="w-9 h-9 rounded-lg bg-card shadow-sm border border-border hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center font-bold text-xl text-primary active:scale-90 transition-all"
                                  >
                                    +
                                  </button>
                                </div>
                                {addon.id === "cabinets" && (
                                  <p className="text-[12px] text-muted-foreground mt-2">10-12 cabinets per room</p>
                                )}
                                <div className="text-[14px] font-semibold mt-3">
                                  Total: <span className="text-primary tabular-nums">${displayPrice * quantity}</span>
                                </div>
                              </div>
                            )}

                            {selected && addon.id === "laundry" && addon.hasOptions && (
                              <div className="mt-4 pt-4 border-t border-border space-y-3">
                                <p className="text-[13px] font-semibold">Washer/dryer location</p>
                                <div className="space-y-2">
                                  <div
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setLaundryLocation("in-unit")
                                    }}
                                    className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                      laundryLocation === "in-unit"
                                        ? "border-primary bg-primary/5"
                                        : "border-border hover:bg-muted/30"
                                    }`}
                                  >
                                    <div
                                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                        laundryLocation === "in-unit" ? "border-primary" : "border-muted-foreground/30"
                                      }`}
                                    >
                                      {laundryLocation === "in-unit" && (
                                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                                      )}
                                    </div>
                                    <div>
                                      <div className="text-[15px] font-medium">🏠 In-unit washer/dryer</div>
                                    </div>
                                  </div>
                                  <div
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setLaundryLocation("building")
                                    }}
                                    className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                      laundryLocation === "building"
                                        ? "border-primary bg-primary/5"
                                        : "border-border hover:bg-muted/30"
                                    }`}
                                  >
                                    <div
                                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                        laundryLocation === "building" ? "border-primary" : "border-muted-foreground/30"
                                      }`}
                                    >
                                      {laundryLocation === "building" && (
                                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                                      )}
                                    </div>
                                    <div>
                                      <div className="text-[15px] font-medium">🏢 Building laundry room</div>
                                      <div className="text-[13px] text-muted-foreground">
                                        Additional coordination required
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="text-right pt-1 pr-10">
                            <div className="text-[19px] font-bold text-primary tabular-nums">${displayPrice}</div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {showBundleSuggestion && (
        <div className="fixed top-[100px] left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-sm animate-in slide-in-from-top-4 fade-in duration-400">
          <div className="bg-card border-2 border-primary rounded-2xl p-5 shadow-2xl">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-[32px]">✨</span>
              <div>
                <h4 className="text-[18px] font-semibold mb-1">Great choice!</h4>
                <p className="text-[15px] text-muted-foreground leading-snug">
                  Add one more item to qualify for our Essential Deep Clean Bundle and save $30 instantly!
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={applyBundle}
                className="flex-1 h-11 bg-primary text-primary-foreground rounded-xl font-semibold text-[15px] active:scale-95 transition-transform"
              >
                View Bundle
              </button>
              <button
                onClick={rejectBundle}
                className="h-11 px-4 bg-muted rounded-xl font-semibold text-[15px] active:scale-95 transition-transform"
              >
                Keep Individual
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedAddOns.length > 0 && (
        <>
          {summaryExpanded && (
            <div
              onClick={() => setSummaryExpanded(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in duration-200"
            />
          )}

          <div className="fixed bottom-0 left-0 right-0 z-50">
            {!summaryExpanded ? (
              <button
                onClick={() => setSummaryExpanded(true)}
                className="mx-4 mb-4 bg-card border-2 border-border rounded-[28px] px-5 py-3 flex items-center justify-between shadow-2xl w-[calc(100%-2rem)] active:scale-[0.96] transition-transform"
              >
                <span className="text-[15px] font-semibold">
                  {totals.count} add-on{totals.count !== 1 ? "s" : ""}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[19px] font-bold text-primary tabular-nums">+${totals.total}</span>
                  <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
                  </svg>
                </div>
              </button>
            ) : (
              <div className="bg-card rounded-t-3xl border-t-2 border-border shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
                <div className="p-5 max-h-[75vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-[20px] font-bold">Your Selections</h3>
                    <button
                      onClick={() => setSummaryExpanded(false)}
                      className="w-8 h-8 rounded-full bg-muted flex items-center justify-center active:scale-90 transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  <div className="max-h-[180px] overflow-y-auto mb-4 space-y-2.5">
                    {selectedAddOns.map((addon) => {
                      const addonData = ADDONS[addon.id as keyof typeof ADDONS]
                      if (!addonData) return null
                      const qty = addon.quantity || 1

                      let price = 0
                      if (addon.id === "baseboards") {
                        const bedrooms = propertyData.bedrooms || 0
                        if (bedrooms <= 2) price = 20
                        else if (bedrooms === 3) price = 30
                        else price = 40
                        if (isDeepClean) price = 0
                      } else {
                        price = addonData.pricePerUnit ? addonData.pricePerUnit * qty : addonData.price || 0
                      }

                      const isIncluded = addon.id === "baseboards" && isDeepClean

                      return (
                        <div key={addon.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                          <span className="text-[15px] font-medium flex-1">
                            {addonData.name}
                            {qty > 1 ? ` × ${qty}` : ""}
                          </span>
                          <div className="flex items-center gap-2.5">
                            <span className="text-[15px] font-bold tabular-nums">${price}</span>
                            {!isIncluded && (
                              <button
                                onClick={() => removeAddon(addon.id)}
                                className="w-6 h-6 rounded-full bg-destructive/10 hover:bg-destructive/20 flex items-center justify-center text-destructive text-xl font-bold active:scale-90 transition-all"
                              >
                                ×
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="pt-4 border-t-2 border-border space-y-2.5 mb-5">
                    <div className="flex justify-between text-[15px]">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold tabular-nums">${totals.subtotal}</span>
                    </div>

                    {totals.savings > 0 && (
                      <div className="flex justify-between text-[15px] text-emerald-600 dark:text-emerald-400">
                        <span className="flex items-center gap-1.5">
                          <span>✨</span>
                          <span className="font-medium">Bundle discount</span>
                        </span>
                        <span className="font-bold tabular-nums">-${totals.savings}</span>
                      </div>
                    )}

                    <div className="flex justify-between pt-2.5 border-t-2 border-border">
                      <span className="text-[20px] font-bold">Total add-ons</span>
                      <span className="text-[20px] font-bold text-primary tabular-nums">${totals.total}</span>
                    </div>
                  </div>

                  <button className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-semibold text-[17px] active:scale-[0.98] transition-transform shadow-lg">
                    Continue →
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}
