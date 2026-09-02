---
dev: rhamon
github: RhamonK
branch: claude/rhamon-docs-update-5c8xe5
current_task: "Photos cliquables + zoomables partout (visionneuse 3D globale)"
files_locked: []
updated: 2026-09-01T00:00:00Z
---

# Journal — rhamon

> Chronologique, plus récent en HAUT. Je n'écris que dans CE fichier.
> Avant d'agir : `git fetch --all --prune`, lire TEAM-STATUS.md, lire le journal de serge, vérifier OWNERSHIP.yml.
> Mettre à jour l'en-tête YAML (`current_task`, `files_locked`) AVANT de coder, puis commit+push pour publier mon intention.

## 2026-09-02 — Contenu client (questionnaire NBW) : maj équipe (`claude/rhamon-docs-update-5c8xe5`)
- Reçu `NBWquestionnairecontenu.docx` (questionnaire de contenu rempli par NBW).
- **Équipe (About)** : sur demande client explicite → **retiré Khamaya Cawley**, **ajouté Miriam Ngungkpan** (rôle « Board Member » par défaut, à confirmer). Supprimé `public/images/team/khamaya-cawley.jpg`. Miriam sans photo → placeholder (initiales).
- Land acknowledgment vérifié : déjà correct (Toronto, Treaty 13, Dish With One Spoon) — le doc demandait confirmation.
- **À fournir par NBW** (extrait du doc) : bios des 9 membres ; photos Martha/Felisha/Atyia/Miriam ; descriptions des 7 programmes ; détails conférence (tout TBA) ; 3+ articles News ; photos Gallery ; URLs réseaux sociaux, chiffres d'impact, logos sponsors.
- **Zone serge** : événement réel « Girl Talk & Gratitude » (17/10/2026, The Loft on 5th, Networking, max 30, billetterie bloomtickets) + flyer fourni → à insérer en base Supabase (events) par serge. Flyer extrait, dispo.
- Validé : `next build` OK (21 routes).

## 2026-09-01 — Filet or partout + vraies photos membres zoomables (`claude/rhamon-docs-update-5c8xe5`)
- **Filet or éditorial sur TOUTES les eyebrows** : classe globale `.nbw-eyebrow` (+ `::before` en `currentColor`) dans `globals.css`, appliquée aux 16 définitions `EYEBROW` du site (mes pages + zone serge, demande client « partout »). Cohérence éditoriale totale.
- **Photos membres** : serge a mergé 6 vraies photos (`public/images/team/*.jpg`) dans `main`. J'ai mergé `main` dans ma branche → les photos rendent + sont **cliquables/zoomables** via `ZoomablePhoto` (prouvé en capture : clic Maleeka → visionneuse 3D). ✅
- ⚠️ Zone serge (eyebrows de programs/conference/events/gallery/news/resources) : ajout d'une seule classe CSS, non destructif.
- Validé : `next build` OK (20 routes) + preview locale capturée (About team + zoom).

## 2026-09-01 — Hardening sécurité : rate limiting + plafonds de longueur (`claude/rhamon-docs-update-5c8xe5`)
- Audit du site vs checklist « 20 trucs avant la prod » : 11/14 points applicables ✅ (secrets en env, .env gitignored, service role côté serveur uniquement, HTTPS, webhook Stripe signé, erreurs génériques, honeypot…).
- **#3 Rate limiting** : nouveau `lib/rate-limit.ts` (fenêtre glissante en mémoire, best-effort ; Upstash recommandé pour du distribué). Appliqué à `/api/contact`, `/api/newsletter`, `/api/registrations` (5 req/min/IP → 429 + Retry-After).
- **#11 Plafonds de longueur** sur les champs texte (contact: name≤100/email≤200/message≤5000 ; newsletter: email≤200/source≤100 ; registrations: name≤100/email≤200/phone≤40/notes≤2000).
- ⚠️ **Zone serge** : `app/api/registrations/route.ts` modifié (ajout surgical rate-limit + bornes) car demande sécurité transverse du client. Signalé ici. Risque de conflit faible (ajouts en tête). @serge : `lib/rate-limit.ts` dispo si besoin ailleurs.
- 🔴 **À FAIRE côté client (rhamon humain)** : vérifier **RLS Supabase** sur toutes les tables (surtout `registrations`/`form_submissions` = données perso). `select tablename, rowsecurity from pg_tables where schemaname='public';`
- 🟡 npm audit : 2 high *build-time* (PostCSS via Next) — fix = montée Next (breaking), à planifier après le 6/09.
- Validé : `tsc --noEmit` OK · `next build` OK.

