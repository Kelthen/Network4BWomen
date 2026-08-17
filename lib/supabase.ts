// OWNED BY: shared — client Supabase. Modif = coordonner (voir CLAUDE.md §1.2).
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // Ne bloque pas le build ; avertit en dev.
  console.warn("[supabase] NEXT_PUBLIC_SUPABASE_URL / ANON_KEY manquants — voir .env.example");
}

// Client public (lecture). Pour les écritures publiques (formulaires, webhooks),
// utiliser un client serveur avec la SERVICE_ROLE_KEY dans les routes API — jamais côté client.
export const supabase = createClient(url ?? "", anonKey ?? "");
