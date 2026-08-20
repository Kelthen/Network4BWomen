---
dev: serge
github: sergesanou
branch: feat/serge/programs
current_task: "Programs → branchement Supabase (table programs, lecture publique)"
files_locked: ["app/(site)/programs/page.tsx", "supabase/migrations/0002_programs.sql", "OWNERSHIP.yml"]
updated: 2026-08-20T00:00:00Z
---

# Journal — serge

> Chronologique, plus récent en HAUT. Je n'écris que dans CE fichier.
> Avant d'agir : `git fetch --all --prune`, lire TEAM-STATUS.md, lire le journal de rhamon, vérifier OWNERSHIP.yml.
> Mettre à jour l'en-tête YAML (`current_task`, `files_locked`) AVANT de coder, puis commit+push pour publier mon intention.

## 2026-08-20 — Reprise de session (protocole d'ouverture)
- `git fetch --all --prune` OK · `TEAM-STATUS.md` lu (rhamon dernière activité 20/08 sur `feat/rhamon/gallery-lightbox`, rien de verrouillé) · journal rhamon lu · `OWNERSHIP.yml` vérifié.
- Ma zone : les 6 pages (programs, events, conference, resources, news, gallery) ont été construites en placeholder par rhamon (aide, serge indisponible). Reste à les brancher sur Supabase. `search` reste todo.
- Je démarre par **Programs** (la plus simple : une seule table, pas de FK). Verrouillé ci-dessus, branche `feat/serge/programs` créée.

## 2026-08-17 — Amorçage du repo
- Repo amorcé par le Claude de rhamon (doctrine + automatisation + squelette + docs).
- Ma zone : Programmes, Événements (+ inscriptions), Conférence, Ressources, News/Blog, Galerie, Recherche.
- Prochaine étape : `git clone`, lire CLAUDE.md en entier, puis se coordonner sur les fondations avant d'attaquer mes pages.
- Rien de verrouillé pour l'instant.
