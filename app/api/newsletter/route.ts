// OWNED BY: rhamon — Newsletter API. See docs/DATA-MODEL.md (newsletter_subscribers).
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  const source = String(body.source ?? "site").trim();

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    return NextResponse.json(
      { error: "Newsletter isn't active yet. Please email info.networkofblackwomen@gmail.com." },
      { status: 503 },
    );
  }

  const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });
  // Upsert on unique email: re-subscribing an existing address is a no-op success.
  const { error } = await supabase
    .from("newsletter_subscribers")
    .upsert({ email, source, is_active: true }, { onConflict: "email" });

  if (error) {
    return NextResponse.json({ error: "Couldn't subscribe right now. Please try again later." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
