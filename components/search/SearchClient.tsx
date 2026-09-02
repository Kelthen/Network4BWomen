// OWNED BY: serge — Recherche site. Filtrage instantané côté client sur un index
// déjà chargé côté serveur (pas de requête réseau à chaque frappe).
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export type SearchHit = {
  type: "Program" | "Event" | "Resource" | "Article" | "Page";
  title: string;
  excerpt: string | null;
  href: string;
};

const TYPE_LABELS: Record<SearchHit["type"], string> = {
  Program: "Program",
  Event: "Event",
  Resource: "Resource",
  Article: "News & Stories",
  Page: "Page",
};

function normalize(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function SearchClient({ items }: { items: SearchHit[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return [];
    return items.filter((item) => {
      const haystack = normalize(`${item.title} ${item.excerpt ?? ""}`);
      return haystack.includes(q);
    });
  }, [items, query]);

  return (
    <div>
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search programs, events, resources, articles..."
          aria-label="Search the site"
          autoFocus
          className="w-full rounded-full border border-brand-beige bg-white px-6 py-4 text-lg text-brand-brown shadow-[0_1px_0_#e8dcc8] outline-none transition focus:border-brand-brown/40"
        />
      </div>

      <div className="mt-8">
        {query.trim() === "" ? (
          <p className="text-sm text-brand-brown/60">
            Start typing to search across the whole site.
          </p>
        ) : results.length === 0 ? (
          <p className="text-sm text-brand-brown/60">
            No results for &ldquo;{query}&rdquo;. Try a different word.
          </p>
        ) : (
          <>
            <p className="mb-4 text-xs uppercase tracking-wider text-brand-brown/60">
              {results.length} result{results.length === 1 ? "" : "s"}
            </p>
            <ul className="divide-y divide-brand-beige">
              {results.map((item, i) => (
                <li key={`${item.href}-${i}`} className="py-5">
                  <Link href={item.href} className="group block">
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-goldText">
                      {TYPE_LABELS[item.type]}
                    </span>
                    <h2 className="mt-1 font-serif text-xl text-brand-brown transition group-hover:text-brand-brown/70">
                      {item.title}
                    </h2>
                    {item.excerpt && (
                      <p className="mt-1 line-clamp-2 text-sm text-brand-brown/75">
                        {item.excerpt}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
