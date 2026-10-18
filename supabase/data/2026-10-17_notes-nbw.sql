-- Notes NBW du 16/10 (validées par rhamon le 17/10).
-- Sauvegarde des valeurs d'avant : 2026-10-17_backup-notes-nbw.json
--   1. Our Essence Conference : 6–7 mars 2027 (date de fin), thème « She Deserves Rest » retiré.
--   2. She Deserves Rest : événement retiré.
--   3. Une photo par emplacement sur tout le site (hors galerie) : couvertures events,
--      photos des programmes et des articles News (planche validée le 17/10).
-- ✅ Points 1 et 3 exécutés le 17/10 via le connecteur Supabase (vérifiés).
-- ⏳ Point 2 (DELETE) : le connecteur bloque les suppressions → à lancer dans le SQL Editor :
--    supabase/data/2026-10-17_suppression-she-deserves-rest.sql

begin;

update events
   set ends_at = '2027-03-07T18:00:00-07:00',
       description = 'Alberta''s most premium and anticipated Black Women Leadership conference for young professionals, entrepreneurs, creatives and leaders coming together to serve our community.'
 where slug = 'our-essence-conference';

update events set cover_url = '/images/gallery/pickleball/pickleball-highlights-12.jpg' where slug = 'chapter-collective';
update events set cover_url = '/images/gallery/pickleball/pickleball-highlights-07.jpg' where slug = 'nbw-career-conversations';
update events set cover_url = '/images/gallery/pickleball/pickleball-highlights-15.jpg' where slug = 'paint-and-sip';

update programs set photos = array['/images/gallery/pickleball/pickleball-highlights-09.jpg'] where slug = 'networking';
update programs set photos = array['/images/gallery/pickleball/pickleball-highlights-10.jpg'] where slug = 'leadership-development';
update programs set photos = array['/images/gallery/pickleball/pickleball-highlights-06.jpg'] where slug = 'community-events';
update programs set photos = array['/images/gallery/pickleball/pickleball-highlights-03.jpg'] where slug = 'youth-programming';
update programs set photos = array['/images/events/img-6724.jpg'] where slug = 'annual-conference-summit';

update posts set cover_url = '/images/gallery/pickleball/pickleball-highlights-05.jpg' where slug = 'celebrating-wins';
update posts set cover_url = '/images/gallery/pickleball/pickleball-highlights-13.jpg' where slug = 'small-habits';
update posts set cover_url = '/images/gallery/pickleball/pickleball-highlights-11.jpg' where slug = 'looking-back';
update posts set cover_url = '/images/gallery/pickleball/pickleball-highlights-14.jpg' where slug = 'jamaica-hurricane-relief';

commit;
