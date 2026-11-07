-- ============================================================
-- Moneyball '26 — Supabase Users Table
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password text NOT NULL,
  role text NOT NULL DEFAULT 'team',   -- 'admin' or 'team'
  team_id text,                         -- e.g. 'team-barcelona'
  team_name text,
  color text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow server (service role key) full access — no public access
-- (If you need anon reads, add a policy here)

-- ============================================================
-- Seed Data — 1 Admin + 10 Teams
-- ============================================================

INSERT INTO users (username, password, role, team_id, team_name, color) VALUES
  ('admin',      'admin123',    'admin', null,              null,                null),
  ('barcelona',  'password123', 'team',  'team-barcelona',  'FC Barcelona',      '#004D98'),
  ('realmadrid', 'password123', 'team',  'team-realmadrid', 'Real Madrid',       '#EE8700'),
  ('mancity',    'password123', 'team',  'team-mancity',    'Manchester City',   '#6CABDD'),
  ('liverpool',  'password123', 'team',  'team-liverpool',  'Liverpool',         '#C8102E'),
  ('chelsea',    'password123', 'team',  'team-chelsea',    'Chelsea',           '#034694'),
  ('intermilan', 'password123', 'team',  'team-intermilan', 'Inter Milan',       '#0066B2'),
  ('acmilan',    'password123', 'team',  'team-acmilan',    'AC Milan',          '#FB090B'),
  ('juventus',   'password123', 'team',  'team-juventus',   'Juventus',          '#000000'),
  ('alnassr',    'password123', 'team',  'team-alnassr',    'Al-Nassr',          '#FFD600'),
  ('intermiami', 'password123', 'team',  'team-intermiami', 'Inter Miami',       '#F7B5CD'),
  ('projector',  'projector123', 'projector', null,         'Projector Screen',  '#B6FF3B')
ON CONFLICT (username) DO NOTHING;
