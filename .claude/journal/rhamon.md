---
dev: rhamon
github: RhamonK
branch: feat/rhamon/a11y-contrast
current_task: "Audit accessibilité (axe) + correction contrastes AA"
files_locked: []
updated: 2026-08-17T00:00:00Z
---

# Journal — rhamon

> Chronologique, plus récent en HAUT. Je n'écris que dans CE fichier.
> Avant d'agir : `git fetch --all --prune`, lire TEAM-STATUS.md, lire le journal de serge, vérifier OWNERSHIP.yml.
> Mettre à jour l'en-tête YAML (`current_task`, `files_locked`) AVANT de coder, puis commit+push pour publier mon intention.

## 2026-08-18 — Accessibilité : audit axe + contrastes AA (`feat/rhamon/a11y-contrast`)
- **Audit automatisé axe-core** (WCAG A/AA) sur les 12 pages : seule violation = **color-contrast** (le reste conforme). C'est exactement le risque signalé dans `docs/BRAND.md` (rose/or en petit texte sur fond clair).
- **Corrigé** : ajout de tokens accessibles `brand.goldText #8a6d1f` (eyebrows) et `brand.rose #b23a4e` (liens/texte), remplacement des `text-brand-gold`/`text-brand-pink` (texte) et du `em` rose du hero + `.more` des cartes ; remontée des opacités de texte brun (`/70,/60,/50,/40` → `/80,/75`) et `.card p` .7 → .82. Le rose vif reste réservé aux **fonds de boutons** (texte foncé dessus = OK).
- Vérifié par calcul WCAG : goldText 4.59/4.90, rose 5.45/5.82, brown/80 6.24, brown .82 6.97 — tous ≥ 4.5 (AA). Anciennes valeurs : pink 2.31, gold 2.25 (échec).
- Validé : `next build` OK.

## 2026-08-18 — Câblage des images (`feat/rhamon/images`)
- Helper `lib/media.ts` (`coverImage(src, gradient)` : photo par-dessus, **dégradé de marque en secours auto** → jamais d'image cassée ; `slugify`).
- Emplacements câblés : hero, bandeau CTA, 3 cartes accueil, équipe (9, par slug), programmes (7), galerie (2×8), news (3), conférence (4 speakers). Captions FR placeholder retirées du CSS.
- `public/images/README.md` = liste exacte des noms de fichiers à déposer (avec ratios) + `.gitkeep` par dossier.
- Résultat : l'humain dépose `public/images/…/nom.jpg` (bon nom) → la photo apparaît, sans toucher au code.
- Validé : `next build` OK (19 routes).

## 2026-08-17 — Cookies (RGPD) + Analytics conditionné (`feat/rhamon/cookies`)
- **Bandeau de consentement** (`components/CookieConsent.tsx`, `lib/consent.ts`) : Accept/Decline, stocké en localStorage, réouvrable via « Cookie preferences » (footer).
- **Google Analytics conditionné** (`components/Analytics.tsx`) : ne s'injecte QUE si consentement « accepted » ET `NEXT_PUBLIC_GA_ID` défini. Aucun cookie analytics avant accord.
- **Page Privacy** (`/privacy`, brouillon à faire relire) + liens footer + ajout à sitemap. `.env.example` : `NEXT_PUBLIC_GA_ID`.
- Validé : `next build` OK (18 routes).

## 2026-08-17 — Webmastering : SEO + ergonomie (`feat/rhamon/seo-ux`)
- **SEO** : `app/sitemap.ts` (→ /sitemap.xml, 11 routes), `app/robots.ts` (→ /robots.txt, bloque /api), métadonnées enrichies dans `app/layout.tsx` (metadataBase, Open Graph, Twitter card, keywords), **JSON-LD Organization (NGO)** avec contact/région, `lib/site.ts` (constantes + `SITE_URL` depuis `NEXT_PUBLIC_SITE_URL`).
- **Ergonomie / a11y** : **menu mobile hamburger** (il n'existait AUCUNE nav mobile — gros trou UX) avec état actif, fermeture Esc/clic/route, scroll-lock ; **skip-to-content** (globals.css) ; **page 404** de marque ; **favicon** `app/icon.svg` (monogramme NBW).
- ⚠️ Touche des fichiers `shared` (layout, Nav, globals) — améliorations transverses SEO/a11y, justifiées.
- À faire côté humain : définir `NEXT_PUBLIC_SITE_URL` = vrai domaine sur Vercel (sinon sitemap/OG pointent sur localhost). Le câblage des images reste en stash (`git stash`) — à reprendre.
- Validé : `next build` OK (17 routes ; /sitemap.xml, /robots.txt, /icon.svg servis). Menu mobile vérifié au rendu.

## 2026-08-17 — AIDE serge : ses 5 pages restantes + mémoire (`feat/rhamon/serge-pages`)
- Serge indisponible → l'humain me demande de finir sa zone. Construit **Events, Conference, Resources, News, Gallery** (Programs déjà fait) : pages en anglais, design cohérent (`Reveal`, tokens), contenu **placeholder** issu de `docs/CONTENT.md` §4/5/7/8/9, prêtes à brancher Supabase (events/registrations, resources, posts, gallery_media).
- **Mémoire mise à jour** : `OWNERSHIP.yml` → toutes les zones serge (sauf `search`) passées à `done` avec note « construite par rhamon EN AIDE, placeholder à brancher » ; note d'en-tête réécrite pour le Claude de serge (ne pas refaire, juste enrichir + brancher). Ajout d'un rappel migration DB + guide Stripe.
- Respect §1 : je n'ai PAS touché au journal ni au PLAN de serge (interdits). Seulement OWNERSHIP.yml (partagé) + ses pages, avec accord explicite de l'humain.
- **Résultat** : les 12 pages du site existent et buildent. `search` = phase ultérieure. Stripe/Supabase = à activer par l'humain (clés + toggle Vercel).
- Validé : `next build` OK (14 routes).

## 2026-08-17 — AIDE serge : Programs + OWNERSHIP (`feat/rhamon/programs`)
- Zone rhamon terminée → sur demande de l'humain, je commence à aider serge. **Page Programs** : `app/(site)/programs/page.tsx` (7 programmes de CONTENT §3, contenu placeholder, cartes éditoriales, prêt à brancher table `programs`). En anglais, design cohérent, `Reveal`.
- **OWNERSHIP.yml mis à jour** (registre partagé) pour que le Claude de serge ne refasse pas le travail : note d'état en tête (site en anglais, fondations + zone rhamon FAITES, pattern API gardé, Vercel=Next.js) ; statuts `done` (fondations design/layout, toutes zones rhamon) et `programs` → `wip`.
- ⚠️ J'agis dans la zone de serge AVEC l'accord explicite de l'humain. Je n'ai PAS touché au journal ni au PLAN de serge (interdits) — seulement OWNERSHIP.yml (partagé) et sa page programs.
- Validé : `next build` OK (`/programs` statique).

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
