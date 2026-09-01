-- Migration 0005 — serge zone: resources.
-- See docs/DATA-MODEL.md. Run in Supabase → SQL Editor.
--
-- PUBLIC CONTENT — see app/(site)/resources/page.tsx (reads all rows ordered by
-- sort_order; no is_active flag in the code, so no filter on select).

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  title text not null,
  description text,
  url text,
  file_url text,
  sort_order integer not null default 0
);

alter table public.resources enable row level security;

create policy "Public can read resources"
  on public.resources
  for select
  to anon, authenticated
  using (true);

create index if not exists resources_sort_order_idx on public.resources (sort_order);

-- ------------------------------------------------------------
-- Seed: the 7 canonical resource categories (docs/CONTENT.md §7), matching the
-- fallback list already in the page component.
-- ------------------------------------------------------------
insert into public.resources (title, description, category, sort_order)
values
  ('Career', 'Job boards, résumé help, and interview preparation.', 'Career', 1),
  ('Scholarships', 'Funding opportunities for members and youth.', 'Scholarships', 2),
  ('Mental Health', 'Culturally-aware wellness and counselling resources.', 'Mental Health', 3),
  ('Business Directory', 'Discover and support Black-owned businesses.', 'Business Directory', 4),
  ('Professional Development Tools', 'Courses, templates, and skill-building.', 'Professional Development', 5),
  ('Community Resources', 'Local services and support networks.', 'Community', 6),
  ('Templates & Guides', 'Practical downloads to help you move forward.', 'Templates', 7)
on conflict do nothing;
