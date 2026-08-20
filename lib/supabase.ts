// OWNED BY: shared — client Supabase. Modif = coordonner (voir CLAUDE.md §1.2).
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // Ne bloque pas le build ; avertit en dev.
  console.warn("[supabase] NEXT_PUBLIC_SUPABASE_URL / ANON_KEY manquants — voir .env.example");
}

// Client public (lecture), `null` si les env vars ne sont pas configurées (build/dev sans
// secrets) — createClient() jette une erreur sur une URL vide, donc on ne le construit
// que si les deux valeurs sont présentes. Les appelants doivent gérer le cas `null`
// (fallback de contenu, ou 503) — jamais planter le build ou une page statique.
// Pour les écritures publiques (formulaires, webhooks), utiliser un client serveur avec
// la SERVICE_ROLE_KEY dans les routes API — jamais côté client.
export const supabase: SupabaseClient | null = url && anonKey ? createClient(url, anonKey) : null;
