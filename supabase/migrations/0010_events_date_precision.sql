-- 0010 — events.date_precision (serge, 2026-10-14)
--
-- Pourquoi : NBW annonce souvent des événements dont seul le mois (« January TBD »)
-- ou seule la date (heure à venir) est connue. Sans cette colonne, le site
-- affichait une date/heure inventée (placeholder) comme si elle était confirmée.
--
--   datetime → date + heure confirmées (comportement historique, défaut)
--   day      → date confirmée, heure à annoncer
--   month    → seul le mois est connu (starts_at = 1er du mois, sert au tri)
--
-- Additive, défaut 'datetime' : le code existant continue de fonctionner.

alter table public.events
  add column if not exists date_precision text not null default 'datetime';

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'events_date_precision_check'
  ) then
    alter table public.events
      add constraint events_date_precision_check
      check (date_precision in ('datetime', 'day', 'month'));
  end if;
end $$;
