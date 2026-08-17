---
dev: rhamon
github: RhamonK
branch: chore/rhamon/repo-structure
current_task: "Remise en ordre de la structure du repo (arborescence Next.js) + intégration de la page d'accueil"
files_locked: []
updated: 2026-08-17T00:00:00Z
---

# Journal — rhamon

> Chronologique, plus récent en HAUT. Je n'écris que dans CE fichier.
> Avant d'agir : `git fetch --all --prune`, lire TEAM-STATUS.md, lire le journal de serge, vérifier OWNERSHIP.yml.
> Mettre à jour l'en-tête YAML (`current_task`, `files_locked`) AVANT de coder, puis commit+push pour publier mon intention.

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
