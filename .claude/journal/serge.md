---
dev: serge
github: sergesanou
branch: feat/serge/ui-primitives
current_task: "Primitives UI (Button, Card, Input, Container, Section) créées. En attente de review croisée (Rhamon) — PR à ouvrir. + PR feat/serge/search en attente de review."
files_locked: []
updated: 2026-09-01T01:00:00Z
---

# Journal — serge

> Chronologique, plus récent en HAUT. Je n'écris que dans CE fichier.
> Avant d'agir : `git fetch --all --prune`, lire TEAM-STATUS.md, lire le journal de rhamon, vérifier OWNERSHIP.yml.
> Mettre à jour l'en-tête YAML (`current_task`, `files_locked`) AVANT de coder, puis commit+push pour publier mon intention.

## 2026-09-01 (2) — Primitives UI partagées (feat/serge/ui-primitives)
- Zone `shared` encore à `todo` : `components/ui/**` n'existait pas du tout (vérifié : 404 sur main).
- Ajouté `Button.tsx` (variantes primary/secondary/outline), `Card.tsx`, `Input.tsx` (+ Textarea, Label), `Container.tsx` (tailles sm/md/lg), `Section.tsx` (espacement vertical sm/md/lg) et un `README.md` d'usage.
- Calés au caractère près sur le style déjà en production (`components/events/RegistrationForm.tsx`, `components/home/Hero.tsx`) — mêmes couleurs de marque, mêmes arrondis, même comportement au survol. Rien de nouveau visuellement.
- Volontairement **additif, opt-in** : aucune page existante n'a été touchée ni migrée. À utiliser pour tout nouveau composant.
- PR à ouvrir avec Rhamon en reviewer (zone `shared`, coordination nécessaire).

## 2026-09-01 — Page Search (feat/serge/search)
- Dernière zone de mon plan encore à `todo` : Recherche site.
- Ajouté `components/search/SearchClient.tsx` (composant client : champ de recherche, filtrage instantané sur un index déjà chargé, pas de requête réseau par lettre tapée) et `app/(site)/search/page.tsx` (Server Component qui construit l'index : pages statiques + programs/events/resources/posts via Supabase, fallback pages statiques seules si Supabase indisponible).
- N'a touché à aucun fichier partagé (Nav.tsx notamment) : la page existe à `/search` mais n'est pas encore liée dans la navigation — à faire avec Rhamon (fichier shared) une fois la review passée.
- PR #39 ouverte, Rhamon en reviewer.

## 2026-08-31 — Migrations Supabase manquantes + fix sécurité + page news/[slug]
- Constat : PR #29 branche events/conference/resources/news/gallery sur Supabase mais aucune migration SQL versionnée n'existait pour ces tables (seule `programs` en avait une, dans PR #28 non mergée).
- Ajouté `supabase/migrations/0003_events_registrations.sql`, `0004_conference_speakers.sql`, `0005_resources.sql`, `0006_posts.sql`, `0007_gallery_media.sql` — calés sur les colonnes réellement utilisées dans le code de PR #29.
- Les tables existaient déjà en base (créées à la main, non versionnées) mais vides : seed correspondant appliqué directement dans Supabase (programs, events, conference_speakers, resources, posts).
- Fix sécurité appliqué en base : `registrations` avait une policy publique INSERT (`with_check: true`) permettant de contourner toute la validation de `app/api/registrations` (email, capacité). Supprimée — les écritures passent uniquement par la route API (service role).
- Ajouté `app/(site)/news/[slug]/page.tsx` (manquait complètement) : les liens "Read more →" de `/news` menaient à un 404.
- PR #29 mergée par Rhamon.

- Note : clés env corrigées dans Vercel (Preview coché pour NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY).

## 2026-08-17 — Amorçage du repo
- Repo amorcé par le Claude de rhamon (doctrine + automatisation + squelette + docs).
- Ma zone : Programmes, Événements (+ inscriptions), Conférence, Ressources, News/Blog, Galerie, Recherche.
- Prochaine étape : `git clone`, lire CLAUDE.md en entier, puis se coordonner sur les fondations avant d'attaquer mes pages.
- Rien de verrouillé pour l'instant.
