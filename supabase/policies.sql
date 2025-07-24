-- Enable RLS
ALTER TABLE public.trip_details ENABLE ROW LEVEL SECURITY;

-- SELECT Policy
CREATE POLICY "Authenticated users can select their own trip details"
  ON public.trip_details FOR SELECT
  TO authenticated
  USING (auth.uid() = auth_id);

-- INSERT Policy
CREATE POLICY "Authenticated users can insert their own trip details"
  ON public.trip_details FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = auth_id);

-- DELETE Policy
CREATE POLICY "Authenticated users can delete their own trip details"
  ON public.trip_details FOR DELETE
  TO authenticated
  USING (auth.uid() = auth_id);
