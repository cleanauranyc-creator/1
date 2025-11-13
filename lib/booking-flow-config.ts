// ============================================
// BOOKING FLOW CONFIGURATION
// ============================================
// Defines step sequences for each service type

import type { FlowConfig, ServiceId } from "./booking-types"

export const FLOW_CONFIGS: Record<ServiceId, FlowConfig> = {
  // ============================================
  // FLAT RATE SERVICES (5 steps with Add-ons)
  // ============================================
  standard: {
    serviceId: "standard",
    serviceName: "Standard Cleaning",
    serviceType: "flat",
    hasAddOns: true,
    totalSteps: 5,
    steps: [
      { stepNumber: 1, stepName: "Service", component: "ServiceSelection" },
      { stepNumber: 2, stepName: "Property", component: "PropertyDetails" },
      { stepNumber: 3, stepName: "Add-ons", component: "AddOnsCustomization" },
      { stepNumber: 4, stepName: "Schedule", component: "DateTimeSelection" },
      { stepNumber: 5, stepName: "Contact", component: "ContactInfo" },
    ],
  },
  deep: {
    serviceId: "deep",
    serviceName: "Deep Cleaning",
    serviceType: "flat",
    hasAddOns: true,
    totalSteps: 5,
    steps: [
      { stepNumber: 1, stepName: "Service", component: "ServiceSelection" },
      { stepNumber: 2, stepName: "Property", component: "PropertyDetails" },
      { stepNumber: 3, stepName: "Add-ons", component: "AddOnsCustomization" },
      { stepNumber: 4, stepName: "Schedule", component: "DateTimeSelection" },
      { stepNumber: 5, stepName: "Contact", component: "ContactInfo" },
    ],
  },
  move: {
    serviceId: "move",
    serviceName: "Move In/Out",
    serviceType: "flat",
    hasAddOns: true,
    totalSteps: 5,
    steps: [
      { stepNumber: 1, stepName: "Service", component: "ServiceSelection" },
      { stepNumber: 2, stepName: "Property", component: "PropertyDetails" },
      { stepNumber: 3, stepName: "Add-ons", component: "AddOnsCustomization" },
      { stepNumber: 4, stepName: "Schedule", component: "DateTimeSelection" },
      { stepNumber: 5, stepName: "Contact", component: "ContactInfo" },
    ],
  },

  // ============================================
  // CONSULTATION SERVICES (4 steps - NO Add-ons)
  // ============================================
  construction: {
    serviceId: "construction",
    serviceName: "Post-Construction",
    serviceType: "consultation",
    hasAddOns: false,
    totalSteps: 4,
    steps: [
      { stepNumber: 1, stepName: "Service", component: "ServiceSelection" },
      { stepNumber: 2, stepName: "Details", component: "PropertyDetails" },
      { stepNumber: 3, stepName: "Schedule", component: "DateTimeSelection" },
      { stepNumber: 4, stepName: "Contact", component: "ContactInfo" },
    ],
  },
  heavy: {
    serviceId: "heavy",
    serviceName: "Heavy-Duty / Hoarding",
    serviceType: "consultation",
    hasAddOns: false,
    totalSteps: 4,
    steps: [
      { stepNumber: 1, stepName: "Service", component: "ServiceSelection" },
      { stepNumber: 2, stepName: "Details", component: "PropertyDetails" },
      { stepNumber: 3, stepName: "Schedule", component: "DateTimeSelection" },
      { stepNumber: 4, stepName: "Contact", component: "ContactInfo" },
    ],
  },
  airbnb: {
    serviceId: "airbnb",
    serviceName: "Airbnb Turnover",
    serviceType: "consultation",
    hasAddOns: false,
    totalSteps: 4,
    steps: [
      { stepNumber: 1, stepName: "Service", component: "ServiceSelection" },
      { stepNumber: 2, stepName: "Details", component: "PropertyDetails" },
      { stepNumber: 3, stepName: "Schedule", component: "DateTimeSelection" },
      { stepNumber: 4, stepName: "Contact", component: "ContactInfo" },
    ],
  },
  commercial: {
    serviceId: "commercial",
    serviceName: "Office/Commercial",
    serviceType: "consultation",
    hasAddOns: false,
    totalSteps: 4,
    steps: [
      { stepNumber: 1, stepName: "Service", component: "ServiceSelection" },
      { stepNumber: 2, stepName: "Details", component: "PropertyDetails" },
      { stepNumber: 3, stepName: "Schedule", component: "DateTimeSelection" },
      { stepNumber: 4, stepName: "Contact", component: "ContactInfo" },
    ],
  },

  // ============================================
  // HOURLY SERVICES (4 steps - NO Add-ons)
  // ============================================
  custom: {
    serviceId: "custom",
    serviceName: "Custom Cleaning",
    serviceType: "hourly",
    hasAddOns: false,
    totalSteps: 4,
    steps: [
      { stepNumber: 1, stepName: "Service", component: "ServiceSelection" },
      { stepNumber: 2, stepName: "Details", component: "PropertyDetails" },
      { stepNumber: 3, stepName: "Schedule", component: "DateTimeSelection" },
      { stepNumber: 4, stepName: "Contact", component: "ContactInfo" },
    ],
  },
  organizing: {
    serviceId: "organizing",
    serviceName: "Professional Organizing",
    serviceType: "hourly",
    hasAddOns: false,
    totalSteps: 4,
    steps: [
      { stepNumber: 1, stepName: "Service", component: "ServiceSelection" },
      { stepNumber: 2, stepName: "Details", component: "PropertyDetails" },
      { stepNumber: 3, stepName: "Schedule", component: "DateTimeSelection" },
      { stepNumber: 4, stepName: "Contact", component: "ContactInfo" },
    ],
  },
}

