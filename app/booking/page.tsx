"use client"

import { useReducer, useEffect, useMemo, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { WizardHeader } from "@/components/booking/shared/wizard-header"
import { WizardFooter } from "@/components/booking/shared/wizard-footer"
import { ServiceSelection } from "@/components/booking/steps/service-selection"
import { PropertyDetails } from "@/components/booking/steps/property-details"
import { AddOnsCustomization } from "@/components/booking/steps/addons-customization"
import { DateTimeSelection } from "@/components/booking/steps/datetime-selection"
import { ContactInfo } from "@/components/booking/steps/contact-info"
import { PriceBreakdown } from "@/components/booking/shared/price-breakdown"
import { FLOW_CONFIGURATION } from "@/lib/booking-flow-config"
import { calculateEstimate, formatEstimate } from "@/lib/booking-utils"
import type { BookingState, BookingAction, ServiceId } from "@/lib/booking-types"

const initialState: BookingState = {
  currentStep: 1,
  totalSteps: 5,
  serviceId: null,
  propertyData: {
    propertyType: null,
    bedrooms: null,
    bathrooms: null,
    squareFeet: null,
    hours: null,
    organizingType: null,
    teamSize: null,
    sqft: null,
    spaceType: null,
    urgency: null,
    constructionType: null,
    severityLevel: null,
  },
  addOns: [],
  dateTime: {
    date: null,
    time: null,
    flexible: false,
    frequency: "one-time",
  },
  contactInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    specialInstructions: "",
  },
  estimatedPrice: 0,
  estimatedTime: 0,
}

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case "SET_SERVICE":
      const config = FLOW_CONFIGURATION[action.payload as ServiceId]
      return {
        ...state,
        serviceId: action.payload,
        totalSteps: config.steps.length,
        currentStep: 1,
        // Reset dependent fields when service changes
        propertyData: initialState.propertyData,
        addOns: [],
      }

    case "SET_PROPERTY_DATA":
      return {
        ...state,
        propertyData: { ...state.propertyData, ...action.payload },
      }

    case "SET_ADD_ONS":
      return {
        ...state,
        addOns: action.payload,
      }

    case "SET_DATE_TIME":
      return {
        ...state,
        dateTime: { ...state.dateTime, ...action.payload },
      }

    case "SET_CONTACT_INFO":
      return {
        ...state,
        contactInfo: { ...state.contactInfo, ...action.payload },
      }

    case "NEXT_STEP":
      if (!state.serviceId) return state
      const flowConfig = FLOW_CONFIGURATION[state.serviceId as ServiceId]
      let nextStep = state.currentStep + 1

      if (nextStep === 3 && !flowConfig.hasAddOns) {
        nextStep = 4
      }

      return {
        ...state,
        currentStep: Math.min(nextStep, state.totalSteps),
      }

    case "PREV_STEP":
      if (!state.serviceId) return state
      const prevFlowConfig = FLOW_CONFIGURATION[state.serviceId as ServiceId]
      let prevStep = state.currentStep - 1

      if (prevStep === 3 && !prevFlowConfig.hasAddOns) {
        prevStep = 2
      }

      return {
        ...state,
        currentStep: Math.max(prevStep, 1),
      }

    case "UPDATE_ESTIMATE":
      return {
        ...state,
        estimatedPrice: action.payload.price,
        estimatedTime: action.payload.time,
      }

    default:
      return state
  }
}

