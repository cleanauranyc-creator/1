"use client"

import type React from "react"
import Image from "next/image"
import { LogoLoop } from "./logo-loop"
import "./logo-loop.css"
import ThumbtackIcon from "./thumbtack-icon"
import { SocialProofCardCompact } from "./social-proof-card-compact"

// Trust Badge Component
const TrustBadge = ({
  icon: Icon,
  text,
  subtext,
}: { icon: React.ComponentType<{ className?: string }>; text: string; subtext?: string }) => (
  <div className="flex flex-col items-center gap-4 min-w-[140px]">
    <div className="relative w-24 h-24 max-w-24 max-h-24 flex-shrink-0 rounded-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/5 overflow-hidden">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Icon className="w-10 h-10 text-primary relative z-10" />
    </div>
    <div className="text-center flex-shrink-0">
      <p className="text-sm font-semibold text-foreground/90 leading-tight">{text}</p>
      {subtext && <p className="text-xs text-muted-foreground mt-0.5">{subtext}</p>}
    </div>
  </div>
)

const LogoBadge = ({ logoSrc, text, subtext }: { logoSrc: string; text: string; subtext?: string }) => (
  <div className="flex flex-col items-center gap-4 min-w-[140px]">
    <div className="relative w-24 h-24 max-w-24 max-h-24 flex-shrink-0 rounded-full border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/5 overflow-hidden">
      <Image
        src={logoSrc || "/placeholder.svg"}
        alt={`${text} logo`}
        width={96}
        height={96}
        className="w-full h-full object-cover block"
      />
    </div>
    <div className="text-center flex-shrink-0">
      <p className="text-sm font-semibold text-foreground/90 leading-tight">{text}</p>
      {subtext && <p className="text-xs text-muted-foreground mt-0.5">{subtext}</p>}
    </div>
  </div>
)

// Icons
const ShieldCheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
    />
  </svg>
)

const HomeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
    />
  </svg>
)

const LeafIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
)

const ThumbsUpIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"
    />
  </svg>
)

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

export function TrustBadgesSection() {
  const badges = [
    {
      node: <TrustBadge icon={ShieldCheckIcon} text="Background" subtext="Checked" />,
    },
    {
      node: <TrustBadge icon={ShieldCheckIcon} text="Insured &" subtext="Bonded" />,
    },
    {
      node: <TrustBadge icon={HomeIcon} text="500+ Happy" subtext="Homes" />,
    },
    {
      node: <TrustBadge icon={LeafIcon} text="Eco-Friendly" subtext="Options" />,
    },
    {
      node: <TrustBadge icon={ThumbtackIcon} text="Thumbtack" subtext="Verified" />,
    },
  ]

  return (
    <section className="pt-2 pb-5 lg:py-20 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-3 md:mb-12">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-2 md:mb-3 tracking-tight">
            Trusted by NYC Residents
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional cleaning service you can rely on
          </p>
        </div>

        <div className="relative py-2 mb-7 md:py-0 md:mb-0">
          <LogoLoop
            logos={badges}
            speed={30}
            direction="left"
            logoHeight={140}
            gap={48}
            pauseOnHover={true}
            fadeOut={true}
            scaleOnHover={true}
            ariaLabel="Trust badges"
          />
        </div>

        <div className="md:hidden max-w-md mx-auto mt-7">
          <SocialProofCardCompact />
        </div>
      </div>
    </section>
  )
}