// Helper: Get flow config by service ID
export function getFlowConfig(serviceId: ServiceId | null): FlowConfig | null {
  if (!serviceId) return null
  return FLOW_CONFIGS[serviceId] || null
}

// Helper: Get total steps for service
export function getTotalSteps(serviceId: ServiceId | null): number {
  const config = getFlowConfig(serviceId)
  return config?.totalSteps || 5
}

// Helper: Check if service has add-ons step
export function hasAddOnsStep(serviceId: ServiceId | null): boolean {
  const config = getFlowConfig(serviceId)
  return config?.hasAddOns || false
}

// Helper: Get next step number (handles skipping add-ons)
export function getNextStep(currentStep: number, serviceId: ServiceId | null): number {
  const config = getFlowConfig(serviceId)
  if (!config) return currentStep + 1

  // If currently on step 2 and service has no add-ons, skip to step 4
  if (currentStep === 2 && !config.hasAddOns) {
    return 4
  }

  return currentStep + 1
}

// Helper: Get previous step number (handles skipping add-ons)
export function getPreviousStep(currentStep: number, serviceId: ServiceId | null): number {
  const config = getFlowConfig(serviceId)
  if (!config) return currentStep - 1

  // If currently on step 4 and service has no add-ons, go back to step 2
  if (currentStep === 4 && !config.hasAddOns) {
    return 2
  }

  return currentStep - 1
}

// Helper: Get step name for display
export function getStepName(stepNumber: number, serviceId: ServiceId | null): string {
  const config = getFlowConfig(serviceId)
  if (!config) return ""

  const step = config.steps.find((s) => s.stepNumber === stepNumber)
  return step?.stepName || ""
}

export const FLOW_CONFIGURATION = FLOW_CONFIGS

// Service display info for Step 1
export const SERVICE_DISPLAY_INFO = {
  standard: {
    icon: "✨",
    description: "Regular maintenance cleaning",
    startingPrice: "From $130",
  },
  deep: {
    icon: "🧽",
    description: "Thorough deep cleaning",
    startingPrice: "From $235",
  },
  move: {
    icon: "📦",
    description: "Move in/out cleaning",
    startingPrice: "From $285",
  },
  construction: {
    icon: "🏗️",
    description: "Post-renovation cleanup",
    startingPrice: "Custom Quote",
  },
  heavy: {
    icon: "💪",
    description: "Heavy-duty cleaning",
    startingPrice: "Custom Quote",
  },
  airbnb: {
    icon: "🏠",
    description: "Turnover cleaning",
    startingPrice: "Custom Quote",
  },
  custom: {
    icon: "⚙️",
    description: "Flexible cleaning service",
    startingPrice: "$50/hour",
  },
  organizing: {
    icon: "📋",
    description: "Professional organizing",
    startingPrice: "$65/hour",
  },
  commercial: {
    icon: "🏢",
    description: "Office & commercial spaces",
    startingPrice: "Custom Quote",
  },
}
