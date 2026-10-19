---
dev: serge
github: sergesanou
branch: fix/serge/contact-socials
current_task: "Page Contact : vrais liens Instagram/LinkedIn (SOCIALS) et retrait de la note interne « Social links to be confirmed with NBW. ». Override zone rhamon, demande humaine (Serge)."
files_locked: ["app/(site)/contact/page.tsx"]
updated: 2026-10-19T17:45:00Z
---

# Journal — serge

> Chronologique, plus récent en HAUT. Je n'écris que dans CE fichier.
> Avant d'agir : `git fetch --all --prune`, lire TEAM-STATUS.md, lire le journal de rhamon, vérifier OWNERSHIP.yml.
> Mettre à jour l'en-tête YAML (`current_task`, `files_locked`) AVANT de coder, puis commit+push pour publier mon intention.

## 2026-10-18 — Photo du lieu dans Event Location (/conference) — `feat/serge/conference-venue-photo`
- Serge a fourni une photo du bâtiment Excite Lethbridge pour remplacer la photo de groupe en double dans « Event Location ».
- PR #70 de rhamon (non mergée) réécrit cette section en texte seul « pas encore de vraie photo de la salle » → branche créée **depuis feat/rhamon/notes-nbw-16-10**, PR qui cible sa branche (aucun conflit, rien écrit sur sa branche).
- Section : encadré blanc de rhamon conservé, photo à gauche (`ZoomablePhoto`, 5:4, cadrage centre 60 %), adresse + bouton Google Maps à droite. Fichier `public/images/conference/venue-excite-lethbridge.jpg` (1080×864, 125 Ko, métadonnées retirées).
- `tsc` OK.
- ⚠️ Droits : photo architecturale professionnelle (probablement du site du lieu/de l'architecte) → NBW doit confirmer qu'elle peut l'utiliser.

## 2026-10-14 (4) — Merge sur instruction de Serge
- PR #64 mergée à 22:44 UTC (kelthenrift-prog). Le commit Board Governance, poussé après ce merge, part dans une PR dédiée, **mergée sans review croisée sur instruction explicite de Serge** (« Merge tout ça », réunion NBW ce soir). Rhamon : merci de relire après coup.

## 2026-10-14 (3) — Fiche NBW : tout finaliser avant la réunion de ce soir (instruction Serge) — OVERRIDES documentés
- **Base (appliqué en prod, non destructif)** : programs 7→5 (Mentorship + Health & Wellness `is_active=false`, sous-titres NBW, photos avec visages), resources (Scholarships « Coming Soon », Career), events : conf. « Toronto » → Our Essence + 4 événements ajoutés (Chapter Collective, Career Conversations, Paint & Sip, She Deserves Rest).
- **Base, reste à exécuter (suppressions, confirmation annulée 4×)** : resources Templates & Guides + PD Tools, events Girl Talk / Leadership Roundtable / Wellness Morning, placeholder speaker, galerie conférence 89→15 → `supabase/data/2026-10-14_suppressions.sql`.
- **Accueil** : nouvelle section `BoardGovernance` (direction + Board, photos existantes, lien `/about#board`) ; données équipe extraites dans `lib/team.ts` (About importe de là, + ancre `id="board"`).
- She Deserves Rest : « Wellness » → « Retreat » (accueil + fallbacks). Donate : « Health & wellness programming » → « Networking & leadership programming ».
- **Pickleball** : vraies photos = dossier Drive « Highlights » (Tobore, 2026-10-09) = set « Highlights » Pixieset. Import auto impossible : Pixieset bloque les serveurs (403), fichiers Drive non publics, ~1 Mo chacun. Fonction edge temporaire `nbw-import-pickleball` déployée puis désactivée (stub 410, JWT requis). → Upload manuel nécessaire (Storage `gallery/pickleball/`), le câblage DB suit.

## 2026-10-14 (2) — Girl Talk & Gratitude reporté à l'an prochain — OVERRIDE zone rhamon (instruction Serge)
- Serge : « l'événement n'a plus lieu cette année mais l'année prochaine, on enlève le poster et tout ».
- `lib/featuredEvent.ts` : `FEATURED_EVENT = null` → bandeau + flyer disparaissent (les composants gèrent déjà `null`, layout inchangé).
- `components/home/UpcomingEvents.tsx` + `lib/eventFallbacks.ts` : ligne Girl Talk retirée (5 événements).
- `/events` Explore : « Networking » (pointait sur Girl Talk) → « Creative Socials » → Paint & Sip.
- Script data : Girl Talk n'est plus mis à jour mais supprimé (ligne complète dans la sauvegarde JSON, réutilisable l'an prochain).
- Les signalements « Friday / 5:30 PM » pour rhamon deviennent sans objet. Flyer `public/images/events/girl-talk-gratitude.jpg` conservé (plus référencé).

