"use client"

import { ThumbtackIcon } from "@/components/thumbtack-icon"
import { ReviewsTicker } from "@/components/reviews-ticker"

const Star = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

export function SocialProofCard() {
  return (
    <div
      className="bg-white rounded-xl overflow-hidden"
      style={{
        border: "1px solid #E7EEF3",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
        paddingTop: "20px",
        paddingLeft: "28px",
        paddingRight: "28px",
        paddingBottom: "16px",
      }}
    >
      {/* Ribbon Header - 32px height */}
      <div
        className="flex items-center justify-center gap-2 mb-3"
        style={{
          height: "32px",
          borderBottom: "1px solid #E6EDF2",
          paddingBottom: "8px",
        }}
      >
        <ThumbtackIcon className="h-4 w-4 flex-shrink-0" />
        <span
          className="font-medium !text-slate-600"
          style={{
            fontSize: "13px",
          }}
        >
          Verified on Thumbtack
        </span>
      </div>

      <div className="grid grid-cols-3 gap-0 text-center mb-2.5">
        {/* 4.8★ Rating */}
        <div className="flex flex-col items-center justify-center">
          <p
            className="font-bold leading-none flex items-baseline justify-center gap-0.5 !text-slate-900"
            style={{
              fontSize: "32px",
            }}
          >
            4.8
            <Star className="h-5 w-5 text-yellow-500 mb-1" />
          </p>
          <p
            className="mt-1.5 !text-slate-500 text-center"
            style={{
              fontSize: "12px",
            }}
          >
            Rating
          </p>
        </div>

        {/* Vertical Divider */}
        <div className="relative">
          <div
            className="absolute left-0 top-0 bottom-0"
            style={{
              width: "1px",
              backgroundColor: "#E6EDF2",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0"
            style={{
              width: "1px",
              backgroundColor: "#E6EDF2",
            }}
          />

          {/* 142 Reviews */}
          <div className="flex flex-col items-center justify-center h-full">
            <p
              className="font-bold leading-none !text-slate-900"
              style={{
                fontSize: "32px",
              }}
            >
              142
            </p>
            <p
              className="mt-1.5 !text-slate-500 text-center"
              style={{
                fontSize: "12px",
              }}
            >
              Reviews
            </p>
          </div>
        </div>

        {/* 500+ Jobs */}
        <div className="flex flex-col items-center justify-center">
          <p
            className="font-bold leading-none !text-slate-900"
            style={{
              fontSize: "32px",
            }}
          >
            500+
          </p>
          <p
            className="mt-1.5 !text-slate-500 text-center"
            style={{
              fontSize: "12px",
            }}
          >
            Jobs
          </p>
        </div>
      </div>

      {/* Optional Divider before Review */}
      <div
        className="my-3"
        style={{
          height: "1px",
          backgroundColor: "#E6EDF2",
        }}
      />

      {/* Review Area - integrated ReviewsTicker */}
      <ReviewsTicker />
    </div>
  )
}
