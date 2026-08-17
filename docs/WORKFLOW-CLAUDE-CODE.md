# WORKFLOW-CLAUDE-CODE.md — Comment donner les tâches à ton Claude Code

Guide humain (rhamon / serge). Objectif : lancer une tâche proprement, sans collision, avec le bon contenu au bon endroit.

## 0. Une fois au tout début (par personne)
```bash
git clone https://github.com/kelthen/Network4BWomen.git
cd Network4BWomen
npm install
cp .env.example .env.local      # coller les clés Supabase (base DÉJÀ créée) + Stripe
```
Puis ouvre **Claude Code dans ce dossier**. Il lit `CLAUDE.md` automatiquement — tu n'as rien à coller.

## 1. Le rituel avant CHAQUE tâche (dis-le à ton Claude, ou il le fait via CLAUDE.md)
> « Applique le protocole d'ouverture : `git fetch --all --prune`, lis `TEAM-STATUS.md` et le journal de l'autre, vérifie `OWNERSHIP.yml`. Dis-moi ce que l'autre a en cours avant de commencer. »

## 2. Donner une tâche — le bon format
Un bon prompt de tâche contient : **la page/zone**, **le doc de contenu**, **le doc de design**. Exemples prêts à copier :

**rhamon — Accueil :**
> « Crée la branche `feat/rhamon/homepage`. Implémente la page d'accueil (`app/(site)/page.tsx`) en suivant `PLAN-rhamon.md`, le contenu de `docs/CONTENT.md` §1, et le design de `docs/DESIGN.md` + `docs/nbw-home-reference.html` (reprends le hero, les sections et le bandeau animé avant footer). Mets à jour mon journal et ouvre une PR. »

**rhamon — À propos :**
> « Branche `feat/rhamon/about`. Page À propos avec le texte VERBATIM de `docs/CONTENT.md` §2 (Our Story, Mission, Vision, Valeurs) et l'équipe depuis la table `team_members` (fallback `docs/TEAM.md`). Design selon `docs/DESIGN.md`. »

**serge — Événements :**
> « Branche `feat/serge/events`. Page Événements + inscription en ligne. Contenu `docs/CONTENT.md` §4, données depuis les tables `events`/`registrations` (base déjà créée), design `docs/DESIGN.md`. Journal + PR. »

## 3. Où le code doit mettre les infos (règle simple)
- **Texte fixe / éditorial** (mission, vision, à-propos) → directement dans le composant de la page, repris VERBATIM depuis `docs/CONTENT.md`.
- **Contenu dynamique** (programmes, événements, articles, galerie, témoignages, équipe) → **depuis Supabase** (base déjà créée, schéma dans `docs/DATA-MODEL.md`). Le code lit les tables ; on saisit les données dans Supabase.
- **Soumissions** (contact, bénévole, don) → écrites dans Supabase via routes API serveur.
- **Jamais** publier le contenu 🔴 INTERNE listé en bas de `docs/CONTENT.md`.

## 4. Finir une tâche (Definition of Done — CLAUDE.md §3)
lint + `tsc` OK · responsive · accessibilité AA · **journal mis à jour + `files_locked` libéré** · commit + push (déclenche `team-sync`) · PR avec le template rempli · review croisée par l'autre.

## 5. Pièges à éviter
- Ne jamais coder sans avoir lu `TEAM-STATUS.md` (risque de refaire/écraser).
- Ne pas toucher un fichier de la zone de l'autre (voir `OWNERSHIP.yml`). Zone `shared` = annoncer dans le journal avant.
- Ne pas inventer de chiffres d'impact ni de bios : marquer « placeholder » et demander à NBW.
