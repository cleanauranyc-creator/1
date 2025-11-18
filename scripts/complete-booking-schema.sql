-- ============================================
-- COMPLETE BOOKING SCHEMA FOR ALL 9 SERVICES
-- Phase 2A: Add all missing fields for consultation services
-- ============================================

-- Add consultation-specific fields
ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS offices INT,
ADD COLUMN IF NOT EXISTS conf_rooms INT,
ADD COLUMN IF NOT EXISTS space_type TEXT,
ADD COLUMN IF NOT EXISTS urgency TEXT,
ADD COLUMN IF NOT EXISTS construction_type TEXT,
ADD COLUMN IF NOT EXISTS severity_level TEXT,
ADD COLUMN IF NOT EXISTS organizing_type TEXT,
ADD COLUMN IF NOT EXISTS rooms INT,
ADD COLUMN IF NOT EXISTS hours_requested INT,
ADD COLUMN IF NOT EXISTS team_size INT,
ADD COLUMN IF NOT EXISTS preferred_date DATE,
ADD COLUMN IF NOT EXISTS preferred_time TEXT,
ADD COLUMN IF NOT EXISTS contact_method TEXT DEFAULT 'email',
ADD COLUMN IF NOT EXISTS has_pets BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS pet_details TEXT,
ADD COLUMN IF NOT EXISTS parking_info TEXT,
ADD COLUMN IF NOT EXISTS access_instructions TEXT,
ADD COLUMN IF NOT EXISTS apt_unit TEXT,
ADD COLUMN IF NOT EXISTS city TEXT DEFAULT 'New York',
ADD COLUMN IF NOT EXISTS state TEXT DEFAULT 'NY',
ADD COLUMN IF NOT EXISTS zip_code TEXT;

-- Update service_type constraint to include all 9 services
DO $$ BEGIN
  ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_service_type_check;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

ALTER TABLE bookings
ADD CONSTRAINT bookings_service_type_check 
CHECK (service_type IN (
  'standard',
  'deep', 
  'move',
  'construction',
  'heavy',
  'airbnb',
  'custom',
  'organizing',
  'commercial'
));

-- Create index for faster service_type queries
CREATE INDEX IF NOT EXISTS idx_bookings_service_type ON bookings(service_type);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);

-- Add RLS policy for public inserts (booking form submissions)
DROP POLICY IF EXISTS "Allow public booking submissions" ON bookings;
CREATE POLICY "Allow public booking submissions"
ON bookings FOR INSERT
WITH CHECK (true);

-- Add RLS policy for authenticated reads (admin dashboard)
DROP POLICY IF EXISTS "Allow authenticated reads" ON bookings;
CREATE POLICY "Allow authenticated reads"
ON bookings FOR SELECT
USING (auth.role() = 'authenticated');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON bookings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE bookings IS 'Customer booking submissions from website calculator';
COMMENT ON COLUMN bookings.service_type IS 'One of: standard, deep, move, construction, heavy, airbnb, custom, organizing, commercial';
COMMENT ON COLUMN bookings.add_ons_detailed IS 'JSONB array of selected add-ons with quantities: [{ id, name, price, quantity }]';
COMMENT ON COLUMN bookings.estimated_price IS 'Calculated total price in cents (multiply display price by 100)';
COMMENT ON COLUMN bookings.property_type IS 'For flat rate: apartment/house. For organizing: apartment/house/other';
COMMENT ON COLUMN bookings.space_type IS 'For commercial: office_space, retail_store, medical_facility, other_commercial';
COMMENT ON COLUMN bookings.frequency IS 'Service frequency: one-time, weekly, bi-weekly, monthly';
