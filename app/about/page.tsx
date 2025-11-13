import { Shield, Heart, Leaf, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "About Us - CleanLine",
  description: "Learn about CleanLine, NYC's trusted cleaning service founded by locals who understand city living.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About CleanLine</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Making clean living accessible to everyone in NYC
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg dark:prose-invert mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Founded in 2023 by NYC natives who understand the challenges of keeping a clean home in the city,
              CleanLine was born from a simple idea: professional cleaning should be accessible, reliable, and
              stress-free.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              We know what it's like to juggle work, family, and city life. That's why we created a service that fits
              seamlessly into your busy schedule, with transparent pricing and exceptional results every time.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Today, we're proud to serve over 500 families across all five boroughs, bringing the gift of time and
              peace of mind to New Yorkers just like you.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">What makes CleanLine different</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card>
              <CardContent className="pt-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Reliability</h3>
                <p className="text-sm text-muted-foreground">On-time service you can count on, every single time</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Eco-Friendly</h3>
                <p className="text-sm text-muted-foreground">
                  Safe, green products that protect your family and the planet
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Vetted Staff</h3>
                <p className="text-sm text-muted-foreground">Background-checked, trained professionals you can trust</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Satisfaction Guaranteed</h3>
                <p className="text-sm text-muted-foreground">Not happy? We'll re-clean for free, no questions asked</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Fully Insured & Bonded</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your home and belongings are protected with comprehensive insurance coverage. All our team members are
            background-checked and professionally trained.
          </p>
        </div>
      </section>
    </div>
  )
}