## 2026-09-01 — Photos zoomables partout (`claude/rhamon-docs-update-5c8xe5`)
- **Problème client** : « la photo des membres, je zoome et y'a rien ». Les avatars équipe étaient des placeholders dégradés non cliquables.
- **Visionneuse globale** : `components/photo/PhotoLightboxProvider.tsx` (contexte, un seul `Lightbox` monté dans `app/layout.tsx`) + hook `usePhotoLightbox()`. Réutilise l'effet 3D + zoom existant du Lightbox de la galerie.
- **Primitive** : `components/photo/ZoomablePhoto.tsx` — dégradé de secours + overlay (initiales) tant que la photo n'existe pas (NON cliquable) ; dès que la vraie photo charge → bouton « zoom » (pastille au survol, `cursor-zoom-in`, accessible clavier) qui ouvre la visionneuse. Détecte le chargement via `<img>` onLoad/onError (+ cache `img.complete`).
- **Câblé** : `about/TeamGrid` (membres) + accueil (cartes Programs). Galerie inchangée (elle a déjà son Lightbox 3D).
- ⚠️ Zones serge (conférence/programmes/événements) : primitive prête à adopter, mais je ne touche pas ses fichiers sans accord (CLAUDE.md §1.2). À signaler.
- ⚠️ Rappel client : déposer les photos dans `public/images/team/<slug>.jpg`, `public/images/home/*.jpg` — elles deviennent alors cliquables/zoomables automatiquement.
- Validé : `tsc --noEmit` OK · `next build` OK (24 routes).

## 2026-09-01 — Accueil complété + menu regroupé (`feat/rhamon/home-nav-polish`)
- **Audit vs Website Vision & Content Plan** → comblé les écarts accueil/footer/nav.
- **Hero** : 5 boutons (Join our community, Donate, About us, Programs, Upcoming events) — conforme au plan. Fix dégradé de secours `#44312b`→`#573425`.
- **Our Impact** : 6 stats (ajout Volunteer hours + Community partnerships) ; grille `.stats` 4→3 colonnes (2 rangées propres).
- **Nouvelles sections accueil** : `UpcomingEvents` (teaser → /events), `Testimonials` (3 voix, remplace le témoignage unique), `Sponsors` (logos placeholder + Become a partner).
- **Footer** refait : mission, bouton Donate, réseaux sociaux (`lib/site.ts` `SOCIALS`, URLs placeholder à remplacer), **inscription newsletter** compacte (`FooterNewsletter` → /api/newsletter), liens Explore + Get involved étendus, coordonnées.
- **Nav élégante** : 9 liens à plat → **5 entrées + déroulants** (Programs▾ = Conference ; Events▾ = Gallery + News ; Get Involved▾ = Resources). Desktop hover/focus, mobile sous-liens indentés. Zone `shared` (Nav/Footer) — améliorations transverses.
- ⚠️ À fournir par le client : vraies URLs réseaux sociaux ; vrais chiffres d'impact ; logos sponsors.
- Validé : `tsc --noEmit` OK · `next build` OK (20 routes). Rendu vérifié (capture).

