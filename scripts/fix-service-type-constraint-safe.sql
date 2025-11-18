-- Step 1: Update existing rows with old service_type values to new format
UPDATE bookings 
SET service_type = CASE 
  WHEN service_type = 'regular' THEN 'standard_cleaning'
  WHEN service_type = 'deep' THEN 'deep_cleaning'
  WHEN service_type = 'move' THEN 'move_in_out'
  WHEN service_type = 'airbnb' THEN 'airbnb_turnover'
  WHEN service_type = 'construction' THEN 'post_construction'
  WHEN service_type = 'office' THEN 'office_cleaning'
  WHEN service_type = 'organizing' THEN 'organizing_decluttering'
  WHEN service_type = 'heavy' THEN 'heavy_duty'
  WHEN service_type = 'custom' THEN 'custom_quote'
  ELSE service_type
END
WHERE service_type NOT IN (
  'standard_cleaning',
  'deep_cleaning', 
  'move_in_out',
  'airbnb_turnover',
  'post_construction',
  'office_cleaning',
  'organizing_decluttering',
  'heavy_duty',
  'custom_quote'
);

-- Step 2: Drop old constraint if exists
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_service_type_check;

-- Step 3: Add new constraint with all 9 service types
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

-- Step 4: Add new columns if they don't exist
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS add_ons_detailed JSONB,
ADD COLUMN IF NOT EXISTS total_time_minutes INTEGER,
ADD COLUMN IF NOT EXISTS discount_applied INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS bundle_selected TEXT,
ADD COLUMN IF NOT EXISTS own_supplies BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS flexible_scheduling BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS property_type TEXT,
ADD COLUMN IF NOT EXISTS service_category TEXT CHECK (service_category IN ('flat_rate', 'hourly', 'consultation'));
