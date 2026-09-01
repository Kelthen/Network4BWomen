-- Migration 0003 — serge zone: events + registrations.
-- See docs/DATA-MODEL.md. Run in Supabase → SQL Editor (or via the Supabase CLI).
--
-- `events` is PUBLIC CONTENT, read directly by the client (anon key) — see
-- app/(site)/events/page.tsx, events/[slug]/page.tsx, conference/page.tsx.
-- `registrations` contains personal data (name/email/phone) — it is WRITE-ONLY via
-- the service role, same pattern as rhamon's form_submissions. No public select policy.

-- ============================================================
-- events
-- ============================================================
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  category text,
  starts_at timestamptz,
  ends_at timestamptz,
  location text,
  cover_url text,
  is_conference boolean not null default false,
  capacity integer,
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;

create policy "Public can read events"
  on public.events
  for select
  to anon, authenticated
  using (true);

create index if not exists events_starts_at_idx on public.events (starts_at);
create index if not exists events_is_conference_idx on public.events (is_conference);

-- ============================================================
-- registrations
-- ============================================================
create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  name text not null,
  email text not null,
  phone text,
  notes text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table public.registrations enable row level security;
-- No select/insert policy for anon/authenticated: writes go through
-- app/api/registrations (SUPABASE_SERVICE_ROLE_KEY), which bypasses RLS.

create index if not exists registrations_event_id_idx on public.registrations (event_id);

-- ------------------------------------------------------------
-- Seed: a couple of placeholder upcoming events + one conference event so
-- /events, /events/[slug] and /conference have something real to read while
-- NBW provides final dates. Safe to edit/delete via the dashboard anytime.
-- ------------------------------------------------------------
insert into public.events (slug, title, description, category, starts_at, location, is_conference, capacity)
values
  ('fall-networking-mixer', 'Fall Networking Mixer', null, 'Networking', '2026-09-14T18:00:00Z', 'Toronto', false, null),
  ('wellness-self-care-morning', 'Wellness & Self-Care Morning', null, 'Health & Wellness', '2026-10-05T10:00:00Z', 'Toronto', false, null),
  ('leadership-roundtable', 'Leadership Roundtable', null, 'Leadership', '2026-11-23T14:00:00Z', 'Online', false, null),
  ('nbw-annual-conference-2026', 'NBW Annual Conference & Summit', 'NBW''s flagship annual gathering.', 'Annual Conference', '2026-12-05T09:00:00Z', 'Toronto', true, 200)
on conflict (slug) do nothing;
