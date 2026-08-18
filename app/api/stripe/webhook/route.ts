// OWNED BY: rhamon — Stripe webhook. Records completed donations in `donations`.
// Verifies the Stripe signature; requires STRIPE_WEBHOOK_SECRET. Secrets in env only.
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !webhookSecret) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  const stripe = new Stripe(secret);
  const raw = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (url && serviceKey) {
      const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });
      await supabase.from("donations").insert({
        stripe_session_id: session.id,
        amount_cents: session.amount_total ?? 0,
        currency: session.currency ?? "cad",
        donor_name: session.customer_details?.name ?? null,
        donor_email: session.customer_details?.email ?? session.customer_email ?? null,
        recurring: session.mode === "subscription",
        status: "completed",
      });
    }
  }

  return NextResponse.json({ received: true });
}
