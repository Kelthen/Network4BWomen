---
dev: rhamon
github: RhamonK
branch: feat/rhamon/donate
current_task: "Dons Stripe (page + checkout + webhook) et Newsletter réelle"
files_locked: []
updated: 2026-08-17T00:00:00Z
---

# Journal — rhamon

> Chronologique, plus récent en HAUT. Je n'écris que dans CE fichier.
> Avant d'agir : `git fetch --all --prune`, lire TEAM-STATUS.md, lire le journal de serge, vérifier OWNERSHIP.yml.
> Mettre à jour l'en-tête YAML (`current_task`, `files_locked`) AVANT de coder, puis commit+push pour publier mon intention.

## 2026-08-17 — Dons Stripe + Newsletter (`feat/rhamon/donate`)
- **Dons** : `app/(site)/donate/page.tsx` (bannières succès/annulation via searchParams) + `components/donate/DonateForm.tsx` (montants prédéfinis/perso, one-time/monthly). API : `app/api/stripe/checkout` (Checkout Session, mode payment/subscription, CAD) + `app/api/stripe/webhook` (vérif signature → insert `donations`). Secrets en env uniquement ; gardes 503 si clés absentes → build OK.
- **Newsletter réelle** : `app/api/newsletter` (upsert `newsletter_subscribers` sur email unique, gardé). Le bloc newsletter de l'accueil poste désormais vraiment (états sending/ok/error).
- Termine (en anglais) la zone rhamon : Accueil, À propos, Get Involved, Contact, **Dons**, **Newsletter**. Reste à activer avec les vraies clés Stripe/Supabase en env (Vercel).
- Validé : `next build` OK (14 routes ; `/donate` + 3 routes API dynamiques). Capture Donate vérifiée.
- **Prochaine étape** : une fois la zone rhamon en ligne, aider serge (Programmes, Événements, Conférence, Ressources, News, Galerie).

## 2026-08-17 — Contact + site en anglais (`feat/rhamon/contact`)
- **Page Contact** : `app/(site)/contact/page.tsx` + `components/contact/ContactForm.tsx` + route API `app/api/contact/route.ts` (POST → table `form_submissions` via client serveur SERVICE_ROLE_KEY ; garde si clés absentes → 503 propre, build OK). Sujets General/Partnership/Media/Volunteer (CONTENT §10), coordonnées, réseaux (à confirmer).
- **Tout le site passé en anglais** (demande client : plus de franglais). Converti les textes visibles de : home (Hero/ImpactStats/CtaBand/NewsletterTeaser/page), about, get-involved, Nav, Footer, LandAcknowledgment, layout (`lang="en"`), et les 7 pages placeholder (dont zone serge — simple traduction de copie, aucune logique touchée). Commentaires de code laissés en FR (non visibles).
- Validé : `next build` OK (14 routes, `/api/contact` dynamique). Vérifié au rendu (captures Home + Contact).
- ⚠️ Touche des fichiers `shared`/placeholder de serge pour la traduction — justifié par la directive site-wide du client ; serge n'a rien de verrouillé.

## 2026-08-17 — Remise en ordre de la structure (`chore/rhamon/repo-structure`)
- **Constat** : `main` était aplati/corrompu (fichiers dumpés à la racine, contenus ne correspondant pas aux noms — ex. `package.json`/`tsconfig.json` contenaient du JSX). Le projet ne pouvait pas builder.
- **Action** : restauration de l'arborescence Next.js canonique (starter à jour) — `app/`, `components/`, `lib/`, `docs/`, `supabase/`, `scripts/`, `.github/`, `.claude/`, configs à la racine — et intégration de la page d'accueil (`app/(site)/page.tsx` + `components/home/**`).
- **Validation** : `tsc --noEmit` OK · `next build` OK (route `/` prérendue en statique).
- Cette PR consolide aussi les docs à jour (équiv. `chore/rhamon/docs`) et la homepage (équiv. `feat/rhamon/homepage`), qui deviennent redondantes une fois celle-ci mergée.

## 2026-08-17 — Accueil (`feat/rhamon/homepage`)
- **Protocole d'ouverture appliqué** : `git fetch` OK · TEAM-STATUS.md lu · journal de serge lu (aucune tâche en cours, rien de verrouillé) · OWNERSHIP.yml vérifié → `homepage` = rhamon/todo, pas de conflit.
- **Implémenté `app/(site)/page.tsx`** selon `PLAN-rhamon.md` (Phase 1 · Accueil), le contenu de `docs/CONTENT.md` §1 et le design de `docs/nbw-home-reference.html`.
- Sections livrées : Hero éditorial (révélation par masque + parallaxe du visuel), bande **Our Impact** (compteurs animés, fond brun), teasers **Programmes** (3 cartes arrondies, hover élévation), **Témoignage** pleine largeur, teaser **Newsletter**, et le **bandeau signature avant footer** (« Every Black Woman Deserves To Be Celebrated. » — révélation moderne de la photo).
- Choix technique : animations **sans dépendance** (CSS Module + `IntersectionObserver`), `prefers-reduced-motion` respecté. Textes hero/tagline en **verbatim** (CONTENT §0).
- Prochaine étape : brancher la vraie Newsletter et les données Supabase (`testimonials`, `sponsors`, `events`), puis attaquer la page À propos.
