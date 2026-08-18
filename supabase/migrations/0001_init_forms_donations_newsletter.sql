-- Migration 0001 — rhamon zone: form_submissions, newsletter_subscribers, donations.
-- See docs/DATA-MODEL.md. Run in Supabase → SQL Editor (or via the Supabase CLI).
--
-- Writes to these tables happen ONLY from server API routes using the
-- SERVICE_ROLE key (app/api/contact, app/api/newsletter, app/api/stripe/webhook).
-- The service role bypasses RLS, so we enable RLS with NO public policies:
-- anonymous/public clients cannot read or write these tables. Secure by default.

-- ============================================================
-- form_submissions  (Contact + Get Involved forms)
-- ============================================================
create table if not exists public.form_submissions (
  id          uuid primary key default gen_random_uuid(),
  type        text not null default 'contact',   -- contact|volunteer|mentor|speaker|partner|sponsor|program
  name        text,
  email       text,
  message     text,
  payload     jsonb not null default '{}'::jsonb, -- e.g. { "subject": "partnership" }
  status      text not null default 'new',        -- new|read|archived
  created_at  timestamptz not null default now()
);

alter table public.form_submissions enable row level security;

-- ============================================================
-- newsletter_subscribers
-- ============================================================
create table if not exists public.newsletter_subscribers (
  id            uuid primary key default gen_random_uuid(),
  email         text not null unique,             -- unique: upsert on conflict (email)
  source        text not null default 'site',     -- e.g. home|footer|get-involved
  is_active     boolean not null default true,
  subscribed_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

-- ============================================================
-- donations  (recorded by the Stripe webhook on checkout.session.completed)
-- ============================================================
create table if not exists public.donations (
  id                uuid primary key default gen_random_uuid(),
  stripe_session_id text unique,                  -- idempotency: one row per Checkout session
  amount_cents      integer not null default 0,
  currency          text not null default 'cad',
  donor_name        text,
  donor_email       text,
  recurring         boolean not null default false,
  status            text not null default 'completed',
  created_at        timestamptz not null default now()
);

alter table public.donations enable row level security;

create index if not exists donations_created_at_idx on public.donations (created_at desc);
create index if not exists form_submissions_created_at_idx on public.form_submissions (created_at desc);
