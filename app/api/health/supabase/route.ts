// TEMPORAIRE — diagnostic de connexion Supabase. Ne révèle aucun secret
// (uniquement présence des variables + host de l'URL + existence des tables).
// À SUPPRIMER après vérification.
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const present = { url: Boolean(url), service_role: Boolean(service), anon: Boolean(anon) };

  let host: string | null = null;
  try {
    host = url ? new URL(url).host : null;
  } catch {
    host = "INVALID_URL_FORMAT";
  }

  if (!url || !service) {
    return NextResponse.json({ ok: false, reason: "missing_env", present, host });
  }

  try {
    const sb = createClient(url, service, { auth: { persistSession: false } });
    const tables: Record<string, unknown> = {};
    for (const t of ["form_submissions", "newsletter_subscribers", "donations"]) {
      const { error, count } = await sb.from(t).select("*", { count: "exact", head: true });
      tables[t] = error ? { error: error.message } : { ok: true, count };
    }
    return NextResponse.json({ ok: true, present, host, tables });
  } catch (e) {
    return NextResponse.json({
      ok: false,
      reason: "client_error",
      present,
      host,
      error: e instanceof Error ? e.message : String(e),
    });
  }
}
