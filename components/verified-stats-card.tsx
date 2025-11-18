import { Card, CardContent } from "@/components/ui/card"

export function VerifiedStatsCard() {
  return (
    <Card
      className="bg-card shadow-lg rounded-xl border border-border"
      aria-label="Thumbtack verification and statistics"
    >
      <CardContent className="p-6 lg:p-8">
        {/* Header: Thumbtack icon + text */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <img src="/images/thumbtack-logo.png" alt="Thumbtack logo" className="h-5 w-5 object-contain flex-shrink-0" />
          <span className="text-sm font-semibold text-muted-foreground">Verified on Thumbtack</span>
        </div>

        {/* Thin horizontal divider */}
        <hr className="border-t border-border/30 mb-6" />

        {/* Metrics: Desktop = 3 columns, Mobile = 1 column */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-4">
          {/* Metric 1: Rating */}
          <div className="flex-1 text-center">
            <p className="text-2xl lg:text-[28px] font-bold !text-slate-900 leading-none">4.8★</p>
            <p className="text-xs text-muted-foreground mt-2">Rating</p>
          </div>

          {/* Divider: Horizontal on mobile, Vertical on desktop */}
          <hr className="border-t border-border/30 lg:hidden" />
          <div className="hidden lg:block h-12 w-[1px] bg-border/30"></div>

          {/* Metric 2: Reviews */}
          <div className="flex-1 text-center">
            <p className="text-2xl lg:text-[28px] font-bold !text-slate-900 leading-none">142</p>
            <p className="text-xs text-muted-foreground mt-2">Reviews</p>
          </div>

          {/* Divider: Horizontal on mobile, Vertical on desktop */}
          <hr className="border-t border-border/30 lg:hidden" />
          <div className="hidden lg:block h-12 w-[1px] bg-border/30"></div>

          {/* Metric 3: Jobs */}
          <div className="flex-1 text-center">
            <p className="text-2xl lg:text-[28px] font-bold !text-slate-900 leading-none">500+</p>
            <p className="text-xs text-muted-foreground mt-2">Jobs</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
