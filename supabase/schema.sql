CREATE TABLE public.trip_details (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  auth_id UUID NOT NULL DEFAULT auth.uid(),
  destination TEXT NOT NULL,
  days BIGINT NOT NULL,
  start_date DATE,
  end_date DATE,
  accommodation public.accommodation NOT NULL,
  budget public.budget NOT NULL,
  partner public.partner NOT NULL,
  itinerary JSONB NOT NULL,
  accommodation_options JSONB,
  photo_url TEXT,
  CONSTRAINT trip_details_auth_id_fkey FOREIGN KEY (auth_id) REFERENCES auth.users (id) ON UPDATE CASCADE ON DELETE CASCADE
);