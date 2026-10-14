-- Galerie « Annual Conference » 2025 : 89 → 15 photos (fiche NBW du 2026-10-10 :
-- « use only about 10-15 photos and ensure they are not duplicated »).
-- Feu vert Serge (chat, 2026-10-14) : « enlève la plupart et garde 15 photos ».
-- Sauvegarde des 89 lignes : 2026-10-14_backup-galerie-conference.json
-- (les fichiers restent dans le bucket `gallery` ; seules les lignes sont retirées).
-- Sélection : les photos déjà validées et utilisées sur le site (couvertures events /
-- programmes), complétées par des vues réparties sur la séquence ; doublons `_1` et
-- images de rafale (numéros consécutifs) écartés.

begin;
delete from gallery_media where year = 2025 and id not in (
  '1b8702c0-639f-44d3-b0ec-33726091b4ab',
  'bd83485f-5a13-435f-9e22-51d83b6acc0e',
  'd1ce75e0-81b4-4e82-9bcb-32cd2b6cb331',
  'c63589f7-867e-4481-b6c0-9f32b05e3dea',
  'a2637b3c-7f30-464f-a275-b7c160566dd4',
  '8e581494-0806-4fc1-8b0d-cc3048854c1f',
  'acd5a7a2-e646-466a-ab1d-4ca95f602d6f',
  '49e9dcd5-d308-42b0-b8b5-273c99bfd6ef',
  '62077c26-48d9-4f03-819f-a88a061af16c',
  'aa1fd97e-4c1f-4345-a255-dac32bc5c0a1',
  '70d6c016-6e0b-4042-8943-e52dd9f6a8ce',
  '784035c1-e901-44b5-97cf-1503f39e1162',
  'ef1b141c-3cc0-44f3-b99d-ce323025669e',
  'a88bf316-bf42-44f3-942f-928f24041015',
  '6ab23c01-e8d5-41a6-a5d2-eebbf1588090'
);
update gallery_media set sort_order = 1 where id = '1b8702c0-639f-44d3-b0ec-33726091b4ab'; -- IMG_6705.JPG
update gallery_media set sort_order = 2 where id = 'bd83485f-5a13-435f-9e22-51d83b6acc0e'; -- IMG_1702.JPG
update gallery_media set sort_order = 3 where id = 'd1ce75e0-81b4-4e82-9bcb-32cd2b6cb331'; -- IMG_6793.JPG
update gallery_media set sort_order = 4 where id = 'c63589f7-867e-4481-b6c0-9f32b05e3dea'; -- IMG_6724.JPG
update gallery_media set sort_order = 5 where id = 'a2637b3c-7f30-464f-a275-b7c160566dd4'; -- IMG_6720.JPG
update gallery_media set sort_order = 6 where id = '8e581494-0806-4fc1-8b0d-cc3048854c1f'; -- BFE2C276-832C-4D27-9539-6747CD22A189.JPG
update gallery_media set sort_order = 7 where id = 'acd5a7a2-e646-466a-ab1d-4ca95f602d6f'; -- IMG_1627.JPG
update gallery_media set sort_order = 8 where id = '49e9dcd5-d308-42b0-b8b5-273c99bfd6ef'; -- IMG_1719.JPG
update gallery_media set sort_order = 9 where id = '62077c26-48d9-4f03-819f-a88a061af16c'; -- IMG_1750.JPG
update gallery_media set sort_order = 10 where id = 'aa1fd97e-4c1f-4345-a255-dac32bc5c0a1'; -- IMG_1798.JPG
update gallery_media set sort_order = 11 where id = '70d6c016-6e0b-4042-8943-e52dd9f6a8ce'; -- IMG_6699.JPG
update gallery_media set sort_order = 12 where id = '784035c1-e901-44b5-97cf-1503f39e1162'; -- IMG_6858.JPG
update gallery_media set sort_order = 13 where id = 'ef1b141c-3cc0-44f3-b99d-ce323025669e'; -- IMG_1611.JPG
update gallery_media set sort_order = 14 where id = 'a88bf316-bf42-44f3-942f-928f24041015'; -- IMG_1672.JPG
update gallery_media set sort_order = 15 where id = '6ab23c01-e8d5-41a6-a5d2-eebbf1588090'; -- IMG_1819.JPG
commit;
