// OWNED BY: serge — Event registration API.
// Pattern from rhamon: secrets in env, 503 if absent, honeypot, Supabase SERVICE_ROLE_KEY.
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
// Hardening sécurité ajouté par rhamon (checklist #3/#11), coordonné — voir journal.
import { getClientIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Plafonds de longueur (anti-abus / payload).
const MAX = { name: 100, email: 200, phone: 40, notes: 2000 };

export async function POST(req: Request) {
  // Rate limiting : 5 inscriptions / minute / IP (best-effort, anti-spam).
  const rl = rateLimit(`registrations:${getClientIp(req)}`, 5, 60_000);
  if (!rl.ok) return tooManyRequests(rl.retryAfter);

  // Guard: Supabase not configured
  if (!url || !serviceKey) {
    return NextResponse.json(
      { error: "Registration service is not configured yet." },
      { status: 503 }
    );
  }

  const supabaseAdmin = createClient(url, serviceKey);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const { event_id, name, email, phone, notes } = body as {
    event_id?: string;
    name?: string;
    email?: string;
    phone?: string | null;
    notes?: string | null;
  };

  // Validate required fields
  if (!event_id || !name || !email) {
    return NextResponse.json(
      { error: "event_id, name, and email are required." },
      { status: 400 }
    );
  }

  // Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  // Validate lengths (anti-abus / payload)
  if (
    name.length > MAX.name ||
    email.length > MAX.email ||
    (phone != null && phone.length > MAX.phone) ||
    (notes != null && notes.length > MAX.notes)
  ) {
    return NextResponse.json({ error: "One or more fields are too long." }, { status: 422 });
  }

  // Check event exists
  const { data: event, error: eventErr } = await supabaseAdmin
    .from("events")
    .select("id, capacity")
    .eq("id", event_id)
    .single();

  if (eventErr || !event) {
    return NextResponse.json({ error: "Event not found." }, { status: 404 });
  }

  // Check capacity if set
  if (event.capacity) {
    const { count } = await supabaseAdmin
      .from("registrations")
      .select("id", { count: "exact", head: true })
      .eq("event_id", event_id)
      .neq("status", "cancelled");

    if (count !== null && count >= event.capacity) {
      return NextResponse.json(
        { error: "This event is full." },
        { status: 409 }
      );
    }
  }

  // Insert registration
  const { error: insertErr } = await supabaseAdmin.from("registrations").insert({
    event_id,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || null,
    notes: notes?.trim() || null,
    status: "pending",
  });

  if (insertErr) {
    console.error("[registrations] insert error:", insertErr);
    return NextResponse.json(
      { error: "Could not save registration." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
