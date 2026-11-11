-- 0011 — site_unlock_attempts (rhamon, 2026-11-11)
--
-- Pourquoi : le site est verrouillé derrière une page 404 (middleware.ts). L'accès
-- privé se fait par code. Pour bloquer le devinage : 3 essais ratés par IP, puis
-- blocage 24 h. Le compteur doit être partagé entre toutes les instances Vercel,
-- d'où une table (la mémoire serverless n'est pas partagée).
--
-- Vie privée : on ne stocke jamais l'IP en clair, seulement une empreinte SHA-256 salée.
-- Accès : service_role uniquement (RLS activée, aucune policy, droits retirés à anon).

create table if not exists public.site_unlock_attempts (
  ip_hash      text primary key,
  failures     int not null default 0,
  locked_until timestamptz,
  updated_at   timestamptz not null default now()
);

alter table public.site_unlock_attempts enable row level security;
revoke all on table public.site_unlock_attempts from anon, authenticated;

-- Enregistre un échec de façon atomique et renvoie l'état.
-- Un compteur dont le dernier échec date de plus de p_lock repart de zéro.
create or replace function public.site_unlock_fail(p_ip_hash text, p_max int, p_lock interval)
returns table (out_failures int, out_locked_until timestamptz)
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.site_unlock_attempts as a (ip_hash, failures, updated_at)
  values (p_ip_hash, 1, now())
  on conflict (ip_hash) do update set
    failures = case
      when (a.locked_until is not null and a.locked_until <= now())
        or (a.locked_until is null and a.updated_at < now() - p_lock)
      then 1
      else a.failures + 1
    end,
    locked_until = case when a.locked_until is not null and a.locked_until <= now() then null else a.locked_until end,
    updated_at = now();

  update public.site_unlock_attempts a
     set locked_until = now() + p_lock
   where a.ip_hash = p_ip_hash and a.failures >= p_max and a.locked_until is null;

  return query
    select a.failures, a.locked_until from public.site_unlock_attempts a where a.ip_hash = p_ip_hash;
end;
$$;

revoke execute on function public.site_unlock_fail(text, int, interval) from public, anon, authenticated;
grant execute on function public.site_unlock_fail(text, int, interval) to service_role;
