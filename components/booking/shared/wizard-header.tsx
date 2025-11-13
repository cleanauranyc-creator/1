"use client"

import { ArrowLeft, X } from "@/components/booking/icons"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface WizardHeaderProps {
  currentStep: number
  totalSteps: number
  onBack?: () => void
}

export function WizardHeader({ currentStep, totalSteps, onBack }: WizardHeaderProps) {
  const router = useRouter()
  const progressPercentage = (currentStep / totalSteps) * 100
  const isFirstStep = currentStep === 1

  return (
    <div className={isFirstStep ? "mb-8 space-y-6" : "mb-4"}>
      <div className="flex items-center justify-between">
        {onBack ? (
          <Button variant="ghost" size="icon" onClick={onBack} className="h-10 w-10 rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        ) : (
          <div />
        )}

        <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="h-10 w-10 rounded-full">
          <X className="h-5 w-5" />
        </Button>
      </div>

      {isFirstStep ? (
        <>
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">Get Your Free Estimate</h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto text-balance">
              Tell us about your space and we'll provide a personalized quote
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-3 text-sm">
              <span className="text-muted-foreground font-medium">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="font-semibold text-primary">{Math.round(progressPercentage)}% Complete</span>
            </div>
            <div className="h-2.5 bg-muted rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="max-w-2xl mx-auto mt-4">
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="text-muted-foreground font-medium">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="font-semibold text-primary text-sm">{Math.round(progressPercentage)}% Complete</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