export default function BookingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [state, dispatch] = useReducer(bookingReducer, initialState)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [state.currentStep])

  useEffect(() => {
    const serviceParam = searchParams.get("service")
    if (serviceParam && !state.serviceId) {
      dispatch({ type: "SET_SERVICE", payload: serviceParam })
    }
  }, [searchParams, state.serviceId])

  const calculateAndUpdateEstimate = useCallback(() => {
    if (state.serviceId && state.propertyData.propertyType) {
      const estimate = calculateEstimate(state)
      dispatch({
        type: "UPDATE_ESTIMATE",
        payload: {
          price: estimate.total,
          time: estimate.totalTime,
        },
      })
    }
  }, [state])

  useEffect(() => {
    calculateAndUpdateEstimate()
  }, [calculateAndUpdateEstimate])

  const currentFlowConfig = useMemo(() => {
    return state.serviceId ? FLOW_CONFIGURATION[state.serviceId as ServiceId] : null
  }, [state.serviceId])

  const canContinue = useMemo(() => {
    console.log("[v0] Checking canContinue", {
      currentStep: state.currentStep,
      serviceId: state.serviceId,
      propertyData: state.propertyData,
    })

    switch (state.currentStep) {
      case 1:
        return !!state.serviceId
      case 2:
        if (!state.serviceId) return false
        const service = currentFlowConfig
        if (!service) return false

        // Check based on service type
        if (service.serviceType === "flat") {
          // Flat rate services need bedrooms and bathrooms
          return state.propertyData.bedrooms !== null && state.propertyData.bathrooms !== null
        } else if (service.serviceType === "hourly") {
          // Hourly services need hours and team size
          return state.propertyData.hours !== null && state.propertyData.hours >= 2
        } else if (service.serviceType === "consultation") {
          // Consultation services - different requirements for each
          if (state.serviceId === "organizing") {
            return (
              state.propertyData.organizingType !== null &&
              state.propertyData.hours !== null &&
              state.propertyData.hours >= 3 &&
              state.propertyData.teamSize !== null &&
              state.propertyData.teamSize >= 1
            )
          }
          if (state.serviceId === "commercial") {
            return state.propertyData.sqft !== null && state.propertyData.spaceType !== null
          }
          if (state.serviceId === "airbnb") {
            return state.propertyData.urgency !== null
          }
          if (state.serviceId === "construction") {
            return state.propertyData.constructionType !== null
          }
          if (state.serviceId === "heavy") {
            return state.propertyData.bedrooms !== null && state.propertyData.severityLevel !== null
          }
          // Default consultation validation
          return true
        }
        return false

      case 3:
        // Add-ons are optional, always can continue
        return true

      case 4:
        return !!state.dateTime.date && !!state.dateTime.time

      case 5:
        return (
          !!state.contactInfo.firstName &&
          !!state.contactInfo.email &&
          !!state.contactInfo.phone &&
          !!state.contactInfo.address
        )

      default:
        return false
    }
  }, [state, currentFlowConfig])

  const handleNext = () => {
    dispatch({ type: "NEXT_STEP" })
  }

  const handleBack = () => {
    dispatch({ type: "PREV_STEP" })
  }

  const handleSubmit = async () => {
    console.log("[v0] Submitting booking:", state)
    // Will implement Supabase submit in Phase 5
    router.push("/booking/confirmation")
  }

  const getDisplayStep = () => {
    if (!currentFlowConfig) return 1
    let displayStep = state.currentStep
    if (state.currentStep > 3 && !currentFlowConfig.hasAddOns) {
      displayStep = state.currentStep - 1
    }
    return displayStep
  }

  const displayStep = getDisplayStep()
  const displayTotalSteps = currentFlowConfig?.hasAddOns ? 5 : 4

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <WizardHeader
          currentStep={displayStep}
          totalSteps={displayTotalSteps}
          onBack={state.currentStep > 1 ? handleBack : undefined}
        />

        <div className="mt-8">
          {state.currentStep === 1 ? (
            // Step 1: Full width centered layout without sidebar
            <div className="max-w-5xl mx-auto">
              <ServiceSelection
                selectedService={state.serviceId}
                onSelect={(serviceId) => dispatch({ type: "SET_SERVICE", payload: serviceId })}
              />
            </div>
          ) : (
            // Steps 2+: 2-column layout with centered content and sidebar
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main content - centered in available space */}
                <div className="lg:col-span-7">
                  <div key={state.currentStep}>
                    {state.currentStep === 2 && state.serviceId && (
                      <PropertyDetails
                        serviceId={state.serviceId as ServiceId}
                        propertyData={state.propertyData}
                        onChange={(data) => dispatch({ type: "SET_PROPERTY_DATA", payload: data })}
                      />
                    )}

                    {state.currentStep === 3 && currentFlowConfig?.hasAddOns && state.serviceId && (
                      <AddOnsCustomization
                        serviceId={state.serviceId as ServiceId}
                        selectedAddOns={state.addOns}
                        propertyData={state.propertyData}
                        onChange={(addOns) => dispatch({ type: "SET_ADD_ONS", payload: addOns })}
                      />
                    )}

                    {((state.currentStep === 4 && currentFlowConfig?.hasAddOns) ||
                      (state.currentStep === 3 && !currentFlowConfig?.hasAddOns)) && (
                      <DateTimeSelection
                        dateTime={state.dateTime}
                        onChange={(data) => dispatch({ type: "SET_DATE_TIME", payload: data })}
                      />
                    )}

                    {((state.currentStep === 5 && currentFlowConfig?.hasAddOns) ||
                      (state.currentStep === 4 && !currentFlowConfig?.hasAddOns)) && (
                      <ContactInfo
                        contactInfo={state.contactInfo}
                        estimate={formatEstimate(calculateEstimate(state))}
                        onChange={(data) => dispatch({ type: "SET_CONTACT_INFO", payload: data })}
                      />
                    )}
                  </div>
                </div>

                {/* Summary sidebar */}
                <div className="lg:col-span-5 hidden lg:block">
                  <div className="sticky top-24">
                    <PriceBreakdown state={state} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <WizardFooter
          currentStep={state.currentStep}
          totalSteps={state.totalSteps}
          estimatedPrice={state.estimatedPrice}
          canContinue={canContinue}
          isLastStep={displayStep === displayTotalSteps}
          onNext={handleNext}
          onSubmit={handleSubmit}
          hasAddOns={currentFlowConfig?.hasAddOns || false}
        />
      </div>
    </div>
  )
}
