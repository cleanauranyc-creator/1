"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Heart, Zap, Sparkles, Leaf, Users, Clock } from "lucide-react"

interface Feature {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  gradient: string
  glowColor: string
  delay: number
}

const features: Feature[] = [
  {
    icon: ShieldCheck,
    title: "Vetted Professionals",
    description: "Every cleaner is background-checked, trained, and insured.",
    gradient: "from-blue-500 to-cyan-500",
    glowColor: "shadow-blue-500/50",
    delay: 0,
  },
  {
    icon: Heart,
    title: "Personalized Service",
    description: "We tailor every clean to your space and routine.",
    gradient: "from-pink-500 to-rose-500",
    glowColor: "shadow-pink-500/50",
    delay: 0.1,
  },
  {
    icon: Zap,
    title: "Lightning-Fast Response",
    description: "Get a free estimate—hear back within 15 minutes.",
    gradient: "from-yellow-500 to-orange-500",
    glowColor: "shadow-yellow-500/50",
    delay: 0.2,
  },
  {
    icon: Sparkles,
    title: "Quality Control & Aftercare",
    description: "If something's off, tell us the same day—we'll put it right fast.",
    gradient: "from-purple-500 to-indigo-500",
    glowColor: "shadow-purple-500/50",
    delay: 0.3,
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Options",
    description: "Safe for kids, pets, and the planet.",
    gradient: "from-green-500 to-emerald-500",
    glowColor: "shadow-green-500/50",
    delay: 0.4,
  },
  {
    icon: Users,
    title: "Same Cleaner, Consistency",
    description: "Keep the same pro for repeat visits.",
    gradient: "from-teal-500 to-cyan-500",
    glowColor: "shadow-teal-500/50",
    delay: 0.5,
  },
]

export function WhyChooseUsEnhanced() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background"
    >
      {/* Decorative blur circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Why NYC Trusts{" "}
            <span className="bg-gradient-to-r from-primary via-cyan-500 to-primary bg-clip-text text-transparent">
              CleanLine
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Premium service that respects your home, time, and budget.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className={`group relative overflow-hidden border border-border/50 bg-card hover:border-primary/40 transition-all duration-300 hover:shadow-2xl ${feature.glowColor} ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isVisible ? `${feature.delay}s` : "0s",
                  transitionDuration: "600ms",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <CardContent className="p-6 space-y-4">
                  {/* Icon Container */}
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                    aria-hidden="true"
                  >
                    <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                  </div>

                  {/* Text Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </CardContent>

                {/* Hover effect - card lift */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            )
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center space-y-4">
          <Button
            asChild
            size="lg"
            className="group relative overflow-hidden bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl px-8 h-14 text-lg font-bold"
          >
            <Link href="/booking">
              Get Your Free Estimate
              <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Clock className="h-4 w-4" />
            15-minute response time guaranteed
          </p>
        </div>
      </div>
    </section>
  )
}
