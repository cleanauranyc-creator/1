import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Check, Clock, AlertTriangle, Info, Lightbulb, CheckCircle, Sparkles } from "lucide-react"

export const metadata = {
  title: "Our Services - CleanLine",
  description:
    "Professional cleaning services in NYC. Standard, deep cleaning, move in/out, and post-construction cleaning.",
}

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Professional Cleaning Services</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">Tailored to Your NYC Home</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:gap-12 max-w-7xl mx-auto">
            {/* Service 1: Deep Cleaning - MOST POPULAR */}
            <Card id="deep" className="overflow-hidden hover:shadow-lg transition-all">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="aspect-video md:aspect-square bg-muted relative overflow-hidden">
                  <img
                    src="/professional-deep-cleaning-service-nyc-apartment.jpg"
                    alt="Deep Cleaning Service"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className="bg-[#5eaaa8] text-white hover:bg-[#4d8987]">Most Popular</Badge>
                    </div>

                    <div>
                      <h2 className="text-3xl font-bold mb-2 tracking-tight">Deep Cleaning</h2>
                      <p className="text-4xl font-extrabold text-[#5eaaa8] tabular-nums">Starting from $200</p>
                    </div>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Top-to-bottom thorough clean for homes needing extra care.
                    </p>

                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#5eaaa8] shrink-0 mt-0.5" />
                        <span>Everything in Standard plus deep details</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#5eaaa8] shrink-0 mt-0.5" />
                        <span>Inside oven & fridge cleaning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#5eaaa8] shrink-0 mt-0.5" />
                        <span>Baseboards, window sills, behind furniture</span>
                      </li>
                    </ul>

                    <Alert className="bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <AlertDescription className="text-sm text-green-800 dark:text-green-200">
                        <strong>Perfect first-time choice!</strong> Get your home to baseline, then maintain with
                        Standard Cleaning.
                      </AlertDescription>
                    </Alert>

                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Typical duration: 3-6 hours
                    </p>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="w-full mt-6 bg-[#5eaaa8] hover:bg-[#4d8987] text-white uppercase tracking-wide font-semibold"
                  >
                    <Link href="/booking?service=deep">Get Free Estimate</Link>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Service 2: Standard Cleaning */}
            <Card id="standard" className="overflow-hidden hover:shadow-lg transition-all">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Content - Left on desktop */}
                <div className="p-6 md:p-8 flex flex-col justify-between order-2 md:order-1">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-3xl font-bold mb-2 tracking-tight">Standard Cleaning</h2>
                      <p className="text-4xl font-extrabold text-[#5eaaa8] tabular-nums">Starting from $120</p>
                    </div>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Keep your maintained home fresh and spotless.
                    </p>

                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#5eaaa8] shrink-0 mt-0.5" />
                        <span>All rooms dusted & vacuumed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#5eaaa8] shrink-0 mt-0.5" />
                        <span>Kitchen & bathroom sanitized</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#5eaaa8] shrink-0 mt-0.5" />
                        <span>Floors mopped, trash removed</span>
                      </li>
                    </ul>

                    <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900">
                      <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <AlertDescription className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Important:</strong> Requires a clean baseline. If your home needs deep attention, start
                        with Deep Cleaning.
                      </AlertDescription>
                    </Alert>

                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Typical duration: 2-4 hours
                    </p>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="w-full mt-6 bg-[#5eaaa8] hover:bg-[#4d8987] text-white uppercase tracking-wide font-semibold"
                  >
                    <Link href="/booking?service=standard">Get Free Estimate</Link>
                  </Button>
                </div>

                {/* Image - Right on desktop */}
                <div className="aspect-video md:aspect-square bg-muted relative overflow-hidden order-1 md:order-2">
                  <img
                    src="/standard-cleaning-service-nyc-home-maintenance.jpg"
                    alt="Standard Cleaning Service"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Card>

            {/* Service 3: Move In/Out Cleaning */}
            <Card id="move" className="overflow-hidden hover:shadow-lg transition-all">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="aspect-video md:aspect-square bg-muted relative overflow-hidden">
                  <img
                    src="/move-in-out-cleaning-empty-apartment-nyc.jpg"
                    alt="Move In/Out Cleaning Service"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-3xl font-bold mb-2 tracking-tight">Move In/Out Cleaning</h2>
                      <p className="text-4xl font-extrabold text-[#5eaaa8] tabular-nums">Starting from $250</p>
                    </div>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Complete empty-home clean for seamless transitions.
                    </p>

                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#5eaaa8] shrink-0 mt-0.5" />
                        <span>All rooms, all surfaces thoroughly cleaned</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#5eaaa8] shrink-0 mt-0.5" />
                        <span>Inside cabinets & drawers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#5eaaa8] shrink-0 mt-0.5" />
                        <span>Landlord-ready guarantee</span>
                      </li>
                    </ul>

                    <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900">
                      <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      <AlertDescription className="text-sm text-amber-800 dark:text-amber-200">
                        <strong>Note:</strong> Property must be empty (no furniture or personal items).
                      </AlertDescription>
                    </Alert>

                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Typical duration: 4-7 hours
                    </p>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="w-full mt-6 bg-[#5eaaa8] hover:bg-[#4d8987] text-white uppercase tracking-wide font-semibold"
                  >
                    <Link href="/booking?service=move">Get Free Estimate</Link>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Service 4: Post-Construction Cleaning */}
            <Card id="construction" className="overflow-hidden hover:shadow-lg transition-all">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Content - Left on desktop */}
                <div className="p-6 md:p-8 flex flex-col justify-between order-2 md:order-1">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-3xl font-bold mb-2 tracking-tight">Post-Construction Cleaning</h2>
                      <p className="text-4xl font-extrabold text-[#5eaaa8] tabular-nums">Starting from $350</p>
                    </div>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Heavy-duty cleanup after renovations and construction.
                    </p>

                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#5eaaa8] shrink-0 mt-0.5" />
                        <span>Construction debris removal</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#5eaaa8] shrink-0 mt-0.5" />
                        <span>Heavy dust elimination</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#5eaaa8] shrink-0 mt-0.5" />
                        <span>Window cleaning, floor scrubbing</span>
                      </li>
                    </ul>

                    <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900">
                      <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <AlertDescription className="text-sm text-blue-800 dark:text-blue-200">
                        Requires at least 48 hours post-construction for dust to settle.
                      </AlertDescription>
                    </Alert>

                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Typical duration: 5-10 hours
                    </p>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="w-full mt-6 bg-[#5eaaa8] hover:bg-[#4d8987] text-white uppercase tracking-wide font-semibold"
                  >
                    <Link href="/booking?service=construction">Get Free Estimate</Link>
                  </Button>
                </div>

                {/* Image - Right on desktop */}
                <div className="aspect-video md:aspect-square bg-muted relative overflow-hidden order-1 md:order-2">
                  <img
                    src="/post-construction-cleaning-renovation-nyc.jpg"
                    alt="Post-Construction Cleaning Service"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Card>

            {/* Service 5: Custom Cleaning */}
            <Card id="custom" className="overflow-hidden hover:shadow-lg transition-all">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="aspect-video md:aspect-square bg-muted relative overflow-hidden">
                  <img
                    src="/custom-flexible-cleaning-service-nyc.jpg"
                    alt="Custom Cleaning Service"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className="bg-[#2c5f5d] text-white hover:bg-[#234a48]">Flexible</Badge>
                    </div>

                    <div>
                      <h2 className="text-3xl font-bold mb-2 tracking-tight">Custom Cleaning</h2>
                      <p className="text-4xl font-extrabold text-[#5eaaa8] tabular-nums">Starting from $110/hour</p>
                    </div>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Flexible hourly service tailored to your priorities.
                    </p>

                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#5eaaa8] shrink-0 mt-0.5" />
                        <span>Choose 1-3 professional cleaners</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#5eaaa8] shrink-0 mt-0.5" />
                        <span>Pick your cleaning priorities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#5eaaa8] shrink-0 mt-0.5" />
                        <span>Flexible scheduling options</span>
                      </li>
                    </ul>

                    <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900">
                      <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <AlertDescription className="text-sm text-blue-800 dark:text-blue-200">
                        Best for homes already in good condition. Need baseline? Start with Deep Clean.
                      </AlertDescription>
                    </Alert>

                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Typical duration: 2-8 hours (you choose)
                    </p>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="w-full mt-6 bg-[#5eaaa8] hover:bg-[#4d8987] text-white uppercase tracking-wide font-semibold"
                  >
                    <Link href="/booking?service=custom">Get Free Estimate</Link>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Service 6: Housekeeping Services */}
            <Card id="housekeeping" className="overflow-hidden hover:shadow-lg transition-all">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Content - Left on desktop */}
                <div className="p-6 md:p-8 flex flex-col justify-between order-2 md:order-1">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className="bg-green-600 text-white hover:bg-green-700">Best Value</Badge>
                    </div>

                    <div>
                      <h2 className="text-3xl font-bold mb-2 tracking-tight">Housekeeping Services</h2>
                      <p className="text-4xl font-extrabold text-[#5eaaa8] tabular-nums">Starting from $480/month</p>
                    </div>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Recurring cleaning plans for consistently spotless living.
                    </p>

                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#5eaaa8] shrink-0 mt-0.5" />
                        <span>Priority scheduling guaranteed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#5eaaa8] shrink-0 mt-0.5" />
                        <span>Same team every time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#5eaaa8] shrink-0 mt-0.5" />
                        <span>Save 10-15% vs one-time bookings</span>
                      </li>
                    </ul>

                    <Alert className="bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900">
                      <Sparkles className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <AlertDescription className="text-sm text-green-800 dark:text-green-200">
                        Weekly plans save 15%. Lock in your slot + save money.
                      </AlertDescription>
                    </Alert>

                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Weekly/Bi-weekly/Monthly options
                    </p>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="w-full mt-6 bg-[#5eaaa8] hover:bg-[#4d8987] text-white uppercase tracking-wide font-semibold"
                  >
                    <Link href="/booking?service=housekeeping">Get Free Estimate</Link>
                  </Button>
                </div>

                {/* Image - Right on desktop */}
                <div className="aspect-video md:aspect-square bg-muted relative overflow-hidden order-1 md:order-2">
                  <img
                    src="/recurring-housekeeping-service-nyc-apartment.jpg"
                    alt="Housekeeping Services"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Card>

            {/* Service 7: Laundry Service */}
            <Card id="laundry" className="overflow-hidden hover:shadow-lg transition-all">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="aspect-video md:aspect-square bg-muted relative overflow-hidden">
                  <img src="/laundry-service-wash-dry-fold-nyc.jpg" alt="Laundry Service" className="w-full h-full object-cover" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-3xl font-bold mb-2 tracking-tight">Laundry Service</h2>
                      <p className="text-4xl font-extrabold text-[#5eaaa8] tabular-nums">Starting from $80</p>
                    </div>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Professional wash, dry, and fold while we clean.
                    </p>

                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#5eaaa8] shrink-0 mt-0.5" />
                        <span>Wash, dry, fold, organize</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#5eaaa8] shrink-0 mt-0.5" />
                        <span>Eco-friendly detergent included</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#5eaaa8] shrink-0 mt-0.5" />
                        <span>Delicates handled with care</span>
                      </li>
                    </ul>

                    <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900">
                      <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <AlertDescription className="text-sm text-blue-800 dark:text-blue-200">
                        Add to any cleaning service for ultimate convenience.
                      </AlertDescription>
                    </Alert>

                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Typical duration: 1-2 hours
                    </p>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="w-full mt-6 bg-[#5eaaa8] hover:bg-[#4d8987] text-white uppercase tracking-wide font-semibold"
                  >
                    <Link href="/booking?service=laundry">Get Free Estimate</Link>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Service 8: Airbnb Cleaning */}
            <Card id="airbnb" className="overflow-hidden hover:shadow-lg transition-all">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Content - Left on desktop */}
                <div className="p-6 md:p-8 flex flex-col justify-between order-2 md:order-1">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className="bg-[#2c5f5d] text-white hover:bg-[#234a48]">For Hosts</Badge>
                    </div>

                    <div>
                      <h2 className="text-3xl font-bold mb-2 tracking-tight">Airbnb Cleaning</h2>
                      <p className="text-4xl font-extrabold text-[#5eaaa8] tabular-nums">Starting from $90/turnover</p>
                    </div>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Fast, reliable guest-ready turnovers for hosts.
                    </p>

                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#5eaaa8] shrink-0 mt-0.5" />
                        <span>Fast turnaround times (2-3 hours)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#5eaaa8] shrink-0 mt-0.5" />
                        <span>Linen change & laundry included</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#5eaaa8] shrink-0 mt-0.5" />
                        <span>Guest-ready guarantee</span>
                      </li>
                    </ul>

                    <Alert className="bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900">
                      <Sparkles className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <AlertDescription className="text-sm text-green-800 dark:text-green-200">
                        New hosts get 15% off first 3 turnovers with monthly package.
                      </AlertDescription>
                    </Alert>

                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Typical duration: 2-3 hours per turnover
                    </p>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="w-full mt-6 bg-[#5eaaa8] hover:bg-[#4d8987] text-white uppercase tracking-wide font-semibold"
                  >
                    <Link href="/booking?service=airbnb">Get Free Estimate</Link>
                  </Button>
                </div>

                {/* Image - Right on desktop */}
                <div className="aspect-video md:aspect-square bg-muted relative overflow-hidden order-1 md:order-2">
                  <img
                    src="/airbnb-cleaning-turnover-service-nyc.jpg"
                    alt="Airbnb Cleaning Service"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Add-On Services</h2>
            <p className="text-lg text-muted-foreground">Enhance your cleaning experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Interior Windows</h3>
                <p className="text-2xl font-bold text-[#5eaaa8] mb-2">$45</p>
                <p className="text-sm text-muted-foreground">Streak-free window cleaning</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Fridge Deep Clean</h3>
                <p className="text-2xl font-bold text-[#5eaaa8] mb-2">$50</p>
                <p className="text-sm text-muted-foreground">Inside & out sanitization</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Oven Deep Clean</h3>
                <p className="text-2xl font-bold text-[#5eaaa8] mb-2">$50</p>
                <p className="text-sm text-muted-foreground">Grease & grime removal</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Laundry Service</h3>
                <p className="text-2xl font-bold text-[#5eaaa8] mb-2">$40-80</p>
                <p className="text-sm text-muted-foreground">Wash, dry, fold service</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Dish Washing</h3>
                <p className="text-2xl font-bold text-[#5eaaa8] mb-2">$30-40</p>
                <p className="text-sm text-muted-foreground">Hand wash & organize</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Organization</h3>
                <p className="text-2xl font-bold text-[#5eaaa8] mb-2">$55+/hour</p>
                <p className="text-sm text-muted-foreground">Professional organizing</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground">Get your personalized quote in under 2 minutes</p>
          <Button
            asChild
            size="lg"
            className="bg-[#5eaaa8] hover:bg-[#4d8987] text-white text-lg px-12 py-6 uppercase tracking-wide font-semibold hover:scale-105 transition-transform"
          >
            <Link href="/booking">Get Free Estimate</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
