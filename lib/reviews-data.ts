export interface Review {
  id: string
  name: string
  initials: string
  rating: 5
  date: string
  text: string
  verified: boolean
  avatar?: string
}

export const REVIEWS: Review[] = [
  {
    id: "1",
    name: "Elaine C.",
    initials: "EC",
    rating: 5,
    date: "Aug 20, 2025",
    text: "Anisa from CleanLine did an absolutely fantastic job cleaning my apartment! She was professional, thorough, and incredibly detail-oriented. My space has never looked so fresh and spotless. She went above and beyond to make sure everything was perfect. I highly recommend CleanLine's services to anyone looking for a reliable cleaning service!",
    verified: true,
  },
  {
    id: "2",
    name: "Hitesh P.",
    initials: "HP",
    rating: 5,
    date: "Aug 11, 2025",
    text: "CleanLine saved the day. Not only were they at the property within one hour of initiating this thumbtack gig. Their onsite team is extremely polite and professional. They did a wonderful job at such last minute notice, I cannot speak highly enough about this company. Would not hesitate to use them again.",
    verified: true,
  },
  {
    id: "3",
    name: "Kari D.",
    initials: "KD",
    rating: 5,
    date: "Aug 8, 2025",
    text: "Had a wonderful experience with this cleaning service! The cleaner did an amazing job deep cleaning my bathroom — everything is sparkling. She was kind, considerate, and thorough. Highly recommend!",
    verified: true,
  },
  {
    id: "4",
    name: "Gal M.",
    initials: "GM",
    rating: 5,
    date: "Aug 10, 2025",
    text: "They are great. I stayed with the cleaning lady the whole time for the first time as I like my house cleaned a certain way. I showed her how I preferred to clean certain areas of the house and she was more than happy to do it the way I liked. Very flexible with prices too. Great service",
    verified: true,
  },
  {
    id: "5",
    name: "Jin J.",
    initials: "JJ",
    rating: 5,
    date: "Jul 8, 2025",
    text: "It was super easy to set a schedule and communicate what I needed for the service. The house was spotlessly cleaned! Thank you!",
    verified: true,
  },
  {
    id: "6",
    name: "Paula B.",
    initials: "PB",
    rating: 5,
    date: "Sep 2025",
    text: "This was the best cleaning experience I've ever had our cleaner was so kind and wonderful and thorough! Will be using again!",
    verified: true,
  },
  {
    id: "7",
    name: "Talia S.",
    initials: "TS",
    rating: 5,
    date: "Sep 2025",
    text: "Anisa with CleanLine did an incredible job. They just totally get it and know how to get the job done!!! I was very impressed with my cleaning and I consider myself quite particular!!! Thanks again CleanLine!",
    verified: true,
  },
  {
    id: "8",
    name: "Noah J.",
    initials: "NJ",
    rating: 5,
    date: "Sep 17, 2025",
    text: "Great, thorough job. Good communication around timing, as we got a heads-up the cleaner was held behind at a previous job.",
    verified: true,
  },
  {
    id: "9",
    name: "Marie-Christine D.",
    initials: "MD",
    rating: 5,
    date: "Jun 16, 2025",
    text: "Great cleaning, felt ready and comfortable to move into my new apartment!",
    verified: true,
  },
  {
    id: "10",
    name: "David J.",
    initials: "DJ",
    rating: 5,
    date: "May 16, 2025",
    text: "Anisa was thorough and easy to work with. Did an amazing job and basically made the fridge look brand new. Very thankful",
    verified: true,
  },
  {
    id: "11",
    name: "Tricia h.",
    initials: "TH",
    rating: 5,
    date: "Sep 4, 2025",
    text: "Awesome cleaners!! I live in Colorado and needed a NYC apt cleaned. Anisa is fantastic. So cleanland we are picky!!) and the apartment we just moved into now feels so much better now! The last tenant left the place disgustingly dirty. Will use CleanLine again!",
    verified: true,
  },
  {
    id: "12",
    name: "Karthik P.",
    initials: "KP",
    rating: 5,
    date: "Sep 2, 2025",
    text: "I was really impressed with the cleaner! They arrived right on time and were able to fit me in on such short notice, which was a huge relief. The level of thoroughness was outstanding, and the pricing was very reasonable. Highly recommend!",
    verified: true,
  },
  {
    id: "13",
    name: "Emily J.",
    initials: "EJ",
    rating: 5,
    date: "Sep 28, 2025",
    text: "I booked a deep cleaning for my apartment in Manhattan, and the team did an amazing job! Every corner was spotless, and they even paid attention to small details like inside the oven and fridge. Communication was smooth and professional. Definitely will use them again",
    verified: true,
  },
  {
    id: "14",
    name: "Matthew D.",
    initials: "MD",
    rating: 5,
    date: "Sep 28, 2025",
    text: "The cleaner was right on time and worked nonstop until the apartment looked spotless. The bathroom hasn't been this shiny in years. Worth every dollar",
    verified: true,
  },
  {
    id: "15",
    name: "Sarah T.",
    initials: "ST",
    rating: 5,
    date: "Sep 28, 2025",
    text: "been using them for monthly cleanings, and I love the consistency. The same cleaner comes every time, which makes me feel comfortable. She's always polite, efficient, and thorough. Highly recommend their service to anyone in NYC",
    verified: true,
  },
  {
    id: "16",
    name: "Rachel G.",
    initials: "RG",
    rating: 5,
    date: "Sep 28, 2025",
    text: "I booked a last-minute cleaning before guests arrived, and they saved the day. Super fast, super clean, and really friendly service",
    verified: true,
  },
  {
    id: "17",
    name: "Jessica M.",
    initials: "JM",
    rating: 5,
    date: "Sep 27, 2025",
    text: "I booked a deep clean after moving into my new apartment. The team showed up on time, brought all supplies, and left everything sparkling. I couldn't be happier!",
    verified: true,
  },
  {
    id: "18",
    name: "Kathy w.",
    initials: "KW",
    rating: 5,
    date: "Jul 29, 2025",
    text: "We had a wonderful experience and the cleaner worked very hard. However, she did not come with a broom or a vacuum which was unusual for a move out clean. Regardless, it was well done.",
    verified: true,
  },
  {
    id: "19",
    name: "Thumbtack U.",
    initials: "TU",
    rating: 5,
    date: "Jul 9, 2025",
    text: "Moved into new apartment which was left very dirty by the previous tenants. The cleaner did a very good job on the deep cleaning service and paid attention to detail",
    verified: true,
  },
  {
    id: "20",
    name: "Hale A.",
    initials: "HA",
    rating: 5,
    date: "Jul 5, 2025",
    text: "They were great! Couldn't have been easy to book and organise. Cleaner was thorough, professional, and attentive. Would definitely use again!",
    verified: true,
  },
  {
    id: "21",
    name: "Daniel C.",
    initials: "DC",
    rating: 5,
    date: "Sep 27, 2025",
    text: "Professional and detail-oriented cleaners. They even cleaned behind my fridge and stove without me asking. Definitely the best service I've tried in NYC.",
    verified: true,
  },
  {
    id: "22",
    name: "Amanda J.",
    initials: "AJ",
    rating: 5,
    date: "Sep 27, 2025",
    text: "Booking was super easy and the cleaner was polite and efficient. I liked that I could pay by Zelle. I'll use them again for sure",
    verified: true,
  },
  {
    id: "23",
    name: "Sophia J.",
    initials: "SJ",
    rating: 5,
    date: "Sep 11, 2025",
    text: "Kate is absolutely fantastic! She transformed my apartment in just a few hours. The place not only looks clean but feels so much fresher. Kate clearly takes pride in her work — I couldn't have asked for a better cleaner.",
    verified: true,
  },
  {
    id: "24",
    name: "Isabel K.",
    initials: "IK",
    rating: 5,
    date: "Sep 5, 2025",
    text: "Excellent communication and really lovely people!! They did a great deep clean of my apartment. 10/10 👍",
    verified: true,
  },
  {
    id: "25",
    name: "Ethan D.",
    initials: "ED",
    rating: 5,
    date: "Aug 16, 2025",
    text: "The cleaner did a very thorough job. I would definitely use this service again!",
    verified: true,
  },
]

// Function to get a random review
export function getRandomReview(): Review {
  return REVIEWS[Math.floor(Math.random() * REVIEWS.length)]
}

// Function to get multiple random reviews
export function getRandomReviews(count: number): Review[] {
  const shuffled = [...REVIEWS].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
