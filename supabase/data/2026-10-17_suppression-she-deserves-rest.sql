-- Notes NBW du 16/10 : « Remove She Deserves Rest ».
-- À lancer dans Supabase → SQL Editor (le connecteur de Claude ne peut pas exécuter de DELETE).
-- Aucune inscription ni speaker rattaché (vérifié le 17/10). Sauvegarde de la ligne :
-- 2026-10-17_backup-notes-nbw.json
delete from events where slug = 'she-deserves-rest';
