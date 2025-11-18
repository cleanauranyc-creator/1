// ============================================
// BOOKING SYSTEM TYPES - CLEAN AURA NYC
// ============================================

// Service IDs mapping
export type ServiceId =
  | "standard"
  | "deep"
  | "move"
  | "construction"
  | "heavy"
  | "airbnb"
  | "custom"
  | "organizing"
  | "commercial"

// Service type categories
export type ServiceType = "flat" | "hourly" | "consultation"

// Property size configuration
export type PropertySize = {
  bedrooms: number
  bathrooms: number
  sizeId?: string // e.g., '2br_2ba'
}

// Add-on selection
export interface SelectedAddon {
  id: string
  name: string
  price: number
  quantity?: number
  time?: number
}

// Scheduling details
export interface SchedulingData {
  preferredDate: Date | null
  timeSlot: "morning" | "afternoon" | "evening" | null
  isFlexible: boolean
}

// Contact information
export interface ContactInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  streetAddress: string
  aptUnit?: string
  city: string
  state: string
  zipCode: string
  contactMethod: "call" | "text" | "email"
  parkingInfo?: string
  accessInstructions?: string
  hasPets: boolean
  petDetails?: string
  specialInstructions?: string
}

// Hourly service specific data
export interface HourlyServiceData {
  hours: number
  teamSize: number
}

// Consultation service specific data
export interface ConsultationServiceData {
  sqft?: number
  description?: string
  urgency?: string // Airbnb turnover urgency
  constructionType?: string // Post-construction scope
  severityLevel?: string // Heavy-duty/hoarding severity
  organizingType?: string // Professional organizing focus
  rooms?: number // Number of rooms to organize
  frequency?: string // Service frequency (one-time/recurring)
  // Service-specific fields stored as flexible object
  [key: string]: any
}

// Main booking form state
export interface BookingFormData {
  // Navigation
  currentStep: number
  totalSteps: number

  // Service selection (Step 1)
  serviceId: ServiceId | null
  serviceName: string | null
  serviceType: ServiceType | null

  // Property details (Step 2)
  propertySize: PropertySize | null
  hourlyData?: HourlyServiceData
  consultationData?: ConsultationServiceData

  // Add-ons (Step 3 - only for flat rate services)
  selectedAddons: SelectedAddon[]

  // Scheduling (Step 3 or 4 depending on flow)
  scheduling: SchedulingData

  // Contact info (Step 4 or 5)
  contactInfo: Partial<ContactInfo>

  // UTM tracking (auto-captured)
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
}

// Pricing breakdown for display
export interface PricingBreakdown {
  basePrice: number | "CUSTOM_QUOTE"
  baseLabel: string
  addOns: Array<{
    name: string
    price: number
    quantity?: number
  }>
  addOnsTotal: number
  subtotal: number | "CUSTOM_QUOTE"
  discounts?: Array<{
    label: string
    amount: number
  }>
  grandTotal: number | "CUSTOM_QUOTE"
  estimatedHours?: number
}

// Flow configuration for each service
export interface FlowConfig {
  serviceId: ServiceId
  serviceName: string
  serviceType: ServiceType
  hasAddOns: boolean
  totalSteps: number
  steps: Array<{
    stepNumber: number
    stepName: string
    component: string
  }>
}

// Supabase booking insert payload
export interface BookingInsertPayload {
  service_id: string
  service_name: string
  service_type: string
  bedrooms?: number
  bathrooms?: number
  sqft?: number
  property_size_id?: string
  base_price?: number
  addons_total?: number
  grand_total?: number
  estimated_hours?: number
  is_custom_quote: boolean
  hours_requested?: number
  team_size?: number
  consultation_details?: Record<string, any>
  selected_addons: SelectedAddon[]
  preferred_date: string
  preferred_time_slot: string
  is_flexible: boolean
  first_name: string
  last_name: string
  email: string
  phone: string
  street_address: string
  apt_unit?: string
  city: string
  state: string
  zip_code: string
  contact_method: string
  parking_info?: string
  access_instructions?: string
  has_pets: boolean
  pet_details?: string
  special_instructions?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  user_agent?: string
  referrer_url?: string
}

// Form validation errors
export interface ValidationErrors {
  [key: string]: string
}

// Step component props
export interface StepComponentProps {
  formData: BookingFormData
  updateFormData: (updates: Partial<BookingFormData>) => void
  onNext: () => void
  onBack: () => void
  errors?: ValidationErrors
}

// Property data for wizard
export interface PropertyData {
  propertyType: string | null
  bedrooms: number | null
  bathrooms: number | null
  squareFeet: number | null
  hours?: number // For hourly services
  teamSize?: number // For hourly services with team
  offices?: number // Number of private offices
  confRooms?: number // Conference rooms
  spaceType?: string // Office configuration type
}

// Add-on selection for wizard
export interface AddOnSelection {
  id: string
  quantity: number
  price?: number
}

// Date/time data for wizard
export interface DateTimeData {
  date: Date | null
  time: string | null
  flexible: boolean
  frequency: "one-time" | "weekly" | "bi-weekly" | "monthly"
}

// Contact info for wizard (simplified)
export interface ContactInfoData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  specialInstructions: string
}

// Main booking state for wizard
export interface BookingState {
  currentStep: number
  totalSteps: number
  serviceId: string | null
  propertyData: PropertyData
  addOns: AddOnSelection[]
  dateTime: DateTimeData
  contactInfo: ContactInfoData
  estimatedPrice: number
  estimatedTime: number
}

// Booking actions for reducer
export type BookingAction =
  | { type: "SET_SERVICE"; payload: string }
  | { type: "SET_PROPERTY_DATA"; payload: Partial<PropertyData> }
  | { type: "SET_ADD_ONS"; payload: AddOnSelection[] }
  | { type: "SET_DATE_TIME"; payload: Partial<DateTimeData> }
  | { type: "SET_CONTACT_INFO"; payload: Partial<ContactInfoData> }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "UPDATE_ESTIMATE"; payload: { price: number; time: number } }

// Estimate breakdown for display
export interface EstimateBreakdown {
  total: number
  totalTime: number
  breakdown: Array<{ label: string; amount: number; time?: number }>
  displayTotal: string
  displayTime: string
}
