import Link from "next/link"
import Image from "next/image"

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

const Mail = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
)

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo + Tagline */}
          <div className="space-y-4">
            <Image src="/logo.png" alt="CleanLine" width={120} height={40} className="h-10 w-auto" />
            <p className="text-sm text-muted-foreground">Your space, reimagined</p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-muted-foreground hover:text-primary transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services#standard" className="text-muted-foreground hover:text-primary transition-colors">
                  Standard Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services#deep" className="text-muted-foreground hover:text-primary transition-colors">
                  Deep Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services#move" className="text-muted-foreground hover:text-primary transition-colors">
                  Move In/Out
                </Link>
              </li>
              <li>
                <Link
                  href="/services#construction"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Post-Construction
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+15162066466" className="text-muted-foreground hover:text-primary transition-colors">
                  516-206-6466
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a
                  href="mailto:hello@clean-aura.us"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  hello@clean-aura.us
                </a>
              </li>
              <li className="text-muted-foreground">Mon-Sat 8am-8pm</li>
              <li className="text-muted-foreground">NYC, All Boroughs</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2025 CleanLine. All rights reserved. Made with ❤️ in NYC</p>
        </div>
      </div>
    </footer>
  )
}
