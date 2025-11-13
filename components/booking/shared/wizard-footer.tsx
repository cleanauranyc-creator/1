"use client"

import { ArrowRight, Check, Loader2 } from "@/components/booking/icons"
import { useState } from "react"

interface WizardFooterProps {
  currentStep: number
  totalSteps: number
  estimatedPrice: number
  canContinue: boolean
  isLastStep: boolean
  onNext: () => void
  onSubmit: () => Promise<void>
  hasAddOns: boolean
}

export function WizardFooter({
  currentStep,
  totalSteps,
  estimatedPrice,
  canContinue,
  isLastStep,
  onNext,
  onSubmit,
  hasAddOns,
}: WizardFooterProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await onSubmit()
    } catch (error) {
      console.error("[v0] Submit error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClick = isLastStep ? handleSubmit : onNext

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-4 pointer-events-none"
      style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}
    >
      <button
        onClick={handleClick}
        disabled={!canContinue || isSubmitting}
        className="
          pointer-events-auto
          relative
          flex items-center justify-center gap-2
          px-8 py-3.5
          min-w-[180px]
          transition-all duration-300 ease-out
          hover:scale-[1.05]
          active:scale-[0.96]
          disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100
        "
        style={{
          background: "linear-gradient(135deg, rgba(6, 182, 212, 0.25) 0%, rgba(8, 145, 178, 0.35) 100%)",
          backgroundBlendMode: "plus-lighter",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: `
            inset 0 1px 1px 0 rgba(255, 255, 255, 0.6),
            inset 0 -1px 1px 0 rgba(6, 182, 212, 0.4),
            inset 1px 0 1px 0 rgba(255, 255, 255, 0.3),
            inset -1px 0 1px 0 rgba(6, 182, 212, 0.3),
            0 8px 32px rgba(6, 182, 212, 0.35),
            0 4px 16px rgba(6, 182, 212, 0.25),
            0 0 0 1px rgba(6, 182, 212, 0.2)
          `,
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderRadius: "100px",
        }}
      >
        <span
          className="text-white font-semibold text-base relative z-10"
          style={{
            letterSpacing: "-0.3px",
            fontWeight: 600,
            textShadow: "0 1px 3px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(6, 182, 212, 0.4)",
          }}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Submitting...
            </span>
          ) : isLastStep ? (
            <span className="flex items-center gap-2">
              Get Free Estimate
              <Check className="h-5 w-5" />
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Continue
              <ArrowRight className="h-5 w-5" />
            </span>
          )}
        </span>
      </button>
    </div>
  )
}
