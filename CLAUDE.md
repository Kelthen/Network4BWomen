# CLAUDE.md — Manuel d'opérations partagé · Network4BWomen

> **Ce fichier est la loi.** Les deux Claude (celui de **rhamon** et celui de **serge**) le lisent **au tout début de chaque session**, avant d'écrire une seule ligne. En cas de doute, ce fichier prime sur ton intuition.

Agence : **Kelthen** · Client : **Network of Black Women (NBW)** · Repo : `kelthen/Network4BWomen`

---

## 0. Les deux opérateurs

| Opérateur | GitHub | Branches | Plan | Journal |
|---|---|---|---|---|
| **rhamon** | `RhamonK` | `feat/rhamon/*` | `PLAN-rhamon.md` | `.claude/journal/rhamon.md` |
| **serge** | `sergesanou` | `feat/serge/*` | `PLAN-serge.md` | `.claude/journal/serge.md` |

Compte agence propriétaire du repo : `kelthen`. **Tu es l'un des deux. Tu n'écris jamais dans le journal, le plan ou la branche de l'autre.**

Identifie-toi au début de session : lis `git config user.name`. Si ce n'est pas `RhamonK` ou `sergesanou`, **arrête et demande** à l'humain qui tu es.

---

## 1. ⚔️ PROTOCOLE « VÉRIFIER AVANT D'AGIR » (règle sacrée)

Discipline militaire : **on reconnaît le terrain avant d'avancer.** Deux agents autonomes sur le même repo = risque de collision. Ce protocole l'élimine.

### 1.1 Avant TOUTE session de travail — checklist d'ouverture (obligatoire)

```bash
git fetch --all --prune          # 1. récupérer l'état réel du monde
git status                       # 2. où suis-je, ai-je du travail non commité ?
```

Puis, **dans cet ordre**, lire :

1. **`TEAM-STATUS.md`** (auto-généré) → ce que l'autre fait en ce moment, ses fichiers verrouillés, son dernier push.
2. **Le journal de l'autre** : `.claude/journal/<autre>.md` → contexte, décisions récentes, pièges signalés.
3. **`OWNERSHIP.yml`** → qui possède la zone que je m'apprête à toucher.
4. **Mon propre plan** (`PLAN-<moi>.md`) → ma prochaine tâche prévue.

### 1.2 Règle d'or de non-collision

> **Ne touche jamais un fichier listé dans `files_locked` du journal de l'autre, ni une page/zone que `OWNERSHIP.yml` attribue à l'autre.**

- Ta tâche est dans **ta** zone (`owner: <moi>`) ? → feu vert, avance.
- Ta tâche touche une zone **`shared`** (design system, layout, schéma Supabase) ? → vérifie que l'autre n'y est pas (`TEAM-STATUS`), **annonce-le** dans ton journal AVANT, fais un changement **petit et atomique**, push vite pour libérer.
- Ta tâche touche la zone de **l'autre** ? → **STOP.** Note le besoin dans ton journal, signale-le à l'humain. Ne force jamais.

### 1.3 Avant de commencer une tâche — verrouiller

Mets à jour l'en-tête YAML de **ton** journal (`current_task`, `files_locked`) et **commit + push tout de suite**. Ça publie ton intention → l'autre te voit dans `TEAM-STATUS` au prochain fetch. Verrouiller AVANT d'écrire le code, pas après.

### 1.4 Après chaque bloc de travail — clôturer

1. Mettre à jour ton journal : ce qui a changé, fichiers touchés, décisions, **prochaine étape**.
2. Vider `files_locked` (ou le réduire à ce qui reste en cours).
3. `git add` → commit (Conventional Commits, voir §3) → `git push`.
4. Le push déclenche l'Action `team-sync` → `TEAM-STATUS.md` se régénère sur `main`. **Tu n'édites jamais `TEAM-STATUS.md` à la main.**

### 1.5 En cas de conflit malgré tout

Conflit Git au merge → **ne devine pas** l'intention de l'autre. Résous uniquement dans **tes** fichiers ; pour ses fichiers, garde sa version (`--theirs` avec discernement) et signale dans ton journal + à l'humain. Un conflit non trivial dans une zone `shared` = on se parle (humains) avant de merger.

