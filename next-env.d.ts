# PLAN-rhamon — Feuille de route personnelle

> Lis d'abord `CLAUDE.md` (loi partagée) puis ce plan. Applique le protocole « vérifier avant d'agir » à chaque session.
> GitHub `RhamonK` · branches `feat/rhamon/*` · journal `.claude/journal/rhamon.md`.

## Ma zone de responsabilité
Accueil · À propos NBW · Get Involved · **Dons (Stripe)** · Contact · Newsletter.

## Phase 0 — Fondations (COORDONNÉ avec serge, avant tout le reste)
Ces zones sont `shared`. On les amorce ensemble pour ne pas se bloquer ensuite. Se répartir à l'oral ; par défaut :
- [ ] **Design system** (`tailwind.config.ts`, `app/globals.css`) — tokens de marque NBW (voir `docs/BRAND.md`). *Peut être amorcé par rhamon.*
- [ ] **Layout global** (`app/layout.tsx`, `components/Nav.tsx`, `components/Footer.tsx`, `components/LandAcknowledgment.tsx`) — Nav + Footer + reconnaissance territoire Blackfoot.
- [ ] **Primitives UI** (`components/ui/*` : Button, Card, Input, Section, Container).
- [ ] **Client Supabase** (`lib/supabase.ts`) + schéma initial commun (`docs/DATA-MODEL.md`, `supabase/`).

> Règle fondations : changements **petits + atomiques**, annoncés dans le journal, poussés vite pour libérer.

## Phase 1 — Mes pages (branche par page)

### `feat/rhamon/homepage` — Accueil
- [ ] Hero plein écran (image/vidéo femmes NBW) — « Empowering Black Women. Building Community. Creating Leaders. » + texte support + boutons (About, Programs, Join, Donate, Events).
- [ ] Section « Our Impact » (stats + icônes : Members Connected, Events Hosted, Workshops, Volunteer Hours, Scholarships, Partnerships).
- [ ] Teasers : Programmes, Événements à venir, Témoignages, Sponsors, Newsletter.
- Tables : `testimonials`, `sponsors` (lecture), `newsletter_subscribers` (écriture via composant).

### `feat/rhamon/about` — À propos NBW
- [ ] Our Story, Mission, Vision, Valeurs, Why NBW Exists, Community Impact, Timeline of Growth.
- [ ] Board of Directors + Leadership Team (données `docs/TEAM.md` → table `team_members`).

### `feat/rhamon/get-involved` — Get Involved
- [ ] Volunteer, Become a Mentor, Become a Speaker, Partner With Us, Corporate Sponsorship, Donate, Board Opportunities.
- [ ] Formulaires : bénévole, partenaire, sponsor → `form_submissions`.

### `feat/rhamon/donate` — Dons sécurisés (Stripe)
- [ ] Page don + montants prédéfinis/personnalisé, don unique/récurrent.
- [ ] `app/api/stripe/checkout` (Checkout Session) + `app/api/stripe/webhook` → enregistre dans `donations`.
- [ ] Page succès/annulation. Secrets Stripe en env (jamais commités).

### `feat/rhamon/contact` — Contact
- [ ] Formulaire de contact (General, Partnership, Media, Volunteer) → `app/api/contact` → `form_submissions`.
- [ ] Coordonnées : info.networkofblackwomen@gmail.com · (403) 635-8688 · liens réseaux sociaux.

### `feat/rhamon/newsletter` — Newsletter (transverse)
- [ ] Composant `Newsletter.tsx` (footer + accueil) → `app/api/newsletter` → `newsletter_subscribers` (+ provider email plus tard).

## Critères de fin (par PR) — voir CLAUDE.md §3
lint + tsc OK · responsive · accessibilité AA · journal à jour · PR + review croisée de serge.

## Prochaine action immédiate
1. `git fetch --all --prune`, lire `TEAM-STATUS.md` + journal de serge.
2. Se mettre d'accord avec serge sur qui amorce quelle fondation.
3. Verrouiller dans mon journal, créer `feat/rhamon/<zone>`, coder.