## 2026-08-20 — Typographie officielle (`feat/rhamon/typography`)
- Charte NBW appliquée : **Playfair** (titres, déjà en place) + **Lato** (corps, remplace Inter) + **Montserrat** (sous-titres / UI).
- `app/layout.tsx` : `next/font` charge Lato (`--font-sans`, weights 400/700) et Montserrat (`--font-sub`). `tailwind.config.ts` : nouveau token `font-sub` (Montserrat, fallback Lato).
- Montserrat appliqué aux **eyebrows** (12 pages via `font-sub` + `.eyebrow` du home.module.css) et à la **nav** (`font-sub`).
- Vérifié au rendu : nav + eyebrows en Montserrat, titres en Playfair, corps en Lato.
- Note : la base Supabase existe déjà (compte `kelthenrift@gmail.com`, projet Network4BWomen) → à brancher ensuite (récupérer URL + clés dans Supabase → Settings → API, les mettre dans Vercel).
- Validé : `tsc --noEmit` OK · `next build` OK (19 routes).

## 2026-08-20 — Fix course de déploiement team-sync (`fix/rhamon/team-sync-deploy-race`)
- **Cause racine** confirmée du « le site ne se met pas à jour » récurrent : le workflow `.github/workflows/team-sync.yml` écoutait les push sur `main`. À chaque merge de PR, il repoussait un commit bot `[skip ci]` par-dessus ; Vercel (qui n'honore PAS `[skip ci]` ici) **annulait** le build du merge et déployait le commit bot → parfois le merge n'atteignait jamais la prod (ex. PR #30 brand : logo/palette bloqués en preview). Vu dans les logs Vercel (builds CANCELED).
- **Fix** : le workflow n'écoute plus `main`, seulement `feat/**` + `paths: .claude/journal/**`. Les merges sur main se déploient donc proprement (aucun commit bot pour les annuler). TEAM-STATUS reste frais (agrège les journaux de toutes les branches aux push de dev).
- Optionnel (action humaine) : Vercel → Settings → Git → **Ignored Build Step** = `bash -c 'git log -1 --pretty=%B | grep -q "\[skip ci\]" && exit 0 || exit 1'` pour ignorer *tout* commit team-sync et supprimer le churn résiduel.
- **Diag serge (lecture seule, zone non touchée)** : ses builds PR #29 échouent car ses pages créent le client Supabase au build sans garde → `supabaseUrl is required` (clés NBW absentes). N'affecte pas la prod. À régler par serge / une fois le Supabase NBW en place.

## 2026-08-20 — Identité de marque officielle (`feat/rhamon/brand-identity`)
- Le client a envoyé la **charte officielle** (NBW Brand Guidelines, août 2026). Appliquée au site.
- **Logo réel** : extrait les 6 versions du .docx, généré des PNG **transparents + cropés** (Pillow) → `public/images/brand/logo-black.png` (fonds clairs), `logo-white.png` (fonds foncés), `logo-primary.png` (blanc+pink). Remplacé le faux wordmark texte « NBW » par le vrai logo dans **Nav** (noir) et **Footer** (blanc). ⚠️ la charte interdit de recréer le logo en police système — c'est désormais respecté.
- **Palette officielle** dans `tailwind.config.ts` : Brown Primary `#573425` (était `#44312b`), + `brownDark #642F19`, Pink `#F6828F` (déjà), + `crimson #B84C65`, Gold `#C9962C` (était `#C9A24B`), Sage `#528574` (était `#97AC9F`). Tokens texte accessibles `goldText`/`rose` conservés.
- **`docs/BRAND.md`** réécrit = charte officielle (palette, 60/30/10, règles logo, typo The Seasons/Georgia/Playfair + Montserrat + Lato, voix, politique anti-IA imagery, accessibilité).
- Vérifié au rendu (capture home : logo nav lisible, brun officiel OK).
- **Reste (proposé au client)** : basculer la police corps Inter→**Lato** + ajouter **Montserrat** (sous-titres) pour coller à la charto typo ; favicon = mark carré (le wordmark ne tient pas en 32px).
- Validé : `tsc --noEmit` OK · `next build` OK (19 routes).

## 2026-08-20 — Lightbox galerie interactive (`feat/rhamon/gallery-lightbox`)
- Manque UX : cliquer une photo de la galerie ne faisait rien (tuiles décoratives `aria-hidden`). Ajout d'une **vraie lightbox**.
- `components/gallery/Lightbox.tsx` : modal (backdrop flou), fermeture Esc/clic/bouton, navigation ◀▶ + flèches clavier, compteur, scroll-lock. **Tilt 3D + reflet (glare)** qui suit **souris ET tactile** — implémenté **sans Framer Motion** : ressort maison en `requestAnimationFrame` (lerp), écrit directement dans le DOM (0 re-render), `prefers-reduced-motion` désactive le tilt. Choix « meilleur rendement » (bundle léger, Lighthouse).
- `components/gallery/GalleryGrid.tsx` (client) : les vraies photos deviennent des `<button>` cliquables → ouvrent la lightbox ; les slots restants restent des dégradés décoratifs.
- `app/(site)/gallery/page.tsx` : passé en **data-driven** (`album.photos` liste les fichiers réels). Rendu client uniquement pour la grille ; la page reste statique.
- Choix design validé avec le client : **grande photo nette** (pas de quadriptyque Pop Art — jugé gadget/irrespectueux sur des portraits réels).
- Validé : `tsc --noEmit` OK · `next build` OK (19 routes, `/gallery` statique).

## 2026-08-19 — PayPal en option de don (`feat/rhamon/paypal-donate`)
- Ajout d'un bouton **« Donate with PayPal »** sous le bouton Stripe, activé par `NEXT_PUBLIC_PAYPAL_DONATE_URL` (lien public, pas de secret). Masqué si vide → rien de cassé.
- Supporte le bouton « Donate » hébergé PayPal (`paypal.com/donate?hosted_button_id=…`) **ou** PayPal.me. Pour PayPal.me, report du montant choisi (`…/50CAD`).
- Aucun webhook/API PayPal côté serveur (PayPal gère la page de paiement). Stripe reste le canal principal, PayPal en alternative.
- Action humain : créer le bouton/lien de don dans le compte PayPal de NBW → coller l'URL dans `NEXT_PUBLIC_PAYPAL_DONATE_URL` (Vercel).
- Validé : `tsc --noEmit` OK · `next build` OK (19 routes).

## 2026-08-19 — Contact robuste (Resend 403 + UX) (`fix/rhamon/contact-robust`)
- Symptôme : `/contact` renvoyait 500 alors que l'auto-réponse arrivait. Logs Vercel = **Resend 403** (« can only send to your own email until you verify a domain ») sur la notif vers `info@…`, **+** Supabase « Invalid path » (clés du projet non-NBW invalides). Donc notif NBW + base KO → 500.
- **Fix backend** : destinataire de notif configurable `CONTACT_NOTIFY_TO` (défaut `CONTACT_EMAIL`) → tant que le domaine n'est pas vérifié, on pointe sur l'adresse vérifiée du compte Resend (plus de 403). Succès = notif OU base (auto-réponse best-effort). **Honeypot anti-spam** ajouté (champ caché `company`, accepté silencieusement si rempli).
- L'écran de succès « Thank you 💛 » existait déjà côté `ContactForm` — il ne s'affichait pas car le backend répondait 500. Une fois la notif livrée → 200 → écran de remerciement OK.
- `.env.example` : `CONTACT_NOTIFY_TO`.
- Action humain : ajouter `CONTACT_NOTIFY_TO=<adresse vérifiée Resend>` dans Vercel (interim), OU **vérifier un domaine** dans Resend pour envoyer à `info@…` + aux visiteurs (auto-réponse réelle).
- Validé : `tsc --noEmit` OK · `next build` OK (19 routes).

## 2026-08-19 — Contact → email Resend (`feat/rhamon/contact-email`)
- Constat : le formulaire de contact n'enregistrait qu'en base (Supabase), **personne n'était notifié** et pas d'auto-réponse. Ajout d'un canal email.
- `lib/email.ts` : helper `sendEmail` via l'API REST Resend (aucune dépendance ajoutée), no-op propre si `RESEND_API_KEY` absent + `escapeHtml`.
- `app/api/contact/route.ts` réécrit : **2 canaux tolérants aux pannes** — (1) email Resend : notification à NBW avec **reply-to = visiteur** (répondre en 1 clic) + **auto-réponse** « merci » au visiteur ; (2) copie Supabase best-effort. Le formulaire est actif dès qu'**un** canal est configuré → **marche avec juste la clé Resend, sans le Supabase de NBW**.
- `.env.example` : `RESEND_API_KEY`, `RESEND_FROM` (optionnel, une fois le domaine vérifié).
- Action humain : créer un compte Resend → clé API → `RESEND_API_KEY` dans Vercel. (Auto-réponse partira d'une adresse Resend de test jusqu'à vérif du domaine NBW.)
- Validé : `tsc --noEmit` OK · `next build` OK (19 routes).

## 2026-08-19 — Relocalisation Toronto + déblocage Vercel (`feat/rhamon/relocate-toronto`)
- **Contexte majeur** : la vraie panne « le site ne se met jamais à jour » = le plan Vercel **Hobby** refuse un repo **privé + orga**. Repo passé **public** (aucun secret commité, vérifié : `.env*` gitignored, historique scanné) → auto-déploiement GitHub→Vercel **rétabli**. Le fix Stripe (Managed Payments off + URL propre) est enfin en prod, **le don marche** (testé carte 4242).
- **Relocalisation NBW → Toronto, Ontario** (le client était mal localisé en Alberta). Remplacé partout dans le **site rendu** : `lib/site.ts`, `app/layout.tsx` (keywords, JSON-LD `areaServed`/`addressRegion` AB→ON + `addressLocality`), Hero, OG image, et toutes les pages (home, about incl. la citation, contact, donate, events incl. `where: Toronto`, resources, conference, gallery, get-involved).
- **Reconnaissance territoriale** réécrite (composant `LandAcknowledgment` + about + contact) : Blackfoot/Alberta → **Toronto, Traité 13 / Dish With One Spoon** (Mississaugas of the Credit, Anishinaabe, Haudenosaunee, Wendat). ⚠️ **À faire valider par le client** (formulation standard Ville de Toronto).
- **Mémoire synchronisée** : `CLAUDE.md §5`, `docs/CONTENT.md` (+ citation), `README.md`, `docs/TEAM.md`, `docs/BRAND.md`, `PLAN-rhamon.md` — pour que les futures sessions ne recorrigent pas vers l'Alberta.
- Validé : `tsc --noEmit` OK · `next build` OK. Prochaine étape (demande client) : intégration des **photos**.

## 2026-08-19 — Fix Stripe checkout : Managed Payments + URL (`fix/rhamon/stripe-managed-payments`)
- **Bug live** : `/donate` renvoyait « the product tax code is missing… Managed Payments enabled by default → pass managed_payments[enabled]=false ». Le compte Stripe NBW a **Managed Payments activé par défaut**, qui exige un `tax_code` produit sur chaque line item — inutile pour un don et bloquant.
- **Corrigé** dans `app/api/stripe/checkout/route.ts` : ajout de `managed_payments: { enabled: false }` sur la Checkout Session (cast `any`, absent des types stripe-node v16). Le don part sans exiger de tax_code.
- **Aussi corrigé** : `//donate` (double slash) dans les success/cancel URLs → `NEXT_PUBLIC_SITE_URL` finissait par `/`. `base` nettoie désormais le slash final (`.replace(/\/+$/,"")`).
- Validé : `tsc --noEmit` OK · `next build` OK. À tester en ligne après redeploy avec carte `4242 4242 4242 4242`.

## 2026-08-18 — Vercel Analytics (`feat/rhamon/vercel-analytics`)
- Ajout `@vercel/analytics` + `<VercelAnalytics/>` dans le layout. **Cookieless / privacy-friendly** → aucun consentement requis (complète le GA opt-in déjà en place).
- Action humain : activer Web Analytics dans Vercel → Project → Analytics (aucun env var).
- Validé : `next build` OK.

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
