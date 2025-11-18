"use client"
import { useState, useEffect, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import Link from "next/link"
import {
  Sparkles,
  Star,
  Truck,
  Hammer,
  Sliders,
  LayoutGrid,
  ShieldAlert,
  Key,
  Check,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Autoplay from "embla-carousel-autoplay"

const services = [
  {
    id: "standard",
    icon: Sparkles,
    gradient: "from-blue-500 to-cyan-500",
    glowColor: "rgba(6, 182, 212, 0.4)",
    title: "Standard Cleaning",
    tagline: "Regular Maintenance",
    description: "Keep your home fresh with routine cleaning. All surfaces, kitchen, bathrooms.",
    features: ["All main surfaces", "Kitchen & bathrooms", "Floors & dusting", "Trash removal"],
    link: "/services#standard",
  },
  {
    id: "deep",
    icon: Star,
    gradient: "from-purple-500 to-indigo-500",
    glowColor: "rgba(139, 92, 246, 0.4)",
    title: "Deep Cleaning",
    tagline: "Thorough Top-to-Bottom",
    description: "Comprehensive clean for neglected spaces. Baseboards, fixtures, detailed attention.",
    features: ["Baseboards & fixtures", "All accessible areas", "Comprehensive refresh", "Detail-oriented"],
    link: "/services#deep",
  },
  {
    id: "move",
    icon: Truck,
    gradient: "from-pink-500 to-rose-500",
    glowColor: "rgba(236, 72, 153, 0.4)",
    title: "Move In/Out",
    tagline: "Move-Ready Perfection",
    description: "Complete empty home cleaning for moving. Landlord-ready clean guaranteed.",
    features: ["All rooms & closets", "Cabinets inside & out", "Fresh start guarantee", "Deposit-ready"],
    link: "/services#move-in-out",
  },
  {
    id: "construction",
    icon: Hammer,
    gradient: "from-orange-500 to-amber-500",
    glowColor: "rgba(249, 115, 22, 0.4)",
    title: "Post-Construction",
    tagline: "After Renovation",
    description: "Heavy-duty cleanup after construction work. Dust, paint, and adhesive removal.",
    features: ["Dust & debris removal", "Paint cleanup", "Construction-grade clean", "Safe & thorough"],
    link: "/services#post-construction",
  },
  {
    id: "custom",
    icon: Sliders,
    gradient: "from-teal-500 to-cyan-500",
    glowColor: "rgba(20, 184, 166, 0.4)",
    title: "Custom Cleaning",
    tagline: "Flexible Hourly Service",
    description: "Book as many hours & cleaners as you need. Your priorities, your schedule.",
    features: ["Flexible duration", "1-3 cleaners available", "Your priorities first", "Hourly rates"],
    link: "/services#custom",
  },
  {
    id: "organizing",
    icon: LayoutGrid,
    gradient: "from-green-500 to-emerald-500",
    glowColor: "rgba(34, 197, 94, 0.4)",
    title: "Professional Organizing",
    tagline: "Declutter & Arrange",
    description: "Transform your space with expert organization. Closets, kitchens, and more.",
    features: ["Standalone or add-on", "Maximize space", "Expert merchandisers", "Custom systems"],
    link: "/services#organizing",
  },
  {
    id: "heavy-duty",
    icon: ShieldAlert,
    gradient: "from-red-500 to-orange-500",
    glowColor: "rgba(239, 68, 68, 0.4)",
    title: "Heavy-Duty Cleaning",
    tagline: "Extreme Situations",
    description: "For severely neglected spaces. Hoarding cleanup, extreme conditions.",
    features: ["Hoarding cleanup", "Extreme conditions", "Manager consultation", "Specialized team"],
    link: "/services#heavy-duty",
  },
  {
    id: "airbnb",
    icon: Key,
    gradient: "from-yellow-500 to-orange-500",
    glowColor: "rgba(234, 179, 8, 0.4)",
    title: "Airbnb Turnover",
    tagline: "Host Service",
    description: "Quick turnovers between guests. Linen change, restock, custom checklists.",
    features: ["Linen change included", "Custom checklists", "Recurring discounts", "Fast turnaround"],
    link: "/services#airbnb",
  },
]

export function AnimatedServicesCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [desktopApi, setDesktopApi] = useState<CarouselApi>()
  const [desktopCurrent, setDesktopCurrent] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const autoplayPlugin = Autoplay({
    delay: 5000,
    stopOnInteraction: true,
    stopOnMouseEnter: true,
  })

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })

    api.on("pointerDown", () => {
      setIsDragging(true)
    })

    api.on("pointerUp", () => {
      setIsDragging(false)
    })

    api.on("settle", () => {
      setIsDragging(false)
    })
  }, [api])

  useEffect(() => {
    if (!desktopApi) return

    setDesktopCurrent(desktopApi.selectedScrollSnap())

    desktopApi.on("select", () => {
      setDesktopCurrent(desktopApi.selectedScrollSnap())
    })
  }, [desktopApi])

  const scrollToMobile = useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api],
  )

  const scrollToDesktop = useCallback(
    (index: number) => {
      desktopApi?.scrollTo(index)
    },
    [desktopApi],
  )

  // Since 3 cards are visible on desktop (lg:basis-1/3), the center card is at position +1
  const desktopCenterIndex = (desktopCurrent + 1) % services.length

  return (
    <section className="relative py-6 md:py-16 bg-gradient-to-b from-background/0 via-muted/20 to-background/0 overflow-hidden">
      {/* Decorative blur circles */}
      <div className="hidden md:block absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary/5 to-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-primary/5 to-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

      {/* Header */}
      <div className="container mx-auto px-4 mb-6 md:mb-12 relative z-30">
        <div className="text-center space-y-2 md:space-y-6">
          <Badge
            variant="secondary"
            className="inline-flex items-center gap-1.5 px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm bg-gradient-to-r from-primary/15 via-primary/20 to-primary/15 border border-primary/30 shadow-lg shadow-primary/10 backdrop-blur-sm"
          >
            <Sparkles className="h-3 w-3 md:h-3.5 md:w-3.5 text-primary" />8 Premium Services
          </Badge>

          <h2 className="text-[28px] leading-[34px] md:text-4xl lg:text-5xl xl:text-6xl md:leading-normal font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent relative z-30 px-2">
            Professional Cleaning Solutions
          </h2>

          <p className="text-[15px] leading-snug md:text-base lg:text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
            From routine maintenance to specialized deep cleans—every service designed for NYC homes
          </p>
        </div>
      </div>

      <div className="md:hidden px-4" data-id="services">
        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
            skipSnaps: false,
            dragFree: false,
          }}
          plugins={[autoplayPlugin]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <CarouselItem key={service.id} className="pl-4">
                  <Card
                    className="group relative overflow-hidden max-h-[280px] bg-card/95 backdrop-blur-sm border border-border/50 dark:border-white/10 shadow-xl shadow-foreground/5 ring-1 ring-border/30 dark:ring-white/5 rounded-2xl hover:scale-[1.02] hover:shadow-2xl hover:shadow-foreground/10 transition-all duration-300"
                    style={{
                      boxShadow: isDragging
                        ? `
                        0 25px 150px -20px ${service.glowColor},
                        0 15px 80px -10px ${service.glowColor},
                        0 8px 40px -5px ${service.glowColor},
                        0 4px 20px -2px ${service.glowColor}
                      `
                        : "none",
                      transition: "box-shadow 0.3s ease-in-out",
                    }}
                  >
                    {/* Top accent line - animates on hover */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                    />

                    <div className="pt-3 px-5 pb-5 relative z-10">
                      {/* Icon + Title horizontal layout */}
                      <div className="flex items-start gap-3 mb-2.5">
                        {/* Gradient glass icon */}
                        <div className="relative flex-shrink-0">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} p-2.5 shadow-lg border border-foreground/10 dark:border-white/10 ring-4 ring-white/50 dark:ring-white/10 group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                          >
                            <Icon className="w-full h-full text-white drop-shadow-sm" strokeWidth={2.5} />
                          </div>
                        </div>

                        {/* Title + Tagline */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-foreground leading-tight mb-1">{service.title}</h3>
                          <p className="text-sm font-medium text-primary">{service.tagline}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-base text-muted-foreground line-clamp-2 leading-relaxed mb-2.5">
                        {service.description}
                      </p>

                      {/* Features - 2 columns */}
                      <ul className="space-y-2 mb-3">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 group/item">
                            <div
                              className={`shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform duration-300 shadow-sm`}
                            >
                              <Check className="w-3 h-3 text-white" strokeWidth={3} />
                            </div>
                            <span className="text-sm text-muted-foreground font-medium">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Compact Learn More button - bottom-right corner */}
                      <Link
                        href={service.link}
                        className={`
                          absolute bottom-6 right-3 z-20
                          group/btn
                          flex items-center gap-1.5
                          px-3 py-1.5 rounded-lg
                          bg-gradient-to-r ${service.gradient}
                          text-white text-xs font-bold
                          shadow-md hover:shadow-lg
                          hover:scale-105
                          transition-all duration-300
                          active:scale-95
                        `}
                      >
                        <span className="relative">Learn More</span>
                        <ArrowRight
                          className="relative w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-0.5"
                          strokeWidth={2.5}
                        />
                      </Link>
                    </div>
                  </Card>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>

        {/* Progress indicators with 3-tier sizing, tooltips, and counter */}
        <div className="flex justify-center items-center gap-1.5 mt-6">
          {services.map((service, index) => {
            const isActive = current === index
            const isAdjacent =
              Math.abs(current - index) === 1 ||
              (current === 0 && index === services.length - 1) ||
              (current === services.length - 1 && index === 0)

            return (
              <button
                key={index}
                onClick={() => scrollToMobile(index)}
                className="group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
                aria-label={`Go to ${service.title}`}
              >
                <div className="relative overflow-hidden rounded-full">
                  <div
                    className={`
                      transition-all duration-500 ease-out
                      ${isActive ? "w-12 h-2.5" : isAdjacent ? "w-6 h-2.5" : "w-2.5 h-2.5"}
                      ${isActive ? "bg-muted" : "bg-muted-foreground/20"}
                      group-hover:bg-muted-foreground/30 shadow-inner
                    `}
                  />
                  <div
                    className={`
                      absolute inset-0 rounded-full bg-gradient-to-r ${service.gradient}
                      transition-all duration-500
                      ${isActive ? "opacity-100 scale-100 shadow-md" : "opacity-0 scale-95"}
                    `}
                  />
                  {!isActive && (
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-300`}
                    />
                  )}
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:-translate-y-1">
                  <div className="bg-foreground text-background text-xs font-semibold px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
                    {service.title}
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-0.5 border-[4px] border-transparent border-t-foreground" />
                </div>
              </button>
            )
          })}
        </div>

        {/* Counter below indicators */}
        <div className="text-center mt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/80 backdrop-blur-sm">
            <p className="text-xs font-semibold">
              <span className="text-foreground text-base">{current + 1}</span>
              <span className="text-muted-foreground mx-1">/</span>
              <span className="text-muted-foreground text-sm">{services.length}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden md:block relative z-20">
        <Carousel
          setApi={setDesktopApi}
          opts={{
            align: "start",
            loop: true,
            skipSnaps: false,
            dragFree: false,
          }}
          plugins={[autoplayPlugin]}
          className="w-full"
        >
          <div className="container mx-auto px-4 relative">
            <div className="relative px-16">
              <button
                onClick={() => desktopApi?.scrollPrev()}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-40 bg-background/90 dark:bg-background/95 backdrop-blur-sm border border-border dark:border-border/50 rounded-full p-3 lg:p-4 shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 hover:bg-primary/5 dark:hover:bg-primary/10"
                aria-label="Previous service"
              >
                <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-foreground dark:text-foreground" />
              </button>

              <button
                onClick={() => desktopApi?.scrollNext()}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-40 bg-background/90 dark:bg-background/95 backdrop-blur-sm border border-border dark:border-border/50 rounded-full p-3 lg:p-4 shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 hover:bg-primary/5 dark:hover:bg-primary/10"
                aria-label="Next service"
              >
                <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-foreground dark:text-foreground" />
              </button>

              <CarouselContent className="-ml-6">
                {services.map((service) => {
                  const ServiceIcon = service.icon
                  return (
                    <CarouselItem key={service.id} className="pl-6 md:basis-1/2 lg:basis-1/3">
                      <Card className="group relative overflow-hidden bg-card/95 backdrop-blur-sm border border-border/50 dark:border-border/30 shadow-lg shadow-foreground/5 hover:shadow-xl hover:shadow-foreground/10 rounded-2xl transition-all duration-300 ring-1 ring-border/20">
                        {/* Top accent line - animates on hover */}
                        <div
                          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                        />

                        {/* Gradient background - fades in */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br from-${service.gradient.split(" ")[0].replace("from-", "")} to-${service.gradient.split(" ")[1].replace("to-", "")}/50 opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                        />

                        {/* Shine sweep effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

                        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${service.gradient}`} />

                        <div className="pt-3 px-6 pb-6 relative z-10">
                          {/* Icon */}
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} p-2.5 shadow-lg mb-4 border border-foreground/10 dark:border-white/10 ring-4 ring-white/50 dark:ring-white/10 group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                          >
                            <ServiceIcon className="w-full h-full text-white drop-shadow-sm" strokeWidth={2.5} />
                          </div>

                          {/* Content */}
                          <h3 className="text-xl font-bold text-foreground mb-1">{service.title}</h3>
                          <p className="text-sm text-primary font-medium mb-3">{service.tagline}</p>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{service.description}</p>

                          {/* Features */}
                          <ul className="space-y-2 mb-3">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2.5 group/item">
                                <div
                                  className={`shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform duration-300 shadow-sm`}
                                >
                                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                </div>
                                <span className="text-sm text-muted-foreground font-medium">{feature}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Compact Learn More button - bottom-right corner */}
                          <Link
                            href={service.link}
                            className={`
                              absolute bottom-6 right-3 z-20
                              group/btn
                              flex items-center gap-1.5
                              px-3 py-1.5 rounded-lg
                              bg-gradient-to-r ${service.gradient}
                              text-white text-xs font-bold
                              shadow-md hover:shadow-lg
                              hover:scale-105
                              transition-all duration-300
                              active:scale-95
                            `}
                          >
                            <span className="relative">Learn More</span>
                            <ArrowRight
                              className="relative w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-0.5"
                              strokeWidth={2.5}
                            />
                          </Link>
                        </div>
                      </Card>
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
            </div>

            {/* Progress indicators with 3-tier sizing, tooltips, and counter */}
            <div className="flex justify-center items-center gap-1.5 mt-8">
              {services.map((service, index) => {
                const isActive = desktopCenterIndex === index
                const isAdjacent =
                  Math.abs(desktopCenterIndex - index) === 1 ||
                  (desktopCenterIndex === 0 && index === services.length - 1) ||
                  (desktopCenterIndex === services.length - 1 && index === 0)

                return (
                  <button
                    key={index}
                    onClick={() => {
  const scrollPos = (index - 1 + services.length) % services.length
  desktopApi?.scrollTo(scrollPos)
}}
                    className="group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
                    aria-label={`Go to ${service.title}`}
                  >
                    <div className="relative overflow-hidden rounded-full">
                      <div
                        className={`
                          transition-all duration-500 ease-out
                          ${isActive ? "w-16 h-3" : isAdjacent ? "w-8 h-3" : "w-3 h-3"}
                          ${isActive ? "bg-muted" : "bg-muted-foreground/20"}
                          group-hover:bg-muted-foreground/30 shadow-inner
                        `}
                      />
                      <div
                        className={`
                          absolute inset-0 rounded-full bg-gradient-to-r ${service.gradient}
                          transition-all duration-500
                          ${isActive ? "opacity-100 scale-100 shadow-md" : "opacity-0 scale-95"}
                        `}
                      />
                      {!isActive && (
                        <div
                          className={`absolute inset-0 rounded-full bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-300`}
                        />
                      )}
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:-translate-y-1">
                      <div className="bg-foreground text-background text-xs font-semibold px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
                        {service.title}
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-0.5 border-[4px] border-transparent border-t-foreground" />
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Counter below indicators */}
            <div className="text-center mt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/80 backdrop-blur-sm">
                <p className="text-xs font-semibold">
                  <span className="text-foreground text-base">{desktopCenterIndex + 1}</span>
                  <span className="text-muted-foreground mx-1">/</span>
                  <span className="text-muted-foreground text-sm">{services.length}</span>
                </p>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  )
}
