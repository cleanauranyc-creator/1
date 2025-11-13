"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Phone, Mail, Clock } from "lucide-react"

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const bookingRef = searchParams.get("ref")

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardContent className="pt-12 pb-12 text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle2 className="h-20 w-20 text-primary animate-in zoom-in duration-500" />
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Request Received! 🎉</h1>
              <p className="text-lg text-muted-foreground">We'll reach out shortly to discuss your cleaning needs</p>
            </div>

            {bookingRef && (
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Reference Number</div>
                <div className="text-2xl font-bold font-mono">{bookingRef}</div>
              </div>
            )}

            <div className="text-left space-y-4 max-w-md mx-auto pt-6">
              <h2 className="font-semibold text-lg">What happens next?</h2>
              <ol className="space-y-4 text-muted-foreground">
                <li className="flex gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Confirmation Email</div>
                    <div className="text-sm">You'll receive a confirmation within 5 minutes</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Personal Consultation</div>
                    <div className="text-sm">
                      Our team will call within 1 hour to discuss your specific needs and provide a personalized quote
                    </div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Tailored Service</div>
                    <div className="text-sm">
                      We'll customize our cleaning plan to match your home and schedule perfectly
                    </div>
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm text-left max-w-md mx-auto">
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Note:</span> The estimate you saw is approximate. We'll
                provide an accurate quote after discussing your specific requirements and seeing your space details.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button asChild variant="outline">
                <Link href="/">Back to Home</Link>
              </Button>
              <Button asChild className="bg-[#5eaaa8] hover:bg-[#4d8987] text-white">
                <Link href="/booking">Request Another Estimate</Link>
              </Button>
            </div>

            <div className="pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                Questions? Call us at{" "}
                <a href="tel:+15162066466" className="font-semibold text-primary hover:underline">
                  516-206-6466
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
