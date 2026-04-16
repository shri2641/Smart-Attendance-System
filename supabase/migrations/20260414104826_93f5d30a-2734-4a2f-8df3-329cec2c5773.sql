
-- Create students table
CREATE TABLE public.students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  roll_no TEXT NOT NULL,
  class_section TEXT NOT NULL,
  nfc_card_id TEXT UNIQUE,
  photo_url TEXT,
  parent_name TEXT,
  parent_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create attendance_logs table
CREATE TABLE public.attendance_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  tap_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'present' CHECK (status IN ('present', 'late', 'absent')),
  method TEXT NOT NULL DEFAULT 'nfc' CHECK (method IN ('nfc', 'manual', 'simulation')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unique constraint: one attendance per student per day
ALTER TABLE public.attendance_logs ADD CONSTRAINT unique_student_date UNIQUE (student_id, date);

-- Create indexes
CREATE INDEX idx_attendance_date ON public.attendance_logs(date);
CREATE INDEX idx_attendance_student ON public.attendance_logs(student_id);
CREATE INDEX idx_students_nfc ON public.students(nfc_card_id);
CREATE INDEX idx_students_class ON public.students(class_section);

-- Enable RLS
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_logs ENABLE ROW LEVEL SECURITY;

-- RLS policies for students: public read, authenticated write
CREATE POLICY "Anyone can view students" ON public.students FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert students" ON public.students FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can update students" ON public.students FOR UPDATE USING (true);

-- RLS policies for attendance_logs: public read/write (NFC taps work without login)
CREATE POLICY "Anyone can view attendance logs" ON public.attendance_logs FOR SELECT USING (true);
CREATE POLICY "Anyone can create attendance logs" ON public.attendance_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update attendance logs" ON public.attendance_logs FOR UPDATE USING (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON public.students
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
