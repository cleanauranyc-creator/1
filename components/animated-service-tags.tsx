"use client"

import { useEffect, useState } from "react"

const services = [
  "Deep Cleaning",
  "Move In/Out Cleaning",
  "Regular Maintenance",
  "Post-Construction",
  "Office Cleaning",
  "Eco-Friendly Options",
]

export function AnimatedServiceTags() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % services.length)
        setIsAnimating(false)
      }, 300)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
      <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
      <span
        className={`font-semibold text-primary transition-all duration-300 ${
          isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        }`}
      >
        {services[currentIndex]}
      </span>
    </div>
  )
}
