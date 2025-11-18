"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { REVIEWS } from "@/lib/reviews-data"
import { useEffect, useState } from "react"

const Star = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

export default function ReviewsClient() {
  const [highlightedId, setHighlightedId] = useState<string | null>(null)
  const averageRating = 4.9
  const totalReviews = REVIEWS.length

  // Generate consistent avatar color based on initials
  const getAvatarColor = (initials: string) => {
    const colors = [
      "from-purple-400 to-pink-400",
      "from-blue-400 to-cyan-400",
      "from-green-400 to-emerald-400",
      "from-orange-400 to-red-400",
      "from-indigo-400 to-purple-400",
      "from-pink-400 to-rose-400",
      "from-teal-400 to-green-400",
      "from-yellow-400 to-orange-400",
    ]
    const index = initials.charCodeAt(0) % colors.length
    return colors[index]
  }

  useEffect(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash
    if (hash.startsWith("#review-")) {
      const reviewId = hash.replace("#review-", "")
      setHighlightedId(reviewId)

      // Scroll to the review
      const element = document.getElementById(`review-${reviewId}`)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
      }

      // Remove highlight after 3 seconds
      setTimeout(() => {
        setHighlightedId(null)
      }, 3000)
    }
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-background to-primary/5 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-8 w-8 text-yellow-400" />
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Customer Reviews</h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            {averageRating} stars from {totalReviews}+ verified Thumbtack customers
          </p>
          <Badge variant="secondary" className="mt-4">
            All Reviews Verified on Thumbtack
          </Badge>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {REVIEWS.map((review) => (
              <Card
                key={review.id}
                id={`review-${review.id}`}
                className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-slate-900 ${
                  highlightedId === review.id ? "ring-2 ring-primary shadow-xl" : ""
                }`}
              >
                <CardContent className="p-6 space-y-4">
                  {/* Header with avatar and name */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAvatarColor(review.initials)} flex items-center justify-center text-white font-bold flex-shrink-0`}
                      >
                        {review.initials}
                      </div>
                      <div>
                        <h3 className="font-semibold text-base">{review.name}</h3>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                    {review.verified && (
                      <Badge variant="secondary" className="shrink-0 text-xs">
                        ✓ Verified
                      </Badge>
                    )}
                  </div>

                  {/* Star rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400" />
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="text-sm text-muted-foreground leading-relaxed">"{review.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
