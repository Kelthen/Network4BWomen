// OWNED BY: rhamon — Newsletter unsubscribe (CASL-compliant).
// GET /api/newsletter/unsubscribe?token=<manage_token> → is_active=false + unsubscribed_at.
// Le rang est CONSERVÉ (audit CASL — trace de l'inscription + désinscription).
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function redirect(state: "ok" | "invalid" | "unavailable"): NextResponse {
  const dest = new URL(`${SITE_URL}/newsletter/unsubscribed`);
  if (state !== "ok") dest.searchParams.set("state", state);
  return NextResponse.redirect(dest, { status: 302 });
}

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token")?.trim() ?? "";
  if (!token || token.length > 200) return redirect("invalid");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return redirect("unavailable");

  const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

  const { data: row, error: fetchErr } = await supabase
    .from("newsletter_subscribers")
    .select("id")
    .eq("manage_token", token)
    .maybeSingle();

  if (fetchErr) {
    console.error("[newsletter/unsubscribe] fetch error:", fetchErr.message);
    return redirect("unavailable");
  }
  if (!row) return redirect("invalid");

  const { error: updErr } = await supabase
    .from("newsletter_subscribers")
    .update({ is_active: false, unsubscribed_at: new Date().toISOString() })
    .eq("id", row.id);

  if (updErr) {
    console.error("[newsletter/unsubscribe] update error:", updErr.message);
    return redirect("unavailable");
  }

  return redirect("ok");
}
