"use client"

import { ArrowLeft, X } from "@/components/booking/icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface WizardHeaderProps {
  currentStep: number
  totalSteps: number
  onBack?: () => void
}

// Premium Sparkles icon
function Sparkles({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  )
}

export function WizardHeader({ currentStep, totalSteps, onBack }: WizardHeaderProps) {
  const router = useRouter()
  const progressPercentage = (currentStep / totalSteps) * 100
  const isFirstStep = currentStep === 1

  return (
    <div className={isFirstStep ? "mb-8 space-y-6" : "mb-4"}>
      {/* Navigation buttons with premium styling */}
      <div className="flex items-center justify-between">
        {onBack ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="touch-target h-10 w-10 rounded-full hover:bg-primary/10 active:scale-press transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        ) : (
          <div />
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/")}
          className="touch-target h-10 w-10 rounded-full hover:bg-muted active:scale-press transition-all"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {isFirstStep ? (
        <>
          {/* Enhanced first step header */}
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Trust badge */}
            <Badge variant="secondary" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border-primary/20 text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span className="font-semibold">2-Minute Estimate</span>
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-balance leading-tight">
              Get Your <span className="text-gradient-primary">Free Estimate</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto text-balance">
              Tell us about your space and we'll provide a <strong className="text-foreground">personalized quote instantly</strong>
            </p>

            {/* Trust line */}
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              No payment required · Cancel anytime
            </p>
          </motion.div>

          {/* Premium progress bar */}
          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-3 text-sm">
              <span className="text-muted-foreground font-medium">
                Step {currentStep} of {totalSteps}
              </span>
              <motion.span
                key={progressPercentage}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="font-bold text-primary"
              >
                {Math.round(progressPercentage)}% Complete
              </motion.span>
            </div>
            <div className="h-2.5 bg-muted rounded-full overflow-hidden shadow-inner relative">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-cyan-500 to-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                  boxShadow: "0 0 10px rgba(6, 182, 212, 0.5)",
                }}
              />
            </div>
          </motion.div>
        </>
      ) : (
        <div className="max-w-2xl mx-auto mt-4">
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="text-muted-foreground font-medium">
              Step {currentStep} of {totalSteps}
            </span>
            <motion.span
              key={progressPercentage}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="font-bold text-primary text-sm"
            >
              {Math.round(progressPercentage)}%
            </motion.span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-cyan-500 rounded-full"
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                boxShadow: "0 0 8px rgba(6, 182, 212, 0.4)",
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
