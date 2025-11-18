-- Updated company name from Clean Aura to CleanLine
-- Create bookings table for CleanLine
CREATE TABLE IF NOT EXISTS bookings (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  service_type TEXT NOT NULL,
  home_size TEXT NOT NULL,
  bedrooms INTEGER,
  bathrooms NUMERIC,
  frequency TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  add_ons TEXT[],
  estimated_price INTEGER NOT NULL,
  special_instructions TEXT,
  booking_ref TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'new',
  source TEXT DEFAULT 'website',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  referrer TEXT
);

-- Create index on booking_ref for faster lookups
CREATE INDEX IF NOT EXISTS idx_bookings_ref ON bookings(booking_ref);

-- Create index on email for customer lookups
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);

-- Create index on created_at for date-based queries
CREATE INDEX IF NOT EXISTS idx_bookings_created ON bookings(created_at DESC);
