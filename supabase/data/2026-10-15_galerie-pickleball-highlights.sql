-- Galerie « Pastels & Pickleball » (2026) : remplace les 11 captures d'écran par les
-- 15 vraies photos du dossier Drive « Highlights » (fiche NBW du 2026-10-10 :
-- « Please use the real photos for the pickle rather than screenshots »).
-- Les photos sont servies par le site (public/images/gallery/pickleball/) : n'exécuter
-- ce script qu'APRÈS le merge et le déploiement de la PR qui les ajoute.
-- Aucune suppression : 11 lignes mises à jour + 4 ajoutées. Les anciens fichiers restent
-- dans le bucket `gallery`. Sauvegarde : 2026-10-15_backup-galerie-pickleball.json

begin;
update gallery_media g set image_url = v.url, sort_order = v.ord
from (values
  ('43a64809-36c9-4eaf-9e71-9672d3ace9d6'::uuid, '/images/gallery/pickleball/pickleball-highlights-01.jpg', 1),
  ('340fac27-f1a4-438b-b2a1-4b1c57d937d8'::uuid, '/images/gallery/pickleball/pickleball-highlights-02.jpg', 2),
  ('8c9aa6cc-31fc-453e-a516-077d3f2dddf1'::uuid, '/images/gallery/pickleball/pickleball-highlights-03.jpg', 3),
  ('33b11a57-4cb3-4041-8d4d-3651be085f36'::uuid, '/images/gallery/pickleball/pickleball-highlights-04.jpg', 4),
  ('7e197d96-badb-43ad-9104-8e187f456a51'::uuid, '/images/gallery/pickleball/pickleball-highlights-05.jpg', 5),
  ('32115a18-0f85-4bf6-9c7c-942cdf8739a6'::uuid, '/images/gallery/pickleball/pickleball-highlights-06.jpg', 6),
  ('ad8175c4-913f-47e8-a9ee-9fed1b1be372'::uuid, '/images/gallery/pickleball/pickleball-highlights-07.jpg', 7),
  ('268eca27-e460-47c4-819f-318f264d0511'::uuid, '/images/gallery/pickleball/pickleball-highlights-08.jpg', 8),
  ('83f245db-527b-404e-8ae7-f091feaa7b51'::uuid, '/images/gallery/pickleball/pickleball-highlights-09.jpg', 9),
  ('a04e05ae-eecb-4e64-a974-1710c51922b0'::uuid, '/images/gallery/pickleball/pickleball-highlights-10.jpg', 10),
  ('e10ef890-dd74-40cc-8dc5-81f7f7028485'::uuid, '/images/gallery/pickleball/pickleball-highlights-11.jpg', 11)
) as v(id, url, ord)
where g.id = v.id and g.year = 2026;

insert into gallery_media (year, event_name, image_url, caption, sort_order) values
  (2026, 'Pastels & Pickleball', '/images/gallery/pickleball/pickleball-highlights-12.jpg', null, 12),
  (2026, 'Pastels & Pickleball', '/images/gallery/pickleball/pickleball-highlights-13.jpg', null, 13),
  (2026, 'Pastels & Pickleball', '/images/gallery/pickleball/pickleball-highlights-14.jpg', null, 14),
  (2026, 'Pastels & Pickleball', '/images/gallery/pickleball/pickleball-highlights-15.jpg', null, 15);
commit;
