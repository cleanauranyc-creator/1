"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import ThumbtackIcon from "./thumbtack-icon"

interface Review {
  id: string
  author: string
  rating: number
  text: string
  createdAt: string
}

const Star = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

export function SocialProofCardCompact() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [fade, setFade] = useState(true)

  // Fallback review
  const fallbackReview: Review = {
    id: "fallback-1",
    author: "Sarah M.",
    rating: 5,
    text: "I booked deep cleaning for my apartment and the results were amazing. Every corner was spotless!",
    createdAt: "2024-01-15",
  }

  const currentReview = reviews.length > 0 ? reviews[currentIndex] : fallbackReview

  const displayName = currentReview.author?.trim() || "Verified customer"

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews")
        if (response.ok) {
          const data = await response.json()
          setReviews(data)
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [])

  useEffect(() => {
    if (reviews.length <= 1) return

    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length)
        setFade(true)
      }, 300)
    }, 25000) // 25 seconds

    return () => clearInterval(interval)
  }, [reviews.length])

  return (
    <div
      className="w-full bg-white rounded-xl p-4 border border-[#E7EEF3] mt-5"
      style={{
        boxShadow: "0 4px 14px rgba(12,20,40,.05)",
      }}
      aria-label="Customer reviews and ratings"
    >
      {/* Verified on Thumbtack Header */}
      <div className="flex items-center justify-center gap-2 pb-3 border-b border-[#E6EDF2]">
        <ThumbtackIcon className="h-4 w-4 text-[#009fd9]" />
        <span className="text-[13px] font-medium text-[#5B6775]">Verified on Thumbtack</span>
      </div>

      {/* Metrics Row */}
      <div className="flex items-stretch justify-between gap-3 py-2 border-b border-[#E6EDF2]">
        {/* 4.8★ */}
        <div className="flex-1 flex flex-col items-center justify-center gap-1 py-2">
          <div className="flex items-baseline justify-center gap-0.5">
            <p className="text-[22px] font-bold !text-slate-900 leading-[1.1] tracking-[-0.01em]">4.8</p>
            <Star className="h-[15px] w-[15px] text-yellow-500" style={{ verticalAlign: "baseline" }} />
          </div>
          <p className="text-xs leading-[1.4] text-[#7A8699] text-center w-full">Rating</p>
        </div>

        {/* Divider */}
        <div className="w-[1px] bg-[#E6EDF2] my-2"></div>

        {/* 142 */}
        <div className="flex-1 flex flex-col items-center justify-center gap-1 py-2">
          <p className="text-[22px] font-bold !text-slate-900 leading-[1.1] tracking-[-0.01em]">142</p>
          <p className="text-xs leading-[1.4] text-[#7A8699] text-center w-full">Reviews</p>
        </div>

        {/* Divider */}
        <div className="w-[1px] bg-[#E6EDF2] my-2"></div>

        {/* 500+ */}
        <div className="flex-1 flex flex-col items-center justify-center gap-1 py-2">
          <p className="text-[22px] font-bold !text-slate-900 leading-[1.1] tracking-[-0.01em]">500+</p>
          <p className="text-xs leading-[1.4] text-[#7A8699] text-center w-full">Jobs</p>
        </div>
      </div>

      {/* Review Content */}
      <div className={`py-3 transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}>
        {/* Stars */}
        <div className="flex items-center justify-center gap-1 mb-2.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-[15px] w-[15px] text-yellow-500" />
          ))}
        </div>

        {/* Review Text - Excerpt with line-clamp */}
        <p
          className="review-excerpt text-[15px] text-[#334155] font-normal text-left mx-auto overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
            maxWidth: "52ch",
            margin: "10px auto 12px",
            lineHeight: "1.68",
            letterSpacing: "0",
            hyphens: "auto",
            overflowWrap: "anywhere",
          }}
        >
          {currentReview.text}
        </p>

        {/* Review Footer - Reviewer name (always visible, outside excerpt) */}
        <div
          className="review-footer mx-auto"
          style={{ marginTop: 0, paddingTop: "4px", textAlign: "left", maxWidth: "52ch" }}
        >
          <span className="reviewer-name" style={{ fontSize: "13px", fontWeight: 600, color: "#334155" }}>
            {displayName}
          </span>
        </div>

        {/* Read Full Review Link */}
        <div className="text-center pt-2">
          <Link
            href={`/reviews#review-${currentReview.id}`}
            className="text-[13px] text-[#0B66E4] hover:underline inline-flex items-center gap-1"
          >
            Read full review →
          </Link>
        </div>
      </div>

      {/* Fallback for browsers without line-clamp support */}
      <style jsx>{`
        @supports not (-webkit-line-clamp: 3) {
          .review-excerpt {
            max-height: 6.5em;
          }
        }
      `}</style>
    </div>
  )
}