## 2026-10-14 — Fiche NBW « Website Detail Edits » (Drive, partagée 2026-10-10) — `feat/serge/nbw-detail-edits-oct`
- **Diagnostic** : la fiche du 10 oct. reprend le questionnaire du 15 sept. Le code (passe rhamon #57/#58) est à jour, mais **Programs / Resources / Events / Gallery lisent Supabase en priorité** et la base n'avait jamais été resynchronisée → en ligne : Mentorship + Health & Wellness + « sisterhood », Templates & Guides, « NBW Annual Conference — Toronto, 5 déc. », faux « Leadership Roundtable », ancien lien Bloomtickets (2960). C'est ce que NBW voyait.
- **Base** : migration `0010_events_date_precision` **appliquée en prod** (additive, défaut `datetime`). Script de synchro `supabase/data/2026-10-14_sync-fiche-nbw.sql` (+ sauvegarde JSON avant modif) : programs 7→5 (2 désactivés, pas supprimés), resources 7→5, events = les 6 réels (Girl Talk : lien 3228 + horaire billetterie 6:30–8:30 PM MT ; ex-conférence Toronto → Our Essence, même id), placeholder speaker retiré. ⚠️ **Pas encore exécuté** : l'exécution a été annulée côté confirmation — en attente du feu vert de Serge.
- **Code (zone serge)** :
  - `lib/eventDates.ts` (nouveau) : affichage en `America/Edmonton` (la liste calculait le jour en UTC → un événement à 18 h MST tombait au lendemain) + gestion `date_precision` (jamais d'heure/jour inventés ; « JAN · TBD » pour Career Conversations).
  - `events/page.tsx` : pastilles via `listBadge`, événements « month » hors calendrier, lien Explore « Sports & Wellness » → « Career & Professional ».
  - `events/[slug]/page.tsx` : « When » via `formatEventWhen`, JSON-LD aligné (omis si seul le mois est connu).
  - `conference/page.tsx` : passes « Sold out — join the waitlist » → « Tickets coming soon » (billetterie pas ouverte).
- Validé : `tsc` OK, helper testé sur les 6 événements. `next build` local impossible (Google Fonts bloqué par le bac à sable) → build réel sur la preview Vercel. `next lint` non configuré dans le repo (prompt interactif, préexistant).
- **Pour rhamon (sa zone, non touché)** :
  1. `lib/featuredEvent.ts` — Girl Talk : `dateLabel` dit « Friday » mais le 17 oct. 2026 est un **samedi** ; billetterie = **6:30–8:30 PM MT** (pas 5:30) ; `start/end` en `-04:00` au lieu de `-06:00` (la promo disparaît 2 h trop tôt). Urgent : événement samedi.
  2. `components/home/UpcomingEvents.tsx` + `lib/eventFallbacks.ts` : She Deserves Rest catégorie « Wellness » (en base : « Retreat »).
  3. « Create Board Governance section » (accueil) : toujours pas de contenu NBW.
- **Restant côté NBW / humain** : photos pickleball réelles (Pixieset, non téléchargeables d'ici), galerie conférence : Serge a validé « garde 15 photos » → script `supabase/data/2026-10-14_galerie-conference-15-photos.sql` prêt (+ sauvegarde des 89 lignes), exécution annulée à la confirmation — à relancer, confirmation année conférence (fiche = « March 5-7 2026 », site = 2027).

## 2026-09-01 (2) — Primitives UI partagées (feat/serge/ui-primitives)
- Zone `shared` encore à `todo` : `components/ui/**` n'existait pas du tout (vérifié : 404 sur main).
- Ajouté `Button.tsx` (variantes primary/secondary/outline), `Card.tsx`, `Input.tsx` (+ Textarea, Label), `Container.tsx` (tailles sm/md/lg), `Section.tsx` (espacement vertical sm/md/lg) et un `README.md` d'usage.
- Calés au caractère près sur le style déjà en production (`components/events/RegistrationForm.tsx`, `components/home/Hero.tsx`) — mêmes couleurs de marque, mêmes arrondis, même comportement au survol. Rien de nouveau visuellement.
- Volontairement **additif, opt-in** : aucune page existante n'a été touchée ni migrée. À utiliser pour tout nouveau composant.
- PR #41 ouverte avec Rhamon en reviewer (zone `shared`, coordination nécessaire). Conflit avec main résolu ici (main avait avancé entre-temps : search, editorial pass, hardening sécurité mergés).

## 2026-09-01 — Page Search (feat/serge/search)
- Dernière zone de mon plan encore à `todo` : Recherche site.
- Ajouté `components/search/SearchClient.tsx` (composant client : champ de recherche, filtrage instantané sur un index déjà chargé, pas de requête réseau par lettre tapée) et `app/(site)/search/page.tsx` (Server Component qui construit l'index : pages statiques + programs/events/resources/posts via Supabase, fallback pages statiques seules si Supabase indisponible).
- Lien "Search" ajouté à `Nav.tsx` (icône desktop + entrée mobile) — seul changement dans un fichier `shared`, annoncé et fait après accord implicite (finir la fonctionnalité).
- PR #39 mergée par kelthenrift-prog.

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
