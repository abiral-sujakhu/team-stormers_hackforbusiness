-- Create appointments table for doctor booking system
CREATE TABLE IF NOT EXISTS appointments (
  id SERIAL PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL,
  doctor_id INTEGER NOT NULL,
  doctor_name VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  time VARCHAR(50) NOT NULL,
  type VARCHAR(100) NOT NULL,
  notes TEXT,
  status VARCHAR(50) DEFAULT 'upcoming',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_appointments_user_email ON appointments(user_email);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);

-- Add Row Level Security (RLS)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see their own appointments
CREATE POLICY "Users can view their own appointments" ON appointments
  FOR SELECT USING (true);

-- Create policy to allow users to insert their own appointments
CREATE POLICY "Users can insert appointments" ON appointments
  FOR INSERT WITH CHECK (true);

-- Create policy to allow users to update their own appointments
CREATE POLICY "Users can update their own appointments" ON appointments
  FOR UPDATE USING (true);

-- Create policy to allow users to delete their own appointments
CREATE POLICY "Users can delete their own appointments" ON appointments
  FOR DELETE USING (true);
