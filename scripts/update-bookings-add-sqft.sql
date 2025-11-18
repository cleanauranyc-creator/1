-- Add square_feet column to bookings table
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS square_feet INTEGER;

-- Add index for square_feet queries
CREATE INDEX IF NOT EXISTS idx_bookings_sqft ON bookings(square_feet);
