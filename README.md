# 🧹 Clean Aura NYC - Professional Cleaning Services

> Modern, full-featured booking platform for professional cleaning services in New York City

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?style=flat-square&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Ready-3ecf8e?style=flat-square&logo=supabase)

---

## 🎯 Overview

Clean Aura NYC is a comprehensive web application for a professional cleaning service company. The platform features a sophisticated multi-step booking calculator that handles 9 different service types, dynamic pricing, and seamless customer experience.

**Live Demo:** [Your URL here]

---

## ✨ Features

### 🧮 Smart Booking Calculator
- **9 Service Types:** Standard, Deep, Move In/Out, Post-Construction, Heavy-Duty, Airbnb Turnover, Custom, Professional Organizing, Office/Commercial
- **Dynamic Pricing Engine:** Automatic price calculation based on property size, service type, and add-ons
- **Multi-Step Wizard:** Intuitive 4-5 step booking flow with progress tracking
- **Real-time Estimates:** Live price updates as users configure their service

### 💰 Pricing System
- **Flat Rate Services:** Pre-configured pricing for 27 property size combinations
- **Hourly Services:** Flexible hourly rates for custom cleaning and organizing
- **Consultation Services:** Custom quote system for specialized needs
- **Add-ons Marketplace:** 12+ premium add-ons with bundle discounts
- **Frequency Discounts:** Weekly (25%), Bi-weekly (15%), Monthly (10%)

### 🎨 Modern UI/UX
- **Responsive Design:** Optimized for mobile (iPhone 16), tablet, and desktop
- **Dark/Light Mode:** Full theme support with smooth transitions
- **Smooth Animations:** Framer Motion powered micro-interactions
- **Accessibility:** ARIA labels, keyboard navigation, screen reader support
- **Premium Components:** Custom-built UI library based on shadcn/ui

### 🗄️ Data Management
- **Supabase Integration:** PostgreSQL database with Row Level Security
- **Form Validation:** Real-time validation with helpful error messages
- **UTM Tracking:** Marketing attribution and analytics
- **Booking History:** Complete audit trail for all submissions

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm
- Supabase account (for database)

### Installation

```bash
# Clone the repository
git clone https://github.com/cleanauranyc-creator/1.git
cd 1

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

---

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── booking/                  # Booking flow pages
│   │   ├── page.tsx             # Main booking wizard
│   │   └── confirmation/        # Success page
│   ├── services/                # Services showcase
│   ├── reviews/                 # Customer reviews
│   └── page.tsx                 # Homepage
│
├── components/
│   ├── booking/                 # Booking flow components
│   │   ├── steps/              # Individual wizard steps
│   │   │   ├── service-selection.tsx
│   │   │   ├── property-details.tsx
│   │   │   ├── addons-customization.tsx
│   │   │   ├── datetime-selection.tsx
│   │   │   └── contact-info.tsx
│   │   └── shared/             # Shared booking UI
│   ├── ui/                     # Reusable UI components
│   └── [feature-components]/   # Feature-specific components
│
├── lib/
│   ├── booking-pricing-engine.ts    # Core pricing logic
│   ├── pricing-calculator.ts        # Price calculations
│   ├── booking-types.ts             # TypeScript definitions
│   ├── booking-flow-config.ts       # Flow configurations
│   └── supabase-client.ts           # Database client
│
├── scripts/
│   └── complete-booking-schema.sql  # Database schema
│
└── public/                      # Static assets
```

---

## 🛠️ Tech Stack

### Core
- **Framework:** Next.js 16.0 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4.1
- **UI Library:** shadcn/ui + Radix UI
- **Animations:** Framer Motion

### Data & State
- **Database:** Supabase (PostgreSQL)
- **State Management:** React Hooks + Reducer pattern
- **Forms:** React Hook Form + Zod validation

### Developer Experience
- **Package Manager:** pnpm
- **Linting:** ESLint
- **Formatting:** Prettier (via Tailwind)
- **Type Checking:** TypeScript strict mode

---

## 💼 Services Catalog

| Service | Type | Pricing | Add-ons |
|---------|------|---------|---------|
| **Standard Cleaning** | Flat Rate | $100-$300 | ✅ Yes |
| **Deep Cleaning** | Flat Rate | $200-$405 | ✅ Yes |
| **Move In/Out** | Flat Rate | $245-$485 | ✅ Yes |
| **Post-Construction** | Consultation | Custom Quote | ❌ No |
| **Heavy-Duty** | Consultation | Custom Quote | ❌ No |
| **Airbnb Turnover** | Consultation | Custom Quote | ❌ No |
| **Custom Cleaning** | Hourly | $50/hour | ❌ No |
| **Professional Organizing** | Consultation | $45-65/hour | ❌ No |
| **Office/Commercial** | Consultation | Custom Quote | ❌ No |

---

## 🎨 Customization

### Updating Prices

All pricing is centralized in `lib/booking-pricing-engine.ts`:

```typescript
// Update flat rates
export const FLAT_RATES = [
  { sizeId: "2br_2ba", service: "standard", price: 190, hours: 4.0 },
  // ...
]

// Update add-ons
export const ADDONS = {
  fridge: { name: "Refrigerator Inside", price: 40, time: 30 },
  // ...
}
```

### Adding New Services

1. Update `SERVICES` in `booking-pricing-engine.ts`
2. Add flow config in `booking-flow-config.ts`
3. Update service type in TypeScript types
4. Update database schema

---

## 🗄️ Database Setup

### Schema Installation

```bash
# Connect to your Supabase project
psql -h db.your-project.supabase.co -U postgres

# Run the schema
\i scripts/complete-booking-schema.sql
```

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

---

## 🚧 Development Roadmap

### ✅ Completed
- [x] Homepage with services carousel
- [x] Multi-step booking wizard
- [x] Pricing calculation engine
- [x] Property details forms for all services
- [x] Add-ons customization
- [x] Mobile-responsive design
- [x] Dark mode support

### 🔄 In Progress
- [ ] DateTime selection component
- [ ] Contact form validation
- [ ] Supabase integration
- [ ] Move service unfurnished logic
- [ ] Landlord checkout feature

### 📋 Planned
- [ ] Email notifications
- [ ] Payment integration (Stripe)
- [ ] Admin dashboard
- [ ] Customer portal
- [ ] Review system
- [ ] Blog/CMS integration

---

## 🧪 Testing

```bash
# Run type checking
pnpm type-check

# Run linter
pnpm lint

# Run tests (when implemented)
pnpm test
```

---

## 📦 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Setup
1. Add environment variables in Vercel dashboard
2. Configure Supabase connection
3. Set up domain (if custom)

---

## 🤝 Contributing

This is a private commercial project. For feature requests or bug reports, please contact the development team.

---

## 📄 License

Proprietary - All rights reserved by Clean Aura NYC

---

## 📞 Contact & Support

**Website:** [Your website]
**Email:** [Your email]
**Phone:** [Your phone]

---

## 🙏 Acknowledgments

- UI Components: [shadcn/ui](https://ui.shadcn.com/)
- Icons: [Lucide React](https://lucide.dev/)
- Database: [Supabase](https://supabase.com/)
- Framework: [Next.js](https://nextjs.org/)

---

<div align="center">
  <strong>Built with ❤️ for Clean Aura NYC</strong>
  <br />
  <sub>Modern. Professional. Reliable.</sub>
</div>
