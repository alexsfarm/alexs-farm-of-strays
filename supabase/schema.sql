-- ============================================================================
-- Alex's Farm of Strays — database setup
-- ----------------------------------------------------------------------------
-- HOW TO USE (one time):
--   1. In your Supabase project, open  SQL Editor  ->  New query
--   2. Paste this whole file in
--   3. Press  Run
-- That's it — it creates the two tables the website uses.
-- ============================================================================

create extension if not exists "pgcrypto";

-- Animals looking for a home -------------------------------------------------
create table if not exists public.animals (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  species     text not null,                       -- Dog, Cat, Rabbit, Bird, Other …
  photo_url   text,
  blurb       text,
  details     jsonb default '[]'::jsonb,           -- optional bullet points
  status      text not null default 'available',   -- 'available', 'rehomed' or 'hidden'
  sort        int  not null default 0,             -- lower numbers show first
  created_at  timestamptz not null default now()
);

-- Paphos Paws Park bookings --------------------------------------------------
create table if not exists public.park_bookings (
  id                 uuid primary key default gen_random_uuid(),
  date               date not null,
  slot               text not null,
  dogs               int  not null default 1,
  name               text,
  phone              text,
  email              text,
  amount             numeric,
  currency           text default 'eur',
  stripe_session_id  text unique,
  status             text not null default 'confirmed',
  created_at         timestamptz not null default now(),
  unique (date, slot)               -- one private booking per slot
);

-- Row Level Security ---------------------------------------------------------
alter table public.animals       enable row level security;
alter table public.park_bookings enable row level security;

-- Anyone may read VISIBLE animals (available + rehomed). Set status to 'hidden'
-- to take one off the public website.
drop policy if exists "public read available animals" on public.animals;
drop policy if exists "public read visible animals" on public.animals;
create policy "public read visible animals"
  on public.animals for select
  using (status <> 'hidden');

-- Bookings contain personal details, so there are deliberately NO public
-- policies. The website only ever reads/writes bookings through the server-side
-- Netlify Functions using the service key, which bypasses RLS.
