"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { FaqSectionShort } from "@/components/faq-section-short"
import { TrustBadgesSection } from "@/components/trust-badges"
import { PromoBanner } from "@/components/promo-banner"
import { SocialProofCard } from "@/components/social-proof-card"
import Threads from "@/components/Threads"
import { WhyChooseUsEnhanced } from "@/components/why-choose-us-enhanced"
import { OurServicesSection } from "@/components/our-services-section"
import { AnimatedServicesCarousel } from "@/components/animated-services-carousel"
import { useEffect, useRef, useState } from "react"

// Inline SVG Icons
const Sparkles = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
)

const Star = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const Shield = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
)

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const AlertCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const DollarSign = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const Shuffle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
    />
  </svg>
)

const Lock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2z"
    />
  </svg>
)

const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const XCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const Leaf = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
)

const MapPin = ({ className }: { className?: string }) => (
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

const Phone = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
)

const Zap = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const MessageSquare = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
  </svg>
)

const Home = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
)

const Heart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
)

const Zap = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const Award = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="12" cy="8" r="7" strokeWidth={2} />
    <path
      d="M8 12.5L10.5 15L16 9.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CheckmarkIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.1" />
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M8 12.5L10.5 15L16 9.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CreditCardSlash = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth={2} />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 10h20M3 3l18 18" />
  </svg>
)

const ChatBubbleCheck = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
  </svg>
)

const UserShieldIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
)

const InsuranceShieldIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2z"
    />
  </svg>
)

const GuaranteeBadgeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138z"
    />
  </svg>
)

const ShieldProtectIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v4m0 4h.01"
    />
  </svg>
)

const BadgeCheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138z"
    />
  </svg>
)

const UserX = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const ShieldCheck = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
  </svg>
)

