// OWNED BY: serge — News article detail page.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Reveal from "@/components/home/Reveal";
import { coverImage } from "@/lib/media";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

const EYEBROW = "text-xs font-semibold uppercase tracking-[0.22em] text-brand-goldText";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await supabase
    .from("posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!data) return { title: "Article — NBW" };

  return {
    title: `${data.title} — Network of Black Women (NBW)`,
    description: data.excerpt ?? "A story from Network of Black Women.",
  };
}

function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!post) notFound();

  const paragraphs = (post.body ?? "").split(/\n\s*\n/).filter(Boolean);

  return (
    <div className="bg-brand-cream text-brand-brown">
      {/* Hero */}
      <header className="relative overflow-hidden">
        {post.cover_url && (
          <div
            className="absolute inset-0 opacity-20"
            style={coverImage(post.cover_url, "linear-gradient(160deg,#e9c8c9,#ffbbbb)")}
            aria-hidden="true"
          />
        )}
        <div className="relative mx-auto max-w-3xl px-6 pt-24 pb-14 md:pt-32">
          <Reveal as="p" className={EYEBROW}>
            {post.category ?? "News"}
          </Reveal>
          <Reveal
            as="h1"
            delay={1}
            className="mt-4 font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl"
          >
            {post.title}
          </Reveal>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-brand-brown/80">
            {post.author && <span>{post.author}</span>}
            {post.published_at && <span>{formatPostDate(post.published_at)}</span>}
          </div>
          {post.excerpt && (
            <Reveal as="p" delay={2} className="mt-6 max-w-2xl text-lg text-brand-brown/80">
              {post.excerpt}
            </Reveal>
          )}
        </div>
      </header>

      {/* Body */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="prose-brand grid gap-5">
          {paragraphs.length > 0 ? (
            paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-brand-brown/85">
                {p}
              </p>
            ))
          ) : (
            <p className="text-base leading-relaxed text-brand-brown/70">
              Full article coming soon.
            </p>
          )}
        </div>
      </section>

      {/* Back */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <Link
          href="/news"
          className="text-sm font-semibold text-brand-brown/75 transition hover:text-brand-brown"
        >
          ← Back to News & Stories
        </Link>
      </section>
    </div>
  );
}
