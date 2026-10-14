-- Synchro contenu Supabase ← fiche NBW « Website Detail Edits » (partagée le 2026-10-10)
-- Auteur : serge · 2026-10-14 · Sauvegarde avant modif : 2026-10-14_backup-avant-sync-fiche-nbw.json
--
-- Contexte : la passe du 2026-09-15 (PR #57/#58) a mis à jour les FALLBACKS du code,
-- mais les pages Programs / Resources / Events lisent Supabase en priorité. La base
-- contenait encore l'ancien contenu (Mentorship, Health & Wellness, Templates & Guides,
-- conférence « Toronto », ancien lien Bloomtickets…) → c'est ce que NBW voyait en ligne.
-- Ce script aligne la base sur les fallbacks validés + la fiche du 10 octobre.
-- Requiert la migration 0010 (events.date_precision).

begin;

-- ── Programs : 7 → 5 (Mentorship + Health & Wellness désactivés, pas supprimés) ──
update programs set slug = 'networking', title = 'Networking',
  purpose = 'Opportunities for professional connections for Business Owners & Thought Leaders.',
  who_it_serves = 'Business owners & thought leaders',
  photos = array['/images/programs/networking.jpg'], sort_order = 1, is_active = true
  where id = '4d2a4c4d-1274-42b9-9646-1f0fdf8d451c';

update programs set title = 'Leadership Development',
  purpose = 'Inspiring the next generation of leaders & voices.',
  photos = array['/images/programs/leadership-development.jpg'], sort_order = 2, is_active = true
  where id = 'c779b295-bf86-44ea-8bd9-2d17f4b2c4a7';

update programs set title = 'Community & Events',
  purpose = 'Fostering a safe space for the Black community to thrive.',
  photos = array['/images/programs/community-events.jpg'], sort_order = 3, is_active = true
  where id = '617b32a6-630b-4ac8-99be-3350b5aa1b4f';

update programs set
  purpose = 'Skills, celebration, and belonging for Black girls and young women.',
  photos = array['/images/programs/youth-programming.jpg'], sort_order = 4, is_active = true
  where id = '2c7bcf38-1940-4820-bdb2-bbec6a0a0fcf';

update programs set
  photos = array['/images/programs/annual-conference-summit.jpg'], sort_order = 5, is_active = true
  where id = '83f1a20d-e461-4064-a785-360704cff8c0';

update programs set is_active = false, sort_order = 98 where id = '327a6e27-8706-437b-b3f9-244fa92db70a'; -- Mentorship
update programs set is_active = false, sort_order = 99 where id = 'ba94f458-e745-47ee-8f9c-7c55b6581e51'; -- Health & Wellness

-- ── Resources : Templates & Guides retiré, PD Tools fusionné dans Career ──
update resources set title = 'Scholarships (Coming Soon)',
  description = 'Funding opportunities for the Black community.', sort_order = 1
  where id = '460fdc83-7446-4855-a151-1527e673ed4a';
update resources set
  description = 'Job boards, resume help, & professional development tools.', sort_order = 2
  where id = 'eee69942-6587-4d01-a93d-8a95152065c3';
update resources set sort_order = 3 where id = 'dd9c2433-a1d5-4980-8ba2-4b8b91a7e1ae'; -- Mental Health
update resources set sort_order = 4 where id = 'ed6dbeaa-f0d9-4cbf-8191-c7483cb11fcb'; -- Business Directory
update resources set sort_order = 5 where id = 'b2731fbd-054a-4df4-96ae-541a5cdfd884'; -- Community Resources
delete from resources where id in (
  '41aa921f-6be4-4af0-9fe5-b10ef0af9c94',  -- Templates & Guides
  '5372cafc-6e7c-43c1-83a8-cae3da1c73c5'   -- Professional Development Tools (« courses, templates »)
);

-- ── Events : les événements réels de la fiche (Girl Talk reporté) ──
-- Girl Talk & Gratitude : reporté à l'an prochain (Serge, 2026-10-14) → retiré.
-- Aucune inscription liée ; la ligne complète est dans la sauvegarde JSON pour 2027.
delete from events where id = 'ed706ce2-ac92-4e42-a2b2-6578277f53ad';

-- L'ancienne « NBW Annual Conference & Summit — Toronto, 5 déc. » devient Our Essence
-- (même id → le placeholder conference_speakers reste rattaché, puis on le retire).
update events set
  slug = 'our-essence-conference', title = 'Our Essence Conference',
  description = 'Alberta''s most premium and anticipated Black Women Leadership conference for young professionals, entrepreneurs, creatives and leaders coming together to serve our community. Theme: She Deserves Rest.',
  category = 'Annual Conference',
  starts_at = '2027-03-06T09:00:00-07:00', ends_at = null,
  location = 'Excite Lethbridge, 101 Exhibition Way South, Lethbridge AB',
  cover_url = '/images/conference/hero.jpg', is_conference = true, capacity = null,
  registration_url = null, date_precision = 'day'
  where id = '7b46618f-63a5-4101-af18-2947a7740d8e';

-- Placeholder « To be announced / Keynote » : la page conférence affiche déjà son
-- propre état « To be announced » quand il n'y a aucun intervenant.
delete from conference_speakers where id = 'cd481164-41d7-4718-98fe-7d756bf8fdf9';

-- Événements fictifs / obsolètes (aucune inscription liée — vérifié).
delete from events where id in (
  '680cb76c-3688-4c99-acf7-0125ffe6a287',  -- Leadership Roundtable (jamais annoncé par NBW)
  '8a2ead95-4699-402e-9bec-70936f4bbc7a'   -- Wellness & Self-Care Morning (passé, ancien contenu Toronto)
);

insert into events (slug, title, description, category, starts_at, ends_at, location, cover_url, is_conference, capacity, date_precision)
values
  ('chapter-collective', 'Chapter Collective', null, 'Community',
   '2026-11-01T18:00:00-07:00', null, 'TBA', '/images/events/img-1702.jpg', false, null, 'day'),
  ('nbw-career-conversations', 'NBW: Career Conversations', null, 'Professional',
   '2027-01-01T12:00:00-07:00', null, 'TBA', '/images/events/img-6705.jpg', false, null, 'month'),
  ('paint-and-sip', 'Paint & Sip', null, 'Community',
   '2027-03-05T18:00:00-07:00', null, 'Lethbridge AB', '/images/events/img-6720.jpg', false, null, 'day'),
  ('she-deserves-rest', 'She Deserves Rest', null, 'Retreat',
   '2027-03-07T10:00:00-07:00', null, 'TBA', '/images/events/img-6793.jpg', false, null, 'day')
on conflict (slug) do nothing;

commit;
