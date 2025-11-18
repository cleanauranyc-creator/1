"use client"

import { useState } from "react"

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
)

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export function TopInfoBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-slate-900 dark:bg-slate-950 text-white py-2.5 overflow-hidden border-b border-primary/20">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/60 to-primary"></div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-gradient bg-[length:200%_100%]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-1.5">
            <SparklesIcon className="h-4 w-4 sm:h-4 sm:w-4 text-accent" />
            <span className="font-bold tracking-tight text-accent">15% OFF</span>
            <span className="hidden sm:inline text-gray-300 dark:text-gray-400">First Cleaning</span>
          </div>

          <div className="hidden sm:block h-4 w-px bg-primary/30"></div>

          <div className="hidden sm:flex items-center gap-1.5">
            <MapPinIcon className="h-4 w-4 text-primary" />
            <span className="text-gray-300 dark:text-gray-400">Serving NYC</span>
          </div>

          <div className="hidden md:block h-4 w-px bg-primary/30"></div>

          <div className="hidden md:flex items-center gap-1.5">
            <ClockIcon className="h-4 w-4 text-primary" />
            <span className="text-gray-300 dark:text-gray-400">15-Min Response</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-primary/10 rounded-md transition-all duration-200 hover:scale-110"
        aria-label="Close banner"
      >
        <XIcon className="h-4 w-4 text-gray-400 hover:text-white" />
      </button>
    </div>
  )
}
