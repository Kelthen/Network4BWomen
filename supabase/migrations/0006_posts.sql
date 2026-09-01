-- Migration 0006 — serge zone: posts (News & Stories blog).
-- See docs/DATA-MODEL.md. Run in Supabase → SQL Editor.
--
-- PUBLIC CONTENT, but only published rows — see app/(site)/news/page.tsx
-- (.eq("is_published", true)). Drafts (is_published = false) stay invisible to anon.

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  body text,
  category text,
  cover_url text,
  author text,
  published_at timestamptz,
  is_published boolean not null default false
);

alter table public.posts enable row level security;

create policy "Public can read published posts"
  on public.posts
  for select
  to anon, authenticated
  using (is_published = true);

create index if not exists posts_published_at_idx on public.posts (published_at);

-- ------------------------------------------------------------
-- Seed: 3 placeholder posts matching the page's current fallback content.
-- ------------------------------------------------------------
insert into public.posts (slug, title, excerpt, category, author, published_at, is_published)
values
  ('celebrating-wins', 'Celebrating our members'' wins',
   'Stories of growth, leadership, and community from across the network.',
   'Success Stories', 'NBW Team', now(), true),
  ('small-habits', 'Small habits, big change',
   'Practical, culturally-aware ideas for looking after your wellbeing.',
   'Wellness Tips', 'NBW Team', now(), true),
  ('looking-back', 'Looking back on our gatherings',
   'Highlights and moments from recent NBW events.',
   'Event Recaps', 'NBW Team', now(), true)
on conflict (slug) do nothing;
