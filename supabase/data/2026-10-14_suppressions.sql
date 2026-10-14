-- Suppressions restantes — fiche NBW « Website Detail Edits » (2026-10-10) + Girl Talk reporté.
-- À coller dans Supabase → SQL Editor → Run (projet Network4BWomen).
-- Sauvegardes : 2026-10-14_backup-avant-sync-fiche-nbw.json et 2026-10-14_backup-galerie-conference.json
-- (les mises à jour non destructives ont déjà été appliquées le 2026-10-14).

begin;

-- Resources : Templates & Guides + Professional Development Tools (fusionné dans Career)
delete from resources where id in ('41aa921f-6be4-4af0-9fe5-b10ef0af9c94', '5372cafc-6e7c-43c1-83a8-cae3da1c73c5');

-- Events : Girl Talk (reporté à l'an prochain), Leadership Roundtable (fictif), Wellness Morning (passé, ancien contenu)
delete from events where id in (
  'ed706ce2-ac92-4e42-a2b2-6578277f53ad',
  '680cb76c-3688-4c99-acf7-0125ffe6a287',
  '8a2ead95-4699-402e-9bec-70936f4bbc7a'
);

-- Conférence : placeholder « To be announced / Keynote » (la page affiche son propre « To be announced »)
delete from conference_speakers where id = 'cd481164-41d7-4718-98fe-7d756bf8fdf9';

-- Galerie « Annual Conference » : 89 → 15 photos (les fichiers restent dans le bucket)
delete from gallery_media where year = 2025 and id not in (
  '1b8702c0-639f-44d3-b0ec-33726091b4ab','bd83485f-5a13-435f-9e22-51d83b6acc0e','d1ce75e0-81b4-4e82-9bcb-32cd2b6cb331',
  'c63589f7-867e-4481-b6c0-9f32b05e3dea','a2637b3c-7f30-464f-a275-b7c160566dd4','8e581494-0806-4fc1-8b0d-cc3048854c1f',
  'acd5a7a2-e646-466a-ab1d-4ca95f602d6f','49e9dcd5-d308-42b0-b8b5-273c99bfd6ef','62077c26-48d9-4f03-819f-a88a061af16c',
  'aa1fd97e-4c1f-4345-a255-dac32bc5c0a1','70d6c016-6e0b-4042-8943-e52dd9f6a8ce','784035c1-e901-44b5-97cf-1503f39e1162',
  'ef1b141c-3cc0-44f3-b99d-ce323025669e','a88bf316-bf42-44f3-942f-928f24041015','6ab23c01-e8d5-41a6-a5d2-eebbf1588090'
);
update gallery_media set sort_order = 1 where id = '1b8702c0-639f-44d3-b0ec-33726091b4ab';
update gallery_media set sort_order = 2 where id = 'bd83485f-5a13-435f-9e22-51d83b6acc0e';
update gallery_media set sort_order = 3 where id = 'd1ce75e0-81b4-4e82-9bcb-32cd2b6cb331';
update gallery_media set sort_order = 4 where id = 'c63589f7-867e-4481-b6c0-9f32b05e3dea';
update gallery_media set sort_order = 5 where id = 'a2637b3c-7f30-464f-a275-b7c160566dd4';
update gallery_media set sort_order = 6 where id = '8e581494-0806-4fc1-8b0d-cc3048854c1f';
update gallery_media set sort_order = 7 where id = 'acd5a7a2-e646-466a-ab1d-4ca95f602d6f';
update gallery_media set sort_order = 8 where id = '49e9dcd5-d308-42b0-b8b5-273c99bfd6ef';
update gallery_media set sort_order = 9 where id = '62077c26-48d9-4f03-819f-a88a061af16c';
update gallery_media set sort_order = 10 where id = 'aa1fd97e-4c1f-4345-a255-dac32bc5c0a1';
update gallery_media set sort_order = 11 where id = '70d6c016-6e0b-4042-8943-e52dd9f6a8ce';
update gallery_media set sort_order = 12 where id = '784035c1-e901-44b5-97cf-1503f39e1162';
update gallery_media set sort_order = 13 where id = 'ef1b141c-3cc0-44f3-b99d-ce323025669e';
update gallery_media set sort_order = 14 where id = 'a88bf316-bf42-44f3-942f-928f24041015';
update gallery_media set sort_order = 15 where id = '6ab23c01-e8d5-41a6-a5d2-eebbf1588090';

commit;
