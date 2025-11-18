-- ============================================
-- SUPABASE SCHEMA UPDATE FOR NEW BOOKING FLOW
-- ============================================
-- Run this to update existing bookings table

-- Add new columns for enhanced booking flow
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS property_size_id TEXT,
  ADD COLUMN IF NOT EXISTS is_custom_quote BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS hours_requested INTEGER,
  ADD COLUMN IF NOT EXISTS team_size INTEGER DEFAULT 1,
  ADD COLUMN IF NOT EXISTS consultation_details JSONB,
  ADD COLUMN IF NOT EXISTS is_flexible BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS contact_method TEXT CHECK (contact_method IN ('call', 'text', 'email')),
  ADD COLUMN IF NOT EXISTS parking_info TEXT,
  ADD COLUMN IF NOT EXISTS access_instructions TEXT,
  ADD COLUMN IF NOT EXISTS has_pets BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS pet_details TEXT,
  ADD COLUMN IF NOT EXISTS user_agent TEXT,
  ADD COLUMN IF NOT EXISTS referrer_url TEXT;

-- Update service_type constraint to include all 9 service types
ALTER TABLE bookings
  DROP CONSTRAINT IF EXISTS bookings_service_type_check;

ALTER TABLE bookings
  ADD CONSTRAINT bookings_service_type_check
  CHECK (service_type IN (
    'standard_cleaning',
    'deep_cleaning', 
    'move_in_out_cleaning',
    'organizing_service',
    'custom_service',
    'office_cleaning',
    'heavy_duty_cleaning',
    'airbnb_turnover',
    'post_construction'
  ));

-- Add index for property_size_id lookups
CREATE INDEX IF NOT EXISTS idx_bookings_property_size_id 
  ON bookings(property_size_id);

-- Create pricing_snapshots table if not exists
CREATE TABLE IF NOT EXISTS pricing_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id BIGINT REFERENCES bookings(id) ON DELETE CASCADE,
  service_id TEXT NOT NULL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  base_price NUMERIC(10, 2),
  addons JSONB,
  total_price NUMERIC(10, 2),
  pricing_version TEXT,
  snapshot_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pricing_snapshots_booking_id 
  ON pricing_snapshots(booking_id);

-- Update RLS policies
DROP POLICY IF EXISTS "Allow public inserts" ON bookings;
CREATE POLICY "Allow public inserts" ON bookings
  FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow read own bookings" ON bookings;
CREATE POLICY "Allow read own bookings" ON bookings
  FOR SELECT
  USING (true); -- Temporarily allow all reads for v0 preview

-- Grant permissions
GRANT SELECT, INSERT ON bookings TO anon;
GRANT SELECT ON pricing_snapshots TO anon;

-- Add comments
COMMENT ON COLUMN bookings.property_size_id IS 'Mapped size ID like 2br_2ba for flat rate lookup';
COMMENT ON COLUMN bookings.is_custom_quote IS 'TRUE for consultation services requiring manual quote';
COMMENT ON COLUMN bookings.consultation_details IS 'JSONB for service-specific fields (Airbnb URL, sqft, etc)';
COMMENT ON COLUMN bookings.hours_requested IS 'For hourly services (custom/organizing)';
COMMENT ON COLUMN bookings.team_size IS 'Number of cleaners for hourly services';
