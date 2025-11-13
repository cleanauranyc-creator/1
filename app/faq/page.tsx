import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata = {
  title: "FAQ - CleanLine",
  description: "Frequently asked questions about CleanLine's cleaning services, pricing, and booking.",
}

export default function FAQPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our services
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-8">
            {/* General Questions */}
            <div>
              <h2 className="text-2xl font-bold mb-4">General Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What areas do you serve?</AccordionTrigger>
                  <AccordionContent>
                    We serve all five boroughs of NYC: Manhattan, Brooklyn, Queens, The Bronx, and Staten Island. We're
                    proud to bring professional cleaning services to every corner of New York City.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Do I need to provide cleaning supplies?</AccordionTrigger>
                  <AccordionContent>
                    No! We bring all necessary cleaning supplies and equipment. We use professional-grade, eco-friendly
                    products that are safe for your family and pets. If you have specific products you'd like us to use,
                    just let us know.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Are you insured?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we are fully insured and bonded. Your home and belongings are protected with comprehensive
                    insurance coverage. All our team members are also background-checked and professionally trained.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>What if I need to reschedule?</AccordionTrigger>
                  <AccordionContent>
                    We offer free rescheduling with 24 hours notice. Life happens, and we understand! Just give us a
                    call or send us an email at least 24 hours before your scheduled appointment.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Pricing */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Pricing</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-5">
                  <AccordionTrigger>How do you calculate prices?</AccordionTrigger>
                  <AccordionContent>
                    Our pricing is based on three factors: the type of service (Standard, Deep, Move In/Out, or
                    Post-Construction), your home size (Studio to 4+ bedrooms), and any add-on services you select. We
                    provide an estimated price upfront, and the final price depends on your home's condition.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>Do you offer discounts?</AccordionTrigger>
                  <AccordionContent>
                    Yes! First-time customers save $20 on their first cleaning. We also offer 10% off for weekly and
                    bi-weekly recurring cleanings, and 5% off for monthly recurring cleanings.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                  <AccordionContent>
                    We accept all major credit cards (Visa, Mastercard, American Express, Discover), cash, and Venmo.
                    Payment is due after the cleaning is complete and you're satisfied with the results.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Booking */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Booking</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-8">
                  <AccordionTrigger>How far in advance should I book?</AccordionTrigger>
                  <AccordionContent>
                    We recommend booking 3-7 days in advance for the best availability. However, we often have same-day
                    and next-day appointments available. Book online or give us a call to check availability.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9">
                  <AccordionTrigger>Can I book recurring cleanings?</AccordionTrigger>
                  <AccordionContent>
                    We offer weekly, bi-weekly, and monthly recurring cleaning schedules. Recurring customers enjoy
                    discounted rates and priority scheduling. You can cancel or modify your schedule anytime with 24
                    hours notice.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-10">
                  <AccordionTrigger>What if I'm not home?</AccordionTrigger>
                  <AccordionContent>
                    No problem! Many of our customers aren't home during their cleaning. We can coordinate with your
                    building super, or you can provide access via a lockbox or smart lock. We'll send you photos when
                    we're done so you can see the results.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Service */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Service</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-11">
                  <AccordionTrigger>How long does a cleaning take?</AccordionTrigger>
                  <AccordionContent>
                    It depends on the service type and home size. Standard cleanings typically take 2-3 hours, deep
                    cleanings 4-6 hours, and move in/out or post-construction cleanings 4-8 hours. We'll provide an
                    estimated time when you book.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-12">
                  <AccordionTrigger>What if I'm not satisfied?</AccordionTrigger>
                  <AccordionContent>
                    We offer a 100% satisfaction guarantee. If you're not completely happy with any aspect of your
                    cleaning, let us know within 24 hours and we'll come back to re-clean those areas for free. Your
                    satisfaction is our top priority.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-13">
                  <AccordionTrigger>Do you bring your own supplies?</AccordionTrigger>
                  <AccordionContent>
                    Yes! We bring all professional-grade cleaning supplies and equipment, including eco-friendly
                    products that are safe for your family, pets, and the environment. You don't need to provide
                    anything unless you have specific product preferences.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
