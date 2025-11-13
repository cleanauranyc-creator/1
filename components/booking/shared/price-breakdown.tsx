"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Clock, ChevronDown } from "@/components/booking/icons"
import type { BookingState } from "@/lib/booking-types"
import { calculateEstimate, formatEstimate } from "@/lib/booking-utils"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface PriceBreakdownProps {
  state: BookingState
}

export function PriceBreakdown({ state }: PriceBreakdownProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [hasAnimated, setHasAnimated] = useState(false)

  if (!state.serviceId || !state.propertyData.propertyType) {
    return null
  }

  const estimate = calculateEstimate(state)
  const formatted = formatEstimate(estimate)

  // Trigger animation on first mount or total change
  useEffect(() => {
    if (estimate.total > 0) {
      setHasAnimated(false)
      const timer = setTimeout(() => setHasAnimated(true), 100)
      return () => clearTimeout(timer)
    }
  }, [estimate.total])

  const hasBreakdown = formatted.breakdown.length > 1
  const isCustomQuote = estimate.total === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Card
        className={cn(
          "border-2 shadow-xl backdrop-blur-xl",
          "bg-gradient-to-br from-white/95 via-white/90 to-primary/5",
          "dark:from-slate-900/95 dark:via-slate-900/90 dark:to-primary/10",
          "transition-all duration-500"
        )}
        style={{
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        }}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">Your Estimate</CardTitle>
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20 px-3 py-1"
            >
              <Sparkles className="h-3 w-3 mr-1.5" />
              Live
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* MAIN PRICE DISPLAY */}
          <div className="text-center py-6 px-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5">
            <motion.div
              key={estimate.total}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            >
              {isCustomQuote ? (
                <div className="space-y-2">
                  <div className="text-4xl font-black text-foreground">Custom Quote</div>
                  <p className="text-sm text-muted-foreground">
                    We'll provide a personalized quote after reviewing your details
                  </p>
                </div>
              ) : (
                <>
                  {/* Animated Number Counter */}
                  <div className="text-5xl md:text-6xl font-black text-primary mb-3">
                    <AnimatedPrice targetValue={estimate.total} hasAnimated={hasAnimated} />
                  </div>

                  {/* Time Estimate */}
                  <div className="flex items-center justify-center gap-2 text-base text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="font-semibold">{formatted.displayTime} estimated</span>
                  </div>
                </>
              )}
            </motion.div>
          </div>

          {/* BREAKDOWN DETAILS */}
          {hasBreakdown && !isCustomQuote && (
            <div className="space-y-3">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(
                  "w-full flex items-center justify-between",
                  "text-sm font-semibold text-foreground/80",
                  "hover:text-foreground transition-colors",
                  "group"
                )}
              >
                <span>Price Breakdown</span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-4 w-4 group-hover:text-primary transition-colors" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2 pt-2 border-t">
                      {formatted.breakdown.map((item, index) => (
                        <motion.div
                          key={`${item.label}-${index}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          className={cn(
                            "flex justify-between items-center text-sm py-2 px-3 rounded-lg",
                            "hover:bg-muted/50 transition-colors",
                            item.amount < 0 && "text-green-600 dark:text-green-400 font-semibold"
                          )}
                        >
                          <div className="flex-1">
                            <span className="text-muted-foreground">{item.label}</span>
                            {item.time && (
                              <span className="text-xs text-muted-foreground/60 ml-2">
                                ({Math.round(item.time)}min)
                              </span>
                            )}
                          </div>
                          <span className="font-semibold ml-4">
                            {item.amount < 0 ? "-" : ""}${Math.abs(item.amount)}
                          </span>
                        </motion.div>
                      ))}

                      {/* Total Line */}
                      <div className="pt-3 mt-3 border-t-2 border-primary/20">
                        <div className="flex justify-between items-center text-base font-bold">
                          <span>Total</span>
                          <span className="text-2xl text-primary">${estimate.total}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* INFO FOOTER */}
          <div className="pt-4 border-t space-y-2">
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Sparkles className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary/60" />
              <p>
                Final price may vary based on actual time spent. You pay for the time we work, with transparent
                hourly tracking.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ============================================
// ANIMATED PRICE COUNTER
// ============================================

function AnimatedPrice({ targetValue, hasAnimated }: { targetValue: number; hasAnimated: boolean }) {
  const [displayValue, setDisplayValue] = useState(hasAnimated ? targetValue : 0)

  useEffect(() => {
    if (!hasAnimated) return

    const duration = 800 // ms
    const steps = 30
    const stepValue = targetValue / steps
    const stepDuration = duration / steps

    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      if (currentStep >= steps) {
        setDisplayValue(targetValue)
        clearInterval(interval)
      } else {
        setDisplayValue(Math.round(currentStep * stepValue))
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [targetValue, hasAnimated])

  return <>${displayValue.toLocaleString()}</>
}
