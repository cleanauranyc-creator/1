-- DROP old table and create fresh one with complete schema
-- Safe to run: old table has no important data

-- Drop existing table
DROP TABLE IF EXISTS bookings CASCADE;

-- Create fresh bookings table with all fields for 9 service flows
CREATE TABLE bookings (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  -- Service info
  service_type TEXT NOT NULL CHECK (service_type IN (
    'standard_cleaning',
    'deep_cleaning', 
    'move_in_out',
    'airbnb',
    'heavy_duty',
    'post_construction',
    'organizing',
    'office_commercial',
    'custom'
  )),
  
  -- Contact info
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Address
  address TEXT NOT NULL,
  apt_unit TEXT,
  city TEXT NOT NULL,
  state TEXT DEFAULT 'NY',
  zip TEXT NOT NULL,
  
  -- Flat rate properties (Standard/Deep/Move)
  bedrooms INT,
  bathrooms INT,
  sqft INT,
  
  -- Add-ons (JSONB for flexibility)
  add_ons_detailed JSONB DEFAULT '[]'::jsonb,
  
  -- Consultation fields
  property_type TEXT, -- apartment, house, office, retail, medical, other
  offices INT,
  conf_rooms INT,
  space_type TEXT,
  
  -- Service-specific
  urgency TEXT, -- airbnb: standard, urgent, same_day
  construction_type TEXT, -- post_construction: light, moderate, heavy
  severity_level TEXT, -- heavy_duty: light, moderate, severe
  organizing_type TEXT, -- organizing: apartment, house, other
  rooms TEXT[], -- organizing: rooms to organize
  
  -- Hourly/Organizing
  hours_needed INT,
  team_size INT,
  
  -- Scheduling
  frequency TEXT, -- one_time, weekly, bi_weekly, monthly
  preferred_date DATE,
  preferred_time TEXT,
  flexible_schedule BOOLEAN DEFAULT false,
  
  -- Pricing
  estimated_price INT, -- in cents
  estimated_hours DECIMAL(4,2),
  total_time_minutes INT,
  discount_applied INT DEFAULT 0, -- in cents
  
  -- Additional
  special_instructions TEXT,
  own_supplies BOOLEAN DEFAULT false,
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  
  -- UTM tracking
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT
);

-- Indexes for performance
CREATE INDEX idx_bookings_service_type ON bookings(service_type);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX idx_bookings_email ON bookings(email);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_preferred_date ON bookings(preferred_date);

-- RLS Policies
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow public to insert bookings (anonymous users can submit forms)
CREATE POLICY "Allow public insert" 
ON bookings FOR INSERT 
WITH CHECK (true);

-- Allow service role to read all (for admin dashboard)
CREATE POLICY "Allow service role full access" 
ON bookings FOR ALL 
USING (auth.role() = 'service_role');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_bookings_updated_at 
BEFORE UPDATE ON bookings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Bookings table recreated successfully with full schema for all 9 service flows';
END $$;
