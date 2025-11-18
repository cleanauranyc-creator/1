"use server"

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export interface BookingFormData {
  serviceType: string
  homeSize: string
  bedrooms: string
  bathrooms: string
  squareFeet?: string
  frequency: string
  date: string
  time: string
  addOns: string[]
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  specialInstructions: string
  estimatedPrice: number
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
  referrer?: string
}

export async function submitBooking(formData: BookingFormData) {
  try {
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address) {
      return {
        success: false,
        error: "Please fill in all required fields",
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      }
    }

    // Generate unique booking reference
    const bookingRef = `CA-${Date.now().toString(36).toUpperCase()}`

    // Insert into Supabase
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          service_type: formData.serviceType,
          home_size: formData.homeSize,
          bedrooms: Number.parseInt(formData.bedrooms),
          bathrooms: Number.parseFloat(formData.bathrooms),
          square_feet: formData.squareFeet ? Number.parseInt(formData.squareFeet) : null,
          frequency: formData.frequency,
          date: formData.date,
          time: formData.time,
          add_ons: formData.addOns,
          estimated_price: formData.estimatedPrice,
          special_instructions: formData.specialInstructions,
          booking_ref: bookingRef,
          status: "new",
          source: "website",
          utm_source: formData.utmSource,
          utm_medium: formData.utmMedium,
          utm_campaign: formData.utmCampaign,
          utm_term: formData.utmTerm,
          utm_content: formData.utmContent,
          referrer: formData.referrer,
        },
      ])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return {
        success: false,
        error: "Failed to save booking. Please try again.",
      }
    }

    console.log("✅ Booking saved to Supabase:", data)

    return {
      success: true,
      bookingRef,
      message: "Your estimate request has been submitted successfully!",
    }
  } catch (error) {
    console.error("Error submitting booking:", error)
    return {
      success: false,
      error: "An error occurred while submitting your request. Please try again.",
    }
  }
}