---

## 2. Stack technique

- **Framework** : Next.js (App Router) + TypeScript, React Server Components par défaut.
- **Style** : Tailwind CSS avec tokens de marque (`tailwind.config.ts`, voir `docs/BRAND.md`).
- **Données / Auth / Storage** : Supabase (client dans `lib/supabase.ts`). ✅ **Base DÉJÀ CRÉÉE** — le code lit/écrit les tables directement ; schéma dans `docs/DATA-MODEL.md`, évolutions par migration nommée dans `supabase/`.
- **Paiements / Dons** : Stripe (Checkout + webhook). Zone rhamon.
- **Emails / Newsletter** : à câbler (Resend ou Mailchimp). Zone rhamon.
- **Déploiement** : Vercel. `main` → production ; chaque PR → preview deploy.
- **Node** : ≥ 20. Gestionnaire : `npm`.

### Commandes
```bash
npm install         # installer
npm run dev         # dev local (http://localhost:3000)
npm run build       # build prod
npm run lint        # ESLint
npx tsc --noEmit    # typecheck
```

---

## 3. Conventions de code & Git

- **Branches** : `feat/<dev>/<zone>`, `fix/<dev>/<sujet>`, `chore/<dev>/<sujet>`. Courtes, une par tâche.
- **Commits** : [Conventional Commits](https://www.conventionalcommits.org) — `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`. Message en français OK, préfixe en anglais.
- **`main` est protégée** : aucun push direct. Toujours passer par une PR → **review croisée** (le Claude/dev de l'autre relit) → squash-merge.
- **PR** : remplir `.github/pull_request_template.md`. Cocher « j'ai lu TEAM-STATUS ».
- **Bannière de propriété** : chaque fichier de page/composant non partagé commence par `// OWNED BY: rhamon` ou `// OWNED BY: serge`. Ne modifie pas un fichier `OWNED BY` l'autre sans passer par §1.2.
- **TypeScript strict**, pas de `any` sauf justifié. Composants accessibles (sémantique HTML, `alt`, focus visibles, contraste AA — voir `docs/BRAND.md`).

### Definition of Done (une tâche est « done » seulement si)
- [ ] La page/feature rend correctement en desktop **et** mobile.
- [ ] `npm run lint` et `npx tsc --noEmit` passent.
- [ ] Accessibilité de base respectée (contraste AA, navigation clavier, `alt`).
- [ ] Journal mis à jour + commit poussé + PR ouverte.
- [ ] Aucun fichier de la zone de l'autre modifié sans accord.

---

## 4. Répartition du travail (résumé — détail dans les PLAN-*.md)

| Zone | Propriétaire |
|---|---|
| Accueil, À propos, Get Involved (+ Dons/Stripe), Contact, Newsletter | **rhamon** |
| Programmes, Événements (+ inscriptions), Conférence, Ressources, News/Blog, Galerie | **serge** |
| Design system, layout (Nav/Footer), schéma Supabase, primitives UI, recherche | **shared** |

**Fondations d'abord.** Les zones `shared` (tokens Tailwind, layout global, schéma DB, primitives) sont amorcées **en premier** et de façon coordonnée, avant de paralléliser les pages. Voir `OWNERSHIP.yml` pour le statut à jour.

---

## 5. Le client : NBW (contexte à ne jamais perdre)

Network of Black Women — sororité pour les femmes noires de **Toronto (Ontario)**, sur le **territoire traditionnel de nombreuses nations, visé par le Traité 13** (reconnaissance obligatoire dans le footer).

**Mission** : autonomiser, connecter et élever les femmes noires via une communauté de soutien et des opportunités de croissance.
**Vision** : un environnement fort, inclusif, sûr où les femmes noires sont célébrées ; voix amplifiées, réussites reconnues, force collective motrice de changement positif.
**Valeurs** : équité · sororité · community care · responsabilité (accountability) · autonomisation collective.
**Ton du site** : sophistiqué, chaleureux, communautaire, épuré, narratif (storytelling). Photographie réelle de femmes et filles noires, grandes images, texte minimal.
**Hero** : « Empowering Black Women. Building Community. Creating Leaders. »
**Contact** : info.networkofblackwomen@gmail.com · (403) 635-8688

Détail marque → `docs/BRAND.md` · contenu page par page → `docs/CONTENT.md` · équipe → `docs/TEAM.md` · données → `docs/DATA-MODEL.md`.

---

## 6. Ambition design (non négociable)

Ce site vise le **top 1% mondial** : direction **éditoriale, chaleureuse et élégante**, mouvement **riche mais tasteful** avec 2-3 moments signature. Chaque page se défend face à **`docs/DESIGN.md`** (la doctrine) et **`docs/BRAND.md`** (couleurs, typo). Pas de template générique. Accessibilité AA minimum, Lighthouse ≥ 95. **Avant de coder une page, relis `DESIGN.md` + `BRAND.md`.**

## 7. Fichiers du projet (carte)

| Fichier | Rôle | Qui écrit |
|---|---|---|
| `CLAUDE.md` | Ce manuel (loi partagée) | humains, par PR |
| `OWNERSHIP.yml` | Registre « qui possède quoi » | les deux, par PR |
| `.claude/journal/<dev>.md` | Journal + intentions/verrous | chaque dev, le sien |
| `TEAM-STATUS.md` | Vue agrégée temps réel | **auto** (Action) — jamais à la main |
| `PLAN-<dev>.md` | Plan détaillé par dev | chaque dev, le sien |
| `docs/DESIGN.md` | Doctrine de design mondiale | humains, par PR |
| `docs/BRAND.md` | Couleurs, typo, accessibilité | humains, par PR |
| `docs/CONTENT.md` | **Source de vérité du contenu** : quel texte va où (verbatim NBW), PUBLIC vs INTERNE | humains, par PR |
| `docs/DATA-MODEL.md` | Schéma Supabase (base déjà créée) | les deux, par migration |
| `docs/TEAM.md` | Équipe & gouvernance NBW | humains, par PR |
| `docs/nbw-home-reference.html` | Maquette d'accueil VALIDÉE (rendu cible) | référence |
| `docs/WORKFLOW-CLAUDE-CODE.md` | Guide humain : donner les tâches à Claude Code | humains |

### Où mettre le contenu (règle)
Texte éditorial fixe (mission/vision/à-propos) → **verbatim dans le composant**, copié depuis `docs/CONTENT.md`. Contenu dynamique (programmes, événements, articles, galerie, équipe, témoignages) → **depuis Supabase**. Soumissions (contact, don, bénévole) → **routes API serveur** vers Supabase. Ne JAMAIS publier le contenu 🔴 INTERNE de `docs/CONTENT.md`.

## 8. Comment utiliser ces .md (IMPORTANT — lire une fois)

**On ne colle rien à la main.** Ces fichiers vivent dans le repo ; Claude Code (et Cowork) les lit depuis le disque.

- **`CLAUDE.md` est chargé automatiquement** au démarrage de chaque session Claude Code ouverte à la racine du repo. C'est pour ça qu'il est la « loi » : les deux Claude l'ont toujours en contexte, sans effort.
- **Les autres .md sont lus à la demande.** Ce manuel dit à ton Claude *quand* les ouvrir : ton plan avant de choisir une tâche, `DESIGN.md`+`BRAND.md` avant de coder une page, `TEAM-STATUS.md`+le journal de l'autre avant d'agir. Ton Claude les ouvre lui-même avec l'outil de lecture de fichiers — tu n'as pas à copier-coller.
- **Ton seul geste manuel** : ouvrir Claude Code (ou Cowork) **dans le dossier du repo**, et lui dire ta tâche. Il fait le reste en suivant ce manuel.
- Si tu travailles dans une interface qui NE lit PAS le disque, alors seulement : colle `CLAUDE.md` + ton `PLAN-<dev>.md` en début de conversation.

**Rappel final** : `fetch` → lire STATUS → lire le journal de l'autre → vérifier OWNERSHIP → (design : relire DESIGN+BRAND) → verrouiller → agir → journal → push. Toujours. Sans exception.
