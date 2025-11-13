"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Star, Truck, Hammer, Sliders, LayoutGrid, ShieldAlert, Key, Check, ArrowRight } from "lucide-react"

const services = [
  {
    id: "standard",
    icon: Sparkles,
    gradient: "from-blue-500 to-cyan-500",
    title: "Standard Cleaning",
    subtitle: "Regular Maintenance",
    description: "Keep your home fresh with routine cleaning",
    bullets: ["All main surfaces", "Kitchen & bathrooms", "Floors & dusting", "Best for maintained homes"],
    price: "From $145",
    note: "For regularly maintained spaces",
    link: "/services#standard",
  },
  {
    id: "deep-clean",
    icon: Star,
    gradient: "from-purple-500 to-indigo-500",
    title: "Deep Cleaning",
    subtitle: "Thorough Top-to-Bottom",
    description: "Comprehensive clean for neglected spaces",
    bullets: ["Baseboards & fixtures", "All accessible areas", "Detailed attention", "Comprehensive refresh"],
    price: "From $220",
    link: "/services#deep",
    popular: true,
  },
  {
    id: "move-in-out",
    icon: Truck,
    gradient: "from-pink-500 to-rose-500",
    title: "Move In/Out Cleaning",
    subtitle: "Move-Ready Perfection",
    description: "Complete empty home cleaning for moving",
    bullets: ["All rooms & closets", "Cabinets inside & out", "Landlord-ready clean", "Fresh start guarantee"],
    price: "From $190",
    link: "/services#move-in-out",
  },
  {
    id: "post-construction",
    icon: Hammer,
    gradient: "from-orange-500 to-amber-500",
    title: "Post-Construction Cleaning",
    subtitle: "After Renovation",
    description: "Heavy-duty cleanup after construction work",
    bullets: ["Dust & debris removal", "Paint & adhesive cleanup", "Make space livable", "Construction-grade clean"],
    price: "From $240",
    link: "/services#post-construction",
  },
  {
    id: "custom",
    icon: Sliders,
    gradient: "from-teal-500 to-cyan-500",
    title: "Custom Cleaning",
    subtitle: "Flexible Hourly Service",
    description: "Book as many hours & cleaners as you need",
    bullets: ["Flexible duration", "1-3 cleaners available", "Your priorities first", "For maintained spaces"],
    price: "$55/hr per cleaner",
    note: "*Rate may vary for heavily soiled spaces",
    link: "/services#custom",
    isNew: true,
  },
  {
    id: "organizing",
    icon: LayoutGrid,
    gradient: "from-green-500 to-emerald-500",
    title: "Professional Organizing",
    subtitle: "Declutter & Arrange",
    description: "Transform your space with expert organization",
    bullets: ["Standalone or add-on", "Closets, kitchens & more", "Maximize your space", "3-hour minimum"],
    price: "From $45/hr",
    note: "Experienced merchandisers available",
    link: "/services#organizing",
    isNew: true,
  },
  {
    id: "heavy-duty",
    icon: ShieldAlert,
    gradient: "from-red-500 to-orange-500",
    title: "Heavy-Duty Cleaning",
    subtitle: "Extreme Situations",
    description: "For severely neglected or soiled spaces",
    bullets: ["Hoarding cleanup", "Extreme conditions", "Custom assessment", "Manager consultation"],
    price: "Quote Required",
    note: "Consultation needed",
    link: "/services#heavy-duty",
    isNew: true,
  },
  {
    id: "airbnb",
    icon: Key,
    gradient: "from-yellow-500 to-orange-500",
    title: "Airbnb Cleaning",
    subtitle: "Turnover Service",
    description: "Quick turnovers between guest stays",
    bullets: ["Linen change included", "Restock supplies", "Custom checklists", "Recurring discounts"],
    price: "Custom Packages",
    note: "Best rates for regular hosts",
    link: "/services#airbnb",
    isNew: true,
  },
]

export function OurServicesSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
      {/* Decorative blur circles */}
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-gradient-to-br from-primary/10 to-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="h-3 w-3 mr-1.5" />
            Our Services
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Professional Cleaning Solutions
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Tailored to your needs with transparent pricing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <Card
                key={service.id}
                className="group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative flex flex-col"
              >
                {service.popular && (
                  <Badge className="absolute -top-2 -right-2 bg-accent text-accent-foreground shadow-lg z-10">
                    Most Popular
                  </Badge>
                )}
                {service.isNew && (
                  <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground shadow-lg z-10">
                    NEW
                  </Badge>
                )}

                <CardHeader className="pb-4">
                  {/* Icon with gradient background */}
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${service.gradient} p-3 mb-4 shadow-md`}>
                    <IconComponent className="w-full h-full text-white" />
                  </div>

                  {/* Title & Subtitle */}
                  <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">{service.subtitle}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 flex-1 flex flex-col">
                  {/* Description */}
                  <p className="text-muted-foreground text-sm">{service.description}</p>

                  {/* Bullets */}
                  <ul className="space-y-2 flex-1">
                    {service.bullets.map((bullet, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground/80">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="mt-auto pt-4 border-t">
                    <p className="text-2xl font-bold text-primary">{service.price}</p>
                    {service.note && <p className="text-xs text-muted-foreground mt-1">{service.note}</p>}
                  </div>

                  {/* Learn More Button */}
                  <Button
                    asChild
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors bg-transparent"
                  >
                    <Link href={service.link}>
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            <strong>Remember:</strong> These are base rates. Your final quote will be personalized based on your home
            size, condition, and specific needs.
          </p>
          <Button asChild size="lg" className="group">
            <Link href="/booking">
              Get Your Free Estimate
              <Sparkles className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
