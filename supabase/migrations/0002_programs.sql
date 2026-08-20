-- Migration 0002 — serge zone: programs.
-- See docs/DATA-MODEL.md. Run in Supabase → SQL Editor (or via the Supabase CLI).
--
-- Unlike rhamon's zone-1 tables (form_submissions/newsletter/donations, write-only via
-- service role), `programs` is PUBLIC CONTENT: the site reads it directly with the anon
-- key (app/(site)/programs/page.tsx). RLS therefore allows public SELECT on active rows
-- only; there is no public INSERT/UPDATE/DELETE policy — content changes go through the
-- Supabase dashboard/service role, never the client.

-- ============================================================
-- programs
-- ============================================================
create table if not exists public.programs (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  purpose       text not null default '',
  who_it_serves text not null default '',
  outcomes      text[] not null default '{}',
  photos        text[] not null default '{}',
  sort_order    integer not null default 0,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now()
);

alter table public.programs enable row level security;

create policy "Public can read active programs"
  on public.programs
  for select
  to anon, authenticated
  using (is_active = true);

create index if not exists programs_sort_order_idx on public.programs (sort_order);

-- ------------------------------------------------------------
-- Seed: NBW's 7 canonical programs (docs/CONTENT.md §3).
-- purpose/who_it_serves are placeholder copy pending final text from NBW — update in
-- place via the Supabase dashboard once provided, no code change needed.
-- ------------------------------------------------------------
insert into public.programs (slug, title, purpose, who_it_serves, outcomes, sort_order)
values
  ('professional-development', 'Professional Development',
   'Workshops, tools, and skill-building to help members grow their careers.',
   'Working professionals & career changers',
   '{}', 1),
  ('leadership-development', 'Leadership Development',
   'Programs that shape the next generation of confident, capable leaders.',
   'Emerging & established leaders',
   '{}', 2),
  ('mentorship', 'Mentorship',
   'One-to-one and group mentoring that connects experience with ambition.',
   'Mentees & mentors',
   '{}', 3),
  ('community-events', 'Community Events',
   'Gatherings that build connection, belonging, and sisterhood.',
   'The whole community',
   '{}', 4),
  ('health-wellness', 'Health & Wellness',
   'Caring for mind and body — because wellbeing is foundational.',
   'Members & families',
   '{}', 5),
  ('youth-programming', 'Youth Programming',
   'Mentorship, skills, and celebration for Black girls and young women.',
   'Youth & young adults',
   '{}', 6),
  ('annual-conference-summit', 'Annual Conference & Summit',
   'A flagship gathering of speakers, workshops, and community.',
   'Everyone — members & allies',
   '{}', 7)
on conflict (slug) do nothing;
