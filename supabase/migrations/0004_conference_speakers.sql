-- Migration 0004 — serge zone: conference_speakers.
-- See docs/DATA-MODEL.md. Run AFTER 0003_events_registrations.sql (fk to events).
--
-- PUBLIC CONTENT, read directly by the client — see app/(site)/conference/page.tsx
-- (getSpeakers(): finds the latest event where is_conference = true, then reads its
-- speakers ordered by sort_order).

create table if not exists public.conference_speakers (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  name text not null,
  title text,
  org text,
  bio text,
  photo_url text,
  is_keynote boolean not null default false,
  sort_order integer not null default 0
);

alter table public.conference_speakers enable row level security;

create policy "Public can read conference speakers"
  on public.conference_speakers
  for select
  to anon, authenticated
  using (true);

create index if not exists conference_speakers_event_id_idx on public.conference_speakers (event_id);

-- ------------------------------------------------------------
-- Seed: placeholder keynote for the 2026 conference event seeded in 0003.
-- ------------------------------------------------------------
insert into public.conference_speakers (event_id, name, title, org, is_keynote, sort_order)
select id, 'To be announced', 'Keynote', null, true, 1
from public.events
where slug = 'nbw-annual-conference-2026'
on conflict do nothing;
