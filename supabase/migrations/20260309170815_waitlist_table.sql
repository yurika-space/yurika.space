CREATE TABLE waitlist (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  user_type TEXT NOT NULL CHECK (user_type IN ('founder', 'investor')),
  created_at TIMESTAMPTZ DEFAULT now()
);
