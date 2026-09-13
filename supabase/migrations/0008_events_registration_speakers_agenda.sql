-- 0008_events_registration_speakers_agenda.sql
-- Étend la table `events` pour supporter :
--   - un lien d'inscription EXTERNE (Bloomtickets, Eventbrite, Lu.ma…) sans avoir
--     à coller l'URL dans la description ;
--   - une liste de speakers optionnelle (nom, rôle, bio, photo) affichée sur la page détail ;
--   - un agenda optionnel (paires time/item) pour l'aperçu du programme.
--
-- Toutes les colonnes sont nullable — l'existant fonctionne sans changement.
-- Voir docs/DATA-MODEL.md pour le schéma agrégé et
-- app/(site)/events/[slug]/page.tsx pour la consommation côté rendu.

alter table public.events
  add column if not exists registration_url text,
  add column if not exists speakers jsonb,
  add column if not exists agenda jsonb;

comment on column public.events.registration_url is
  'Lien externe vers la billetterie (Bloomtickets, Eventbrite, etc.). Si présent, le CTA "Register" pointe ici et le formulaire interne est masqué.';

comment on column public.events.speakers is
  'jsonb array de { name, role?, bio?, photo_url? } — affiché comme section Speakers sur la page détail.';

comment on column public.events.agenda is
  'jsonb array de { time, item } — affiché comme "Program" sur la page détail, dans l''ordre reçu.';

-- Contraintes légères de type (permet null, exige array quand présent).
alter table public.events
  drop constraint if exists events_speakers_is_array_chk,
  drop constraint if exists events_agenda_is_array_chk;

alter table public.events
  add constraint events_speakers_is_array_chk
    check (speakers is null or jsonb_typeof(speakers) = 'array'),
  add constraint events_agenda_is_array_chk
    check (agenda is null or jsonb_typeof(agenda) = 'array');

-- 📌 NETTOYAGE DE DONNÉES À FAIRE MANUELLEMENT après application de cette migration
-- (impossible à automatiser proprement — dépend de rangs saisis à la main) :
--
-- 1) « Girl Talk & Gratitude » : sortir l'URL Bloomtickets de description → registration_url,
--    et laisser dans description uniquement la prose.
--    Exemple :
--      update public.events
--         set registration_url = 'https://network-of-black-women.bloomtickets.ca/event/2960?GirlTalk&Gratitude',
--             description = 'An intimate evening built around honest conversation, hands-on flower making, and gratitude…'
--       where slug = 'girl-talk-and-gratitude';
--
-- 2) « Wellness & Self-Care Morning » : location est encore « Toronto » en base — la passer à Alberta
--    (ou à la vraie ville si disponible).
--      update public.events
--         set location = 'Alberta'
--       where slug = 'wellness-self-care-morning';
