// OWNED BY: shared — limiteur de débit best-effort pour les routes API publiques.
// Fenêtre glissante en mémoire, par instance. ⚠️ Sur serverless (Vercel) la mémoire
// n'est pas partagée entre instances : c'est une PREMIÈRE barrière anti-spam/flood,
// pas une protection distribuée. Pour du robuste, brancher Upstash Redis. Pour un
// site vitrine (formulaires contact/newsletter/inscriptions), c'est suffisant et
// sans dépendance ni configuration.

type Hit = { count: number; reset: number };

const store = new Map<string, Hit>();

/** IP de l'appelant, depuis les en-têtes de proxy (Vercel place la vraie IP dans x-forwarded-for). */
export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") || "unknown";
}

/**
 * Autorise au plus `limit` requêtes par `windowMs` pour une `key` donnée.
 * @returns ok=false + retryAfter (secondes) si la limite est dépassée.
 */
export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000,
): { ok: boolean; retryAfter: number } {
  const now = Date.now();

  // Nettoyage paresseux : évite la croissance mémoire sans timer.
  if (store.size > 5000) {
    for (const [k, v] of store) if (now > v.reset) store.delete(k);
  }

  const hit = store.get(key);
  if (!hit || now > hit.reset) {
    store.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  hit.count += 1;
  if (hit.count > limit) {
    return { ok: false, retryAfter: Math.ceil((hit.reset - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}

/** Réponse 429 prête à l'emploi (avec en-tête Retry-After). */
export function tooManyRequests(retryAfter: number): Response {
  return new Response(
    JSON.stringify({ error: "Too many requests. Please wait a moment and try again." }),
    {
      status: 429,
      headers: { "Content-Type": "application/json", "Retry-After": String(retryAfter) },
    },
  );
}
