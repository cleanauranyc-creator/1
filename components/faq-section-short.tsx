"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const MessageCircleQuestion = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
  </svg>
)

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const faqs = [
  {
    question: "How much does cleaning cost?",
    answer:
      "Our pricing is transparent and straightforward. Standard cleaning starts at $45/hour, Deep cleaning at $50/hour, Move-in/out at $55/hour, and Post-construction at $60/hour. Final cost depends on your home size and service type. Most homes take 2-4 hours. Get your exact quote through our quick booking form!",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We proudly serve all five boroughs of NYC: Manhattan, Brooklyn, Queens, and parts of Staten Island. We bring professional cleaning services to every corner of New York City.",
  },
  {
    question: "What cleaning supplies do you use?",
    answer:
      "We bring all professional-grade, eco-friendly cleaning products that are safe for your family and pets. You don't need to provide anything! If you have specific product preferences or allergies, just let us know and we're happy to accommodate.",
  },
  {
    question: "Do I need to be home during cleaning?",
    answer:
      "Not at all! Many of our clients prefer to be out while we work. We can arrange secure key exchange with your building super, use your lockbox, or coordinate with your doorman. Your convenience and security are our priorities.",
  },
  {
    question: "How do I book a cleaning?",
    answer:
      "It's simple! Click \"Get Your Free Estimate,\" select your service type and home details, choose your preferred date and time, and provide your contact information. You'll get instant confirmation and we'll contact you within 15 minutes to finalize everything.",
  },
  {
    question: "How do you ensure quality?",
    answer:
      "Our team follows a detailed checklist for every job. We encourage you to inspect our work before we leave, so we can address any concerns on the spot. Communication and your satisfaction are our priorities.",
  },
]

export function FaqSectionShort() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-accent/5 via-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <Badge variant="secondary" className="mb-2">
              <MessageCircleQuestion className="h-3.5 w-3.5 mr-1.5" />
              Quick Answers
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Got Questions? We've Got Answers
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Quick answers to help you get started with CleanLine
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-primary/20 rounded-xl bg-card hover:bg-accent/5 hover:border-primary/40 transition-all duration-300 overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-5 text-left hover:no-underline group">
                  <span className="text-base md:text-lg font-semibold pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 pt-0">
                  <p className="text-base text-muted-foreground leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Footer */}
          <div className="mt-10 text-center space-y-4">
            <Button asChild size="lg" className="group">
              <Link href="/faq">
                View All FAQs
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              Still have questions?{" "}
              <Link href="/booking" className="underline hover:text-foreground transition-colors">
                Chat with us during booking
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
