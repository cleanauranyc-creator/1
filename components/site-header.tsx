"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useTheme } from "@/components/theme-provider"

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
)

const MenuIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const MessageSquareIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
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

const MoonIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
)

const SunIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
)

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Reviews", href: "/reviews" },
    { name: "FAQ", href: "/faq" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 transition-all duration-300 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="relative">
              <div className="text-2xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors duration-300">
                CLEAN<span className="text-primary">LINE</span>
              </div>
              <div className="absolute -bottom-1 left-0 h-1 w-full bg-primary rounded-full"></div>
            </div>
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 border border-primary/30">
              <MapPinIcon className="h-3 w-3 text-primary" />
              <span className="text-xs font-semibold text-foreground">NYC</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[15px] font-semibold text-foreground tracking-wide transition-colors hover:text-primary relative group py-2"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full rounded-full"></span>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Dark mode toggle button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
            </Button>

            {/* Desktop Contact */}
            <div className="hidden lg:flex items-center gap-2">
              <a
                href="sms:+15162066466"
                className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/10"
              >
                <MessageSquareIcon className="h-4 w-4" />
                <span>Text</span>
              </a>
              <a
                href="tel:+15162066466"
                className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/10"
              >
                <PhoneIcon className="h-4 w-4" />
                <span>516-206-6466</span>
              </a>
            </div>

            {/* Mobile contact buttons */}
            <div className="lg:hidden flex gap-1">
              <a href="sms:+15162066466">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <MessageSquareIcon className="h-4 w-4" />
                  <span className="sr-only">Text us</span>
                </Button>
              </a>
              <a href="tel:+15162066466">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <PhoneIcon className="h-4 w-4" />
                  <span className="sr-only">Call us</span>
                </Button>
              </a>
            </div>

            <div className="hidden lg:block relative">
              <div className="absolute -top-2 -right-2 z-10">
                <div className="bg-accent text-accent-foreground text-xs font-black px-3 py-1 rounded-full shadow-lg">
                  15% OFF
                </div>
              </div>

              <Button
                asChild
                size="default"
                className="relative overflow-hidden bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Link href="/booking">
                  <span className="relative z-10">Get Free Estimate</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <XIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-2 border-t animate-fade-in">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2.5 px-3 text-sm font-semibold text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="pt-3 relative">
              <div className="absolute top-1 right-2 z-10">
                <div className="bg-accent text-accent-foreground text-xs font-black px-3 py-1 rounded-full shadow-lg">
                  15% OFF
                </div>
              </div>

              <Button
                asChild
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-lg"
                size="default"
              >
                <Link href="/booking" onClick={() => setMobileMenuOpen(false)}>
                  Get Free Estimate
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
