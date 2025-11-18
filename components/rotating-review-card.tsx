"use client"

import { useEffect, useState } from "react"
import { REVIEWS } from "@/lib/reviews-data"
import TiltedCard from "./tilted-card"

const Star = ({ className, filled = true }: { className?: string; filled?: boolean }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={filled ? 0 : 1.5}
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
    />
  </svg>
)

const QuoteIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
  </svg>
)

export function RotatingReviewCard() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % REVIEWS.length)
        setIsVisible(true)
      }, 400)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const currentReview = REVIEWS[currentIndex]

  const getAvatarColor = (initials: string) => {
    const colors = [
      "from-slate-600 via-slate-700 to-slate-800",
      "from-zinc-600 via-zinc-700 to-zinc-800",
      "from-stone-600 via-stone-700 to-stone-800",
      "from-neutral-600 via-neutral-700 to-neutral-800",
      "from-gray-600 via-gray-700 to-gray-800",
      "from-slate-700 via-slate-800 to-slate-900",
    ]
    const index = initials.charCodeAt(0) % colors.length
    return colors[index]
  }

  return (
    <TiltedCard
      imageSrc=""
      containerHeight="auto"
      containerWidth="100%"
      imageHeight="280px"
      imageWidth="100%"
      rotateAmplitude={8}
      scaleOnHover={1.05}
      showMobileWarning={false}
      showTooltip={false}
      displayOverlayContent={true}
      overlayContent={
        <div className="w-full h-full rounded-3xl bg-gradient-to-br from-white via-slate-50/95 to-white dark:from-slate-900 dark:via-slate-800/95 dark:to-slate-900 border-2 border-slate-200/80 dark:border-slate-700/80 shadow-2xl relative overflow-hidden">
          {/* Premium decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/5 to-transparent rounded-tr-[80px] pointer-events-none"></div>

          {/* Subtle shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-50 pointer-events-none"></div>

          <div className="relative z-10 p-7">
            <div className={`transition-opacity duration-400 ${isVisible ? "opacity-100" : "opacity-0"}`}>
              {/* Review Text - Premium typography */}
              <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200 font-normal mb-6 line-clamp-3 tracking-wide">
                {currentReview.text}
              </p>

              {/* Elegant divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent mb-6"></div>

              {/* Bottom section with avatar and info */}
              <div className="flex items-center justify-between gap-4">
                {/* Avatar and name */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Premium avatar with refined gradients */}
                  <div className="relative flex-shrink-0">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-400/30 to-slate-600/30 rounded-2xl blur-md"></div>
                    <div
                      className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${getAvatarColor(currentReview.initials)} flex items-center justify-center shadow-lg border border-white/20 dark:border-slate-700/50`}
                    >
                      <span className="text-white font-bold text-lg tracking-tight">{currentReview.initials}</span>
                    </div>
                  </div>

                  {/* Name and verified badge */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-slate-900 dark:text-white text-base tracking-tight truncate">
                        {currentReview.name}
                      </span>
                      {currentReview.verified && (
                        <svg className="h-4 w-4 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Verified Customer</span>
                  </div>
                </div>

                {/* Premium stars with glow effect */}
                <div className="flex items-center gap-0.5 flex-shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="relative">
                      {/* Glow effect for stars */}
                      <div className="absolute inset-0 blur-sm">
                        <Star className="h-4 w-4 text-amber-400/50" filled />
                      </div>
                      <Star className="relative h-4 w-4 text-amber-400 drop-shadow-sm" filled />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
}
