# Network4BWomen

Site web de **Network of Black Women (NBW)** — réalisé par l'agence **Kelthen**.

Une sororité pour les femmes noires de Toronto (Ontario), sur le territoire traditionnel de nombreuses nations, visé par le Traité 13.

## Stack
Next.js (App Router) · TypeScript · Tailwind CSS · Supabase · Stripe · déploiement Vercel.

## Démarrage
```bash
npm install
cp .env.example .env.local   # remplir les clés Supabase/Stripe
npm run dev                  # http://localhost:3000
```

## 👥 On travaille à deux — LIS CECI D'ABORD
Ce repo est développé en parallèle par **deux personnes, chacune avec son propre Claude** :
- **rhamon** (`RhamonK`) — Accueil, À propos, Get Involved, Dons, Contact, Newsletter.
- **serge** (`sergesanou`) — Programmes, Événements, Conférence, Ressources, News/Blog, Galerie.

**Avant de coder, chaque session :**
1. `git fetch --all --prune`
2. Lire [`TEAM-STATUS.md`](./TEAM-STATUS.md) (auto-généré) et le journal de l'autre dans `.claude/journal/`.
3. Vérifier [`OWNERSHIP.yml`](./OWNERSHIP.yml).
4. Suivre la loi partagée : [`CLAUDE.md`](./CLAUDE.md).

La coordination est **automatique** : chaque push régénère `TEAM-STATUS.md` via GitHub Actions (`.github/workflows/team-sync.yml`). Ne l'édite jamais à la main.

## Documentation
- [`CLAUDE.md`](./CLAUDE.md) — manuel d'opérations partagé (loi) + comment utiliser les .md.
- [`PLAN-rhamon.md`](./PLAN-rhamon.md) / [`PLAN-serge.md`](./PLAN-serge.md) — plans par personne.
- [`docs/WORKFLOW-CLAUDE-CODE.md`](./docs/WORKFLOW-CLAUDE-CODE.md) — **comment donner les tâches à Claude Code** (prompts prêts).
- [`docs/CONTENT.md`](./docs/CONTENT.md) — **source de vérité du contenu** (texte NBW verbatim, où va quoi, public/interne).
- [`docs/DESIGN.md`](./docs/DESIGN.md) — doctrine de design + maquette de référence validée.
- [`docs/nbw-home-reference.html`](./docs/nbw-home-reference.html) — rendu cible de l'accueil (ouvrir au navigateur).
- [`docs/BRAND.md`](./docs/BRAND.md) — charte (couleurs, polices, accessibilité).
- Base Supabase **déjà créée** — voir [`docs/DATA-MODEL.md`](./docs/DATA-MODEL.md).
- [`docs/CONTENT.md`](./docs/CONTENT.md) — sitemap & contenu.
- [`docs/DATA-MODEL.md`](./docs/DATA-MODEL.md) — schéma Supabase.
- [`docs/TEAM.md`](./docs/TEAM.md) — équipe & gouvernance NBW.

## Branches
`main` protégée (prod Vercel). Feature branches : `feat/<dev>/<zone>` → PR → review croisée → squash-merge.
