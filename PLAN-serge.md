# PLAN-serge — Feuille de route personnelle

> Lis d'abord `CLAUDE.md` (loi partagée) puis ce plan. Applique le protocole « vérifier avant d'agir » à chaque session.
> GitHub `sergesanou` · branches `feat/serge/*` · journal `.claude/journal/serge.md`.

## Ma zone de responsabilité
Programmes · Événements (+ **inscriptions**) · Conférence · Ressources · News/Blog · Galerie photo · Recherche.

## Phase 0 — Fondations (COORDONNÉ avec rhamon, avant tout le reste)
Ces zones sont `shared`. On les amorce ensemble pour ne pas se bloquer ensuite. Se répartir à l'oral ; suggestion :
- [ ] **Primitives UI** & **schéma Supabase** peuvent être amorcés par serge pendant que rhamon fait design system + layout — **à confirmer entre vous via les journaux avant de commencer**.
- [ ] Ne jamais démarrer une fondation sans l'avoir annoncée dans `.claude/journal/serge.md` et vérifié que rhamon n'y est pas (`TEAM-STATUS.md`).

> Règle fondations : changements **petits + atomiques**, annoncés dans le journal, poussés vite pour libérer.

## Phase 1 — Mes pages (branche par page)

### `feat/serge/programs` — Programmes & Initiatives
- [ ] Grille de programmes : Professional Development, Leadership, Mentorship, Community Events, Health & Wellness, Youth Programming, Annual Conference.
- [ ] Chaque programme : purpose, who it serves, outcomes, photos, testimonials, bouton d'inscription.
- Tables : `programs` (lecture), `form_submissions` (inscriptions programme).

### `feat/serge/events` — Événements (+ inscriptions)
- [ ] Upcoming Events, Past Events Gallery, Annual Conference, Annual Retreat, Networking, Community Gatherings, Sports & Wellness.
- [ ] Vue calendrier + inscription en ligne → `app/api/registrations` → `registrations`.
- Tables : `events`, `registrations`.

### `feat/serge/conference` — Conférence annuelle (landing dédiée)
- [ ] Overview, itinéraire, hébergement (accommodations), keynote speakers, FAQs, pricing, registration.
- Tables : `conference_speakers`, `events` (l'événement conférence), `registrations`.

### `feat/serge/resources` — Ressources
- [ ] Career Resources, Scholarships, Mental Health, Business Directory, Professional Development Tools, Community Resources, Templates & Guides.
- Table : `resources`.

### `feat/serge/news` — News & Stories (blog)
- [ ] Success Stories, Community News, Leadership Articles, Wellness Tips, Event Recaps, Announcements.
- [ ] Liste + page article. Table : `posts`.

### `feat/serge/gallery` — Galerie photo
- [ ] Photographie d'événements organisée par année et par événement.
- Table : `gallery_media` (Supabase Storage pour les fichiers).

### `feat/serge/search` — Recherche (phase ultérieure)
- [ ] Recherche site (pages, programmes, ressources, articles). À planifier après les pages de contenu.

## Critères de fin (par PR) — voir CLAUDE.md §3
lint + tsc OK · responsive · accessibilité AA · journal à jour · PR + review croisée de rhamon.

## Prochaine action immédiate
1. `git clone` du repo, lire `CLAUDE.md` **en entier**.
2. `git fetch --all --prune`, lire `TEAM-STATUS.md` + journal de rhamon.
3. Se mettre d'accord avec rhamon sur les fondations, verrouiller dans mon journal, créer `feat/serge/<zone>`, coder.
