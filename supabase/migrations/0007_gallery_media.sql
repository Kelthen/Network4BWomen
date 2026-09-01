-- Migration 0007 — serge zone: gallery_media.
-- See docs/DATA-MODEL.md. Run in Supabase → SQL Editor.
--
-- PUBLIC CONTENT — see app/(site)/gallery/page.tsx (groups rows by `year`, which the
-- code treats as a NUMBER (Map<number, ...>), not text — kept as integer here to match.
-- Files themselves belong in the Supabase Storage bucket `gallery` (docs/DATA-MODEL.md);
-- `image_url` just stores the public URL to that file.

create table if not exists public.gallery_media (
  id uuid primary key default gen_random_uuid(),
  year integer not null,
  event_name text not null,
  image_url text not null,
  caption text,
  sort_order integer not null default 0
);

alter table public.gallery_media enable row level security;

create policy "Public can read gallery media"
  on public.gallery_media
  for select
  to anon, authenticated
  using (true);

create index if not exists gallery_media_year_idx on public.gallery_media (year);

-- No seed here on purpose: the page already has a clean local-image fallback
-- (2025 album with 4 static /images/gallery/*.jpg). Populate this table once real
-- event photos are uploaded to the `gallery` Storage bucket.
