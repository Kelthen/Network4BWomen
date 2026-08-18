// OWNED BY: rhamon — Stripe Checkout. Creates a Checkout Session (one-time or monthly).
// Secrets in env only (never committed). See docs/DATA-MODEL.md (donations) + PLAN-rhamon.md.
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const amount = Number(body.amount);
  const recurring = Boolean(body.recurring);
  const email = typeof body.email === "string" ? body.email.trim() : undefined;

  // Amount is in CAD dollars; guard the range, then convert to cents.
  if (!Number.isFinite(amount) || amount < 1 || amount > 100000) {
    return NextResponse.json({ error: "Please choose an amount between $1 and $100,000." }, { status: 422 });
  }
  const unitAmount = Math.round(amount * 100);

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Donations aren't active yet. Please email info.networkofblackwomen@gmail.com." },
      { status: 503 },
    );
  }

  const base = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
  const stripe = new Stripe(secret);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: recurring ? "subscription" : "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "cad",
            unit_amount: unitAmount,
            product_data: { name: "Donation to Network of Black Women" },
            ...(recurring ? { recurring: { interval: "month" } } : {}),
          },
        },
      ],
      customer_email: email,
      success_url: `${base}/donate?status=success`,
      cancel_url: `${base}/donate?status=cancel`,
      submit_type: recurring ? undefined : "donate",
    });

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: "Couldn't start checkout. Please try again." }, { status: 500 });
  }
}
