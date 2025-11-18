"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"

const Star = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const ChevronLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

interface Review {
  id: string
  rating: number
  text: string
  author: string
  createdAt: string
}

// Static fallback review
const FALLBACK_REVIEW: Review = {
  id: "13",
  rating: 5,
  text: "I booked deep cleaning for my apartment and the results were amazing. Professional, thorough, and worth every penny!",
  author: "Sarah M.",
  createdAt: "Sep 28, 2025",
}

export function ReviewsTicker() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [fade, setFade] = useState(true)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)

  // Fetch reviews from API
  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch("/api/reviews")
        if (!response.ok) throw new Error("Failed to fetch reviews")
        const data = await response.json()
        setReviews(data)
        setIsLoading(false)
      } catch (err) {
        console.error("[v0] Error fetching reviews:", err)
        setError(true)
        setReviews([FALLBACK_REVIEW])
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const changeReview = useCallback((newIndex: number) => {
    setFade(false)
    setTimeout(() => {
      setCurrentIndex(newIndex)
      setFade(true)
    }, 300)
  }, [])

  const goToNext = useCallback(() => {
    if (reviews.length === 0) return
    const nextIndex = (currentIndex + 1) % reviews.length
    changeReview(nextIndex)

    // Reset auto-rotation timer
    if (intervalId) {
      clearInterval(intervalId)
    }
  }, [currentIndex, reviews.length, changeReview, intervalId])

  const goToPrevious = useCallback(() => {
    if (reviews.length === 0) return
    const prevIndex = currentIndex === 0 ? reviews.length - 1 : currentIndex - 1
    changeReview(prevIndex)

    // Reset auto-rotation timer
    if (intervalId) {
      clearInterval(intervalId)
    }
  }, [currentIndex, reviews.length, changeReview, intervalId])

  useEffect(() => {
    if (reviews.length === 0) return

    const id = setInterval(() => {
      changeReview((currentIndex + 1) % reviews.length)
    }, 25000)

    setIntervalId(id)

    return () => clearInterval(id)
  }, [reviews.length, currentIndex, changeReview])

  if (isLoading) {
    return (
      <div className="space-y-3 animate-pulse">
        <div className="flex gap-1 justify-center">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-4 bg-muted rounded" />
          ))}
        </div>
        <div className="h-12 bg-muted rounded" />
        <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
      </div>
    )
  }

  const currentReview = reviews[currentIndex] || FALLBACK_REVIEW

  const displayName = currentReview.author?.trim() || "Verified customer"

  return (
    <div className="space-y-2">
      <div className="flex gap-1.5 justify-center mt-2 mb-2">
        {[...Array(currentReview.rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 text-yellow-500" />
        ))}
      </div>

      <div className="hidden lg:flex items-center gap-3">
        <button
          onClick={goToPrevious}
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm"
          aria-label="Previous review"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex-1">
          <div
            className={`transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}
            style={{ minHeight: "3rem" }}
          >
            <p
              className="text-center leading-relaxed line-clamp-3 !text-slate-700"
              style={{
                fontSize: "16px",
              }}
            >
              {currentReview.text}
            </p>
            <p
              className="text-center mt-2 !text-slate-500"
              style={{
                fontSize: "12px",
              }}
            >
              — {displayName}, NYC
            </p>
          </div>
        </div>

        <button
          onClick={goToNext}
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm"
          aria-label="Next review"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="lg:hidden space-y-3">
        <div
          className={`transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}
          style={{ minHeight: "3rem" }}
        >
          <p
            className="text-center leading-relaxed line-clamp-3 !text-slate-700"
            style={{
              fontSize: "16px",
            }}
          >
            {currentReview.text}
          </p>
          <p
            className="text-center mt-2 !text-slate-500"
            style={{
              fontSize: "12px",
            }}
          >
            — {displayName}, NYC
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={goToPrevious}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-600 hover:text-slate-900 transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <span className="text-xs text-slate-500 font-medium min-w-[3rem] text-center">
            {currentIndex + 1} / {reviews.length}
          </span>

          <button
            onClick={goToNext}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-600 hover:text-slate-900 transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm"
            aria-label="Next review"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Read Full Review Button */}
      <div className="text-center pt-2">
        <Link
          href={`/reviews#review-${currentReview.id}`}
          className="hover:underline transition-colors !text-blue-600"
          style={{
            fontSize: "13px",
          }}
        >
          Read full review →
        </Link>
      </div>
    </div>
  )
}
