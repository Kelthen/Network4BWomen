# DATA-MODEL.md — Schéma Supabase

> ✅ **La base Supabase est DÉJÀ CRÉÉE.** Le code lit/écrit ces tables directement. Avant de coder une lecture, vérifier les noms exacts des colonnes dans Supabase (elles priment sur ce doc en cas d'écart) et regénérer les types si besoin (`supabase gen types typescript`). Toute évolution du schéma = **migration nommée** dans `supabase/migrations/` (ex. `20260817_events.sql`), jamais de modif manuelle non versionnée.

Activer **RLS** sur toutes les tables ; les écritures publiques (formulaires, webhook Stripe) passent par des **routes API serveur** avec la clé service, jamais par le client. Lecture publique uniquement sur le contenu publié (`is_active`/`is_published`).

## Tables

### `team_members` [rhamon – about]
`id, name, role, bio, photo_url, sort_order, is_board (bool), created_at`

### `testimonials` [rhamon – home]
`id, quote, author_name, author_context, photo_url, is_featured, created_at`

### `sponsors` [rhamon – home]
`id, name, logo_url, url, tier, sort_order`

### `newsletter_subscribers` [rhamon]
`id, email (unique), source, subscribed_at, is_active, confirmation_token, token_expires_at, confirmed_at, manage_token, unsubscribed_at`

**Double opt-in + CASL** (migration `0009`) :
- `confirmation_token` : généré à l'inscription, valide `token_expires_at` (48h), consommé au `GET /api/newsletter/confirm`.
- `confirmed_at` : timestamp de confirmation (clic sur le lien de l'email).
- `manage_token` : token permanent généré à la confirmation, utilisé par `GET /api/newsletter/unsubscribe`.
- `unsubscribed_at` : le rang est conservé (audit CASL) — `is_active` passe à `false`.
- Notif à `NEWSLETTER_NOTIFY_TO` (ou `CONTACT_EMAIL` par défaut) uniquement à la **confirmation**, pas à l'inscription.

### `donations` [rhamon – Stripe webhook]
`id, stripe_session_id, amount_cents, currency, donor_name, donor_email, recurring (bool), status, created_at`

### `form_submissions` [rhamon – contact/get-involved]
`id, type (contact|volunteer|mentor|speaker|partner|sponsor|program), payload (jsonb), name, email, message, status, created_at`

### `programs` [serge]
`id, slug, title, purpose, who_it_serves, outcomes (text[]), photos (text[]), sort_order, is_active`

### `events` [serge]
`id, slug, title, description, category, starts_at, ends_at, location, cover_url, is_conference (bool), capacity, registration_url, speakers (jsonb), agenda (jsonb), created_at`

- `registration_url` : lien externe vers la billetterie (Bloomtickets, Eventbrite…). Si présent, le CTA « Register » de la page détail pointe dessus et le formulaire interne (registrations) est masqué.
- `speakers` : `jsonb` array de `{ name, role?, bio?, photo_url? }`.
- `agenda` : `jsonb` array de `{ time, item }`.

### `registrations` [serge]
`id, event_id (fk events), name, email, phone, notes, status, created_at`

### `conference_speakers` [serge]
`id, event_id (fk events), name, title, org, bio, photo_url, is_keynote, sort_order`

### `resources` [serge]
`id, category, title, description, url, file_url, sort_order`

### `posts` [serge – blog]
`id, slug, title, excerpt, body (markdown), category, cover_url, author, published_at, is_published`

### `gallery_media` [serge]
`id, year, event_name, image_url, caption, sort_order` (fichiers dans Supabase Storage bucket `gallery`)

## Conventions
- `snake_case` pour colonnes, pluriel pour tables.
- Clés étrangères explicites, `on delete` réfléchi.
- RLS : lecture publique sur contenu publié (`is_active`/`is_published`), écriture via API serveur uniquement.
- Storage buckets : `gallery`, `team`, `programs`, `events`.
