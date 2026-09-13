-- 0009_newsletter_double_optin.sql
-- Ajoute le double opt-in (confirmation email) et le désabonnement CASL-compliant
-- à la table `newsletter_subscribers`.
--
-- Flux :
--   1. POST /api/newsletter → insère un rang { is_active:false, confirmation_token,
--      token_expires_at = now() + 48h }. Envoie un email « Confirm your subscription ».
--   2. GET /api/newsletter/confirm?token=xxx → vérifie validité + expiry, passe
--      is_active=true, set confirmed_at=now(), génère un manage_token permanent
--      (unsubscribe), efface confirmation_token / token_expires_at. Envoie welcome
--      + notifie l'équipe NBW.
--   3. GET /api/newsletter/unsubscribe?token=<manage_token> → is_active=false,
--      set unsubscribed_at=now(). Le rang est conservé (audit CASL).
--
-- Toutes les colonnes sont nullable — l'existant fonctionne sans changement.
-- Voir docs/DATA-MODEL.md pour le schéma agrégé.

alter table public.newsletter_subscribers
  add column if not exists confirmation_token text,
  add column if not exists token_expires_at   timestamptz,
  add column if not exists confirmed_at       timestamptz,
  add column if not exists manage_token       text,
  add column if not exists unsubscribed_at    timestamptz;

-- Unicité des tokens (les deux séparés pour éviter les collisions entre confirmation
-- et gestion post-confirmation).
create unique index if not exists newsletter_subscribers_confirmation_token_uidx
  on public.newsletter_subscribers (confirmation_token)
  where confirmation_token is not null;

create unique index if not exists newsletter_subscribers_manage_token_uidx
  on public.newsletter_subscribers (manage_token)
  where manage_token is not null;

comment on column public.newsletter_subscribers.confirmation_token is
  'Token unique généré à l''inscription. Consommé (nulled) après GET /api/newsletter/confirm.';
comment on column public.newsletter_subscribers.token_expires_at is
  'Expiration du confirmation_token (48h). Au-delà, l''inscription doit être refaite.';
comment on column public.newsletter_subscribers.confirmed_at is
  'Timestamp de confirmation par le subscriber (clic sur le lien de l''email).';
comment on column public.newsletter_subscribers.manage_token is
  'Token permanent utilisé pour /api/newsletter/unsubscribe. Généré à la confirmation.';
comment on column public.newsletter_subscribers.unsubscribed_at is
  'Timestamp de désabonnement. Le rang est conservé pour audit CASL — is_active passe à false.';

-- 📌 IMPORTANT — rangs existants
-- Les subscribers déjà en base (avant cette migration) n'ont ni confirmation_token
-- ni manage_token. Trois choix pour eux :
--   a) « grand-parent » : les traiter comme déjà confirmés — leur générer un
--      manage_token pour qu'ils puissent se désabonner :
--
--        update public.newsletter_subscribers
--           set manage_token = encode(gen_random_bytes(24), 'hex'),
--               confirmed_at = coalesce(confirmed_at, subscribed_at)
--         where is_active = true
--           and manage_token is null;
--
--   b) forcer la re-confirmation : passer is_active=false et leur renvoyer un
--      email de confirmation (script hors migration, pilotable côté API).
--   c) ne rien faire : leur inscription reste active, mais ils n'ont pas de
--      lien de désabonnement en un clic (à éviter — CASL exige un moyen simple).
--
-- Recommandé : (a) pour NBW — la table est petite et ils étaient déjà opt-in.
-- Nécessite l'extension pgcrypto :
--   create extension if not exists pgcrypto;
