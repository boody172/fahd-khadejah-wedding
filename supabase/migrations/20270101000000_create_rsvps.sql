CREATE TABLE public.rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  guest_count integer NOT NULL CHECK (guest_count BETWEEN 1 AND 20),
  attending boolean NOT NULL,
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert RSVPs"
  ON public.rsvps FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read RSVP counts"
  ON public.rsvps FOR SELECT
  TO anon, authenticated
  USING (true);
