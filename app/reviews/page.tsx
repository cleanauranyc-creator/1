import ReviewsClient from "./reviews-client"

export const metadata = {
  title: "Customer Reviews - CleanLine",
  description: "Read what our customers say about CleanLine's professional cleaning services in NYC.",
}

export default function ReviewsPage() {
  return <ReviewsClient />
}