export default function HomePage() {
  const [showThreads, setShowThreads] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useRef(false)

  useEffect(() => {
    // Check for reduced motion preference
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion.current) {
      return // Don't render Threads if user prefers reduced motion
    }

    // IntersectionObserver to pause when hero is not visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setShowThreads(entry.isIntersecting)
        })
      },
      { threshold: 0.1 },
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current)
      }
    }
  }, [])

  const features = [
    { icon: Shield, text: "Background-Checked Professionals", subtext: "Insured & bonded" },
    { icon: Clock, text: "Flexible Scheduling", subtext: "Same-day available" },
    { icon: CheckCircle2, text: "100% Satisfaction Guarantee", subtext: "Or we re-clean free" },
  ]

  return (
    <div className="flex flex-col home-page">
      <section
        ref={heroRef}
        id="hero"
        className="hero-section relative py-16 md:py-20 lg:min-h-[85vh] bg-background overflow-hidden lg:flex lg:items-center"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.03)_0%,transparent_50%),radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.05)_0%,transparent_60%)] pointer-events-none"></div>

        <div className="hero container mx-auto px-4 sm:px-6 lg:px-6 relative z-10" style={{ maxWidth: "1200px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            <div
              className="lg:col-span-7 space-y-6 lg:space-y-8"
              style={{ gridColumn: "1 / span 7", maxWidth: "620px" }}
            >
              {/* Trust Badge - Above headline */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-[10px] font-bold text-white border-2 border-background">
                    <Star className="w-3 h-3" />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-[10px] font-bold text-white border-2 border-background">
                    5.0
                  </div>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  Rated 5.0 by 500+ NYC Families
                </span>
              </div>

              {/* Headline - Benefit focused */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-foreground leading-[1.05]">
                  Your Home,{" "}
                  <span className="text-gradient-primary">Spotlessly Clean.</span>
                  <br />
                  <span className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">Without The Stress.</span>
                </h1>

                <p className="text-lg sm:text-xl lg:text-[22px] text-muted-foreground leading-relaxed max-w-xl">
                  Professional NYC cleaning service. Transparent pricing from <strong className="text-foreground">$130</strong>.
                  Book in 2 minutes, relax while we handle the rest.
                </p>
              </div>

              {/* Trust Features - Compact & Visual */}
              <div className="grid grid-cols-1 gap-3">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm sm:text-base font-semibold text-foreground block">{feature.text}</span>
                      <span className="text-xs text-muted-foreground">{feature.subtext}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Section - High Converting */}
              <div className="space-y-4 pt-2">
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* PRIMARY CTA */}
                  <Button
                    asChild
                    size="lg"
                    className="touch-target w-full sm:w-auto px-8 font-bold text-base sm:text-lg shadow-premium-lg hover:shadow-xl transition-all duration-300 active:scale-press"
                    style={{ backgroundColor: "#FDB913", color: "#000" }}
                  >
                    <Link href="/booking" className="flex items-center justify-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Get Free Estimate
                    </Link>
                  </Button>

                  {/* SECONDARY CTA - Phone */}
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="touch-target w-full sm:w-auto px-6 font-semibold border-2 hover:bg-primary/5 active:scale-press transition-all"
                  >
                    <a href="tel:+15162066466" className="flex items-center justify-center gap-2">
                      <Phone className="h-4 w-4" />
                      Call Now
                    </a>
                  </Button>
                </div>

                {/* Urgency + Social Proof */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm">
                  <Badge variant="secondary" className="w-fit bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                    <Clock className="h-3 w-3 mr-1" />
                    Book today, get 15% off first clean
                  </Badge>
                  <span className="text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <strong className="text-foreground">7 slots</strong> left this week
                    </span>
                  </span>
                </div>

                {/* Trust Line */}
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-primary" />
                  No payment required to book · Cancel anytime · 100% satisfaction guaranteed
                </p>
              </div>
            </div>

            {/* Right Column - Social Proof */}
            <div
              className="lg:col-span-5 space-y-4"
              style={{ gridColumn: "8 / span 5", alignSelf: "start" }}
            >
              <div className="lg:sticky lg:top-24 space-y-4">
                <SocialProofCard />
                <PromoBanner />
              </div>
            </div>
          </div>
        </div>

        {showThreads && !prefersReducedMotion.current && (
          <div className="hero-waves">
            <Threads
              color={[0.02, 0.71, 0.83]}
              amplitude={0.26}
              distance={1.3}
              enableMouseInteraction={typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches}
            />
          </div>
        )}

        <div className="hero-seam" aria-hidden="true"></div>
      </section>

      {/* Animated Services Carousel */}
      <AnimatedServicesCarousel />

      {/* Trust Badges */}
      <TrustBadgesSection />

      {/* Problem/Solution */}
      <section className="pt-20 md:pt-32 pb-12 md:pb-16 relative overflow-hidden bg-gradient-to-b from-background via-slate-50/50 to-background dark:from-background dark:via-slate-900/30 dark:to-background">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-gradient-to-br from-red-400/20 to-orange-500/20 blur-3xl animate-float"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 to-cyan-500/20 blur-3xl animate-float"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Header with Social Proof */}
            <div className="text-center mb-16 md:mb-24 space-y-6">
              <Badge
                variant="secondary"
                className="mb-2 text-sm px-4 py-1.5 bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/20 touch-target-sm"
              >
                <XCircle className="h-3.5 w-3.5 mr-1.5" />
                Common Frustrations
              </Badge>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                <span className="block text-foreground">We Get It.</span>
                <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  NYC Life is Hectic.
                </span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Between work, commutes, and actually living your life—cleaning falls to the bottom of the list.
              </p>
              {/* Social proof element */}
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-2">
                <Users className="h-4 w-4 text-primary" />
                <span><strong className="text-foreground">500+ NYC families</strong> already solved this problem</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
              {/* Problems Column */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-500/20 rounded-2xl blur-xl"></div>
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/10 flex items-center justify-center shadow-lg border border-red-500/20">
                      <XCircle className="h-8 w-8 text-red-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground">Sound Familiar?</h3>
                    <p className="text-sm text-muted-foreground">Common cleaning frustrations</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      text: "Working 60-hour weeks—who has time to scrub floors?",
                      icon: Clock,
                      color: "text-orange-500 dark:text-orange-400",
                      bgColor: "bg-white/80 dark:bg-orange-950/30 dark:shadow-orange-500/20",
                    },
                    {
                      text: "Tired of cleaners who cancel last minute or show up late",
                      icon: AlertCircle,
                      color: "text-red-500 dark:text-red-400",
                      bgColor: "bg-white/80 dark:bg-red-950/30 dark:shadow-red-500/20",
                    },
                    {
                      text: "Quoted $99, charged $300. Where's the transparency?",
                      icon: DollarSign,
                      color: "text-amber-500 dark:text-amber-400",
                      bgColor: "bg-white/80 dark:bg-amber-950/30 dark:shadow-amber-500/20",
                    },
                    {
                      text: "Different results every time—no consistency",
                      icon: Shuffle,
                      color: "text-rose-500 dark:text-rose-400",
                      bgColor: "bg-white/80 dark:bg-rose-950/30 dark:shadow-rose-500/20",
                    },
                    {
                      text: "Uncomfortable with strangers in your home",
                      icon: UserX,
                      color: "text-red-600 dark:text-red-500",
                      bgColor: "bg-white/80 dark:bg-red-950/30 dark:shadow-red-500/20",
                    },
                  ].map((problem, index) => {
                    const IconComponent = problem.icon
                    return (
                      <div
                        key={index}
                        className="group relative p-6 rounded-2xl bg-gradient-to-br from-red-50/50 to-orange-50/30 dark:from-red-950/20 dark:to-orange-950/10 border border-red-200/50 dark:border-red-800/30 hover:border-red-300 dark:hover:border-red-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex-shrink-0 w-10 h-10 rounded-xl ${problem.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm dark:shadow-md`}
                          >
                            <IconComponent className={`h-5 w-5 ${problem.color}`} />
                          </div>
                          <p className="text-base md:text-lg font-semibold text-foreground/90 leading-relaxed flex-1">
                            {problem.text}
                          </p>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Solutions Column */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl"></div>
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-cyan-500/10 flex items-center justify-center shadow-lg border border-primary/20">
                      <Sparkles className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground">Here's How We Help</h3>
                    <p className="text-sm text-muted-foreground">Our solutions for you</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      text: "Your weekends are yours again—we handle the rest",
                      icon: Home,
                      color: "text-cyan-500",
                    },
                    {
                      text: "We show up on time, every time. Period.",
                      icon: Clock,
                      color: "text-primary",
                    },
                    {
                      text: "Transparent hourly rates. No surprises, ever.",
                      icon: DollarSign,
                      color: "text-emerald-500",
                    },
                    {
                      text: "Same high standards, every single visit",
                      icon: Star,
                      color: "text-amber-500",
                    },
                    {
                      text: "Background-checked, insured pros you can trust",
                      icon: ShieldCheck,
                      color: "text-cyan-600",
                    },
                  ].map((solution, index) => {
                    const IconComponent = solution.icon
                    return (
                      <div
                        key={index}
                        className="group relative p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-cyan-500/5 dark:from-primary/10 dark:to-cyan-500/5 border border-primary/20 hover:border-primary/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/80 dark:bg-slate-800/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                            <IconComponent className={`h-5 w-5 ${solution.color}`} />
                          </div>
                          <p className="text-base md:text-lg font-semibold leading-relaxed text-foreground flex-1">
                            {solution.text}
                          </p>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    )
                  })}
                </div>

                {/* Enhanced CTA with Trust Signals */}
                <div className="pt-8 space-y-4">
                  <Button
                    asChild
                    size="lg"
                    className="w-full sm:w-auto touch-target h-14 px-8 text-lg font-bold shadow-premium-lg hover:shadow-xl transition-all duration-300 active:scale-press bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 group"
                  >
                    <Link href="/booking" className="flex items-center justify-center gap-2">
                      <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                      Get Your Free Estimate
                    </Link>
                  </Button>

                  {/* Trust line with multiple signals */}
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start gap-1.5">
                      <Clock className="h-4 w-4 text-primary" />
                      <strong className="text-foreground">15-minute</strong> response time guaranteed
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center justify-center sm:justify-start gap-1.5">
                      <Shield className="h-3.5 w-3.5 text-primary" />
                      Join 500+ satisfied NYC families · No payment required to book
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUsEnhanced />

      {/* Our Services */}
      <OurServicesSection />

      {/* FAQ Section */}
      <FaqSectionShort />

      {/* Guarantee - Enhanced with Trust & Social Proof */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Premium background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-cyan-500/5 pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <Badge variant="secondary" className="mb-6 touch-target-sm bg-primary/10 border-primary/20">
              <Shield className="h-3.5 w-3.5 mr-1.5" />
              Risk-Free Promise
            </Badge>

            {/* Icon with premium styling */}
            <div className="relative inline-flex mb-6">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"></div>
              <div className="relative w-20 h-20 rounded-full glass bg-gradient-to-br from-primary/20 to-cyan-500/10 flex items-center justify-center border-2 border-primary/20 shadow-premium">
                <Shield className="h-10 w-10 text-primary" />
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
              Our <span className="text-gradient-primary">100% Satisfaction</span> Guarantee
            </h2>

            {/* Enhanced description with specific benefits */}
            <div className="space-y-4 mb-8 px-4">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Your satisfaction is our <strong className="text-foreground">only priority</strong>. Before we leave, we walk through our detailed checklist with you to ensure every area exceeds your expectations.
              </p>
              <p className="text-base md:text-lg text-foreground font-semibold">
                If anything isn't perfect, we'll fix it on the spot—no questions, no hassle, completely free.
              </p>
            </div>

            {/* Social proof stat */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-cyan-500/10 border border-primary/20 mb-12">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span className="text-sm font-semibold text-foreground">
                <strong>98.7%</strong> of clients rate us 5 stars
              </span>
            </div>

            {/* Feature grid with enhanced styling */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: CheckCircle2,
                  text: "Detailed Checklist Review",
                  subtext: "Every area verified"
                },
                {
                  icon: Shield,
                  text: "Fully Insured & Bonded",
                  subtext: "$1M coverage"
                },
                {
                  icon: Heart,
                  text: "Your Satisfaction First",
                  subtext: "Re-clean free if needed"
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-2xl glass bg-gradient-to-br from-white/50 to-primary/5 dark:from-slate-900/50 dark:to-primary/10 border border-primary/10 hover:border-primary/30 hover:shadow-premium transition-all duration-300 card-hover-lift"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <p className="font-bold text-base md:text-lg mb-2 text-foreground">{item.text}</p>
                  <p className="text-sm text-muted-foreground">{item.subtext}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12">
              <Button
                asChild
                size="lg"
                className="touch-target px-8 font-bold shadow-premium-lg hover:shadow-xl active:scale-press transition-all duration-300 group"
              >
                <Link href="/booking" className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Book Risk-Free Today
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                No payment required until after you're 100% satisfied
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Slider - Enhanced */}
      <section id="before-after" className="py-16 md:py-24 bg-gradient-to-br from-muted/30 via-background to-muted/30 relative overflow-hidden">
        {/* Subtle background effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/5 to-cyan-500/5 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header with social proof */}
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <Badge variant="secondary" className="mb-2 touch-target-sm bg-primary/10 border-primary/20">
              <Sparkles className="h-3 w-3 mr-1.5" />
              Real Results
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4">
              See The <span className="text-gradient-primary">Transformation</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Drag the slider to see the incredible difference our deep cleaning makes
            </p>

            {/* Social proof stat */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                <strong className="text-foreground">Real photos</strong> from NYC homes like yours
              </span>
            </div>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            <BeforeAfterSlider
              beforeImage="/images/before-after/kitchen-before.jpg"
              afterImage="/images/before-after/kitchen-after.jpg"
              beforeLabel="Before"
              afterLabel="After"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BeforeAfterSlider
                beforeImage="/images/before-after/bathroom-before.jpg"
                afterImage="/images/before-after/bathroom-after.jpg"
                beforeLabel="Before"
                afterLabel="After"
              />
              <BeforeAfterSlider
                beforeImage="/images/before-after/living-room-before.jpg"
                afterImage="/images/before-after/living-room-after.jpg"
                beforeLabel="Before"
                afterLabel="After"
              />
            </div>
          </div>

          {/* Enhanced CTA section */}
          <div className="text-center mt-12 space-y-6">
            <div className="space-y-4">
              <Button
                asChild
                size="lg"
                className="touch-target px-8 font-bold shadow-premium-lg hover:shadow-xl active:scale-press transition-all duration-300 group"
              >
                <Link href="/booking" className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Get Your Free Estimate
                </Link>
              </Button>

              {/* Urgency + Trust */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
                <Badge variant="secondary" className="bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                  <Clock className="h-3 w-3 mr-1" />
                  Limited slots this week
                </Badge>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">2-minute</strong> booking · No payment required
                </span>
              </div>
            </div>

            {/* Social proof testimonial snippet */}
            <div className="max-w-md mx-auto mt-8 p-4 rounded-xl glass bg-gradient-to-br from-white/80 to-primary/5 dark:from-slate-900/80 dark:to-primary/10 border border-primary/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-foreground">Sarah M., Upper West Side</span>
              </div>
              <p className="text-sm text-muted-foreground italic">
                "The transformation was incredible. Worth every penny!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Enhanced */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-primary via-primary to-cyan-600 text-primary-foreground relative overflow-hidden">
        {/* Premium background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20px 20px, white 2px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 text-center space-y-6 sm:space-y-8 relative z-10">
          {/* Urgency badge */}
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm touch-target-sm">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            Limited Time Offer
          </Badge>

          {/* Headline with urgency */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
              Ready for a <span className="underline decoration-wavy decoration-white/40">Spotless Home?</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              Get your personalized quote in under 2 minutes
            </p>
          </div>

          {/* Offer highlight */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
            <Sparkles className="h-5 w-5" />
            <span className="font-bold text-lg">15% OFF</span>
            <span className="text-sm">your first cleaning · Book today!</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="touch-target text-base sm:text-lg px-8 font-bold w-full sm:w-auto shadow-xl hover:shadow-2xl active:scale-press transition-all duration-300 group"
              style={{ backgroundColor: "#FDB913", color: "#000" }}
            >
              <Link href="/booking" className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                Get Your Free Estimate
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="touch-target text-base sm:text-lg px-8 font-semibold w-full sm:w-auto bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary active:scale-press transition-all"
            >
              <a href="sms:+15162064666" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Text Us Now
              </a>
            </Button>
          </div>

          {/* Trust signals */}
          <div className="pt-6 space-y-3">
            {/* Social proof */}
            <div className="flex items-center justify-center gap-2 text-sm">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="font-semibold">
                <strong>500+ happy families</strong> served this month
              </span>
            </div>

            {/* Trust line */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs opacity-90">
              <span className="flex items-center gap-1">
                <Shield className="h-3.5 w-3.5" />
                No payment required
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Cancel anytime
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                2-minute booking
              </span>
            </div>

            {/* Urgency reminder */}
            <p className="text-xs opacity-80 pt-2">
              <strong>7 slots remaining</strong> this week · Book now to secure your spot
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
