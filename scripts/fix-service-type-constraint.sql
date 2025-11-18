-- Drop old constraint if exists
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_service_type_check;

-- Add new constraint with all 9 service types
ALTER TABLE bookings ADD CONSTRAINT bookings_service_type_check 
CHECK (service_type IN (
  'standard_cleaning',
  'deep_cleaning', 
  'move_in_out',
  'airbnb_turnover',
  'post_construction',
  'office_cleaning',
  'organizing_decluttering',
  'heavy_duty',
  'custom_quote'
));

-- Add new columns if they don't exist
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS add_ons_detailed JSONB,
ADD COLUMN IF NOT EXISTS total_time_minutes INTEGER,
ADD COLUMN IF NOT EXISTS discount_applied INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS bundle_selected TEXT,
ADD COLUMN IF NOT EXISTS own_supplies BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS flexible_scheduling BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS property_type TEXT,
ADD COLUMN IF NOT EXISTS service_category TEXT CHECK (service_category IN ('flat_rate', 'hourly', 'consultation'));
