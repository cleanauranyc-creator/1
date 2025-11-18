import { NextResponse } from "next/server"
import { REVIEWS } from "@/lib/reviews-data"

export async function GET() {
  try {
    const reviews = REVIEWS.map((review) => ({
      id: review.id,
      rating: review.rating,
      text: review.text,
      author: review.name,
      createdAt: review.date,
    }))

    return NextResponse.json(reviews)
  } catch (error) {
    console.error("[v0] Error fetching reviews:", error)
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}
