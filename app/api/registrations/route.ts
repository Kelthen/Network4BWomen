// OWNED BY: serge — Event registration API.
// Pattern from rhamon: secrets in env, 503 if absent, honeypot, Supabase SERVICE_ROLE_KEY.
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(req: Request) {
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
