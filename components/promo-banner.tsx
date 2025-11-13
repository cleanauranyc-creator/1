import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const Sparkles = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
)

export function PromoBanner() {
  return (
    <div
      className="rounded-xl p-5 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 shadow-lg"
      style={{
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
      }}
    >
      <div className="space-y-3 text-center">
        {/* Small badge "Limited time" */}
        <Badge className="bg-black/20 text-white border-0 font-semibold text-xs hover:bg-black/30">Limited time</Badge>

        {/* Heading "15% OFF First Cleaning" */}
        <h3 className="text-2xl font-black text-black leading-tight">15% OFF First Cleaning</h3>

        {/* Subtext "New customers only" */}
        <p className="text-sm font-semibold text-black/80">New customers only</p>

        {/* Button "Claim Offer" */}
        <Button asChild size="sm" className="w-full bg-black text-white hover:bg-black/90 font-bold shadow-md">
          <Link href="#estimate">
            Claim Offer
            <Sparkles className="ml-2 h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
