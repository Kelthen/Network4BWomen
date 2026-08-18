// OWNED BY: rhamon — API Contact. Voir docs/DATA-MODEL.md (form_submissions).
// Écriture publique via client serveur (SERVICE_ROLE_KEY) — jamais côté client.
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Sujets exposés (CONTENT §10) → type normalisé dans form_submissions.
const SUBJECT_TO_TYPE: Record<string, string> = {
  general: "contact",
  partnership: "partner",
  media: "contact",
  volunteer: "volunteer",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const subject = String(body.subject ?? "general").trim();

  // Validation serveur.
  if (name.length < 2 || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json(
      { error: "Please check your name, email, and message (min. 10 characters)." },
      { status: 422 },
    );
  }

  const type = SUBJECT_TO_TYPE[subject] ?? "contact";

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    // Le formulaire n'est pas encore branché (clés Supabase absentes).
    return NextResponse.json(
      { error: "The form isn't active yet. Please email us at info.networkofblackwomen@gmail.com." },
      { status: 503 },
    );
  }

  const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });
  const { error } = await supabase.from("form_submissions").insert({
    type,
    name,
    email,
    message,
    payload: { subject },
    status: "new",
  });

  if (error) {
    return NextResponse.json({ error: "Couldn't send right now. Please try again later." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
