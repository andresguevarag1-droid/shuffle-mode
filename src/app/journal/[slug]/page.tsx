import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  JOURNAL,
  getPost,
  journalHref,
  formatDate,
} from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return JOURNAL.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} · Shuffle Mode`,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default async function JournalPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = JOURNAL.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="py-10 md:py-16">
      <div className="container-x">
        <nav className="text-sm text-stone" aria-label="Breadcrumb">
          <Link href="/journal" className="hover:text-ink transition-colors">
            Journal
          </Link>
          <span className="mx-2 text-ink/30">/</span>
          <span className="text-ink/70">{post.tag}</span>
        </nav>

        <header className="mx-auto max-w-3xl mt-8 text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-stone">
            {post.tag} · {formatDate(post.date)} · {post.readMinutes} min read
          </span>
          <h1 className="font-display mt-5 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.03]">
            {post.title}
          </h1>
          <p className="mt-6 text-lg text-stone leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        <div
          className="editorial-frame mx-auto max-w-4xl mt-10 aspect-[16/9] rounded-3xl"
          style={{
            background: `linear-gradient(150deg, ${post.palette[0]}, ${post.palette[1]})`,
          }}
        />

        <div className="mx-auto max-w-2xl mt-12 space-y-6 text-lg leading-relaxed text-ink/85">
          {post.body.map((para, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "first-letter:font-display first-letter:text-5xl first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:leading-[0.8] first-letter:text-ember"
                  : undefined
              }
            >
              {para}
            </p>
          ))}
        </div>

        <div className="mx-auto max-w-2xl mt-12 border-t border-ink/10 pt-6">
          <Link
            href="/journal"
            className="text-sm text-stone hover:text-ink transition-colors"
          >
            ← All journal entries
          </Link>
        </div>

        {/* Keep reading */}
        <section className="mt-20 md:mt-28">
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-8">
            Keep reading
          </h2>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-12">
            {more.map((p) => (
              <Link key={p.slug} href={journalHref(p)} className="group block">
                <div
                  className="editorial-frame aspect-[16/10] rounded-2xl"
                  style={{
                    background: `linear-gradient(150deg, ${p.palette[0]}, ${p.palette[1]})`,
                  }}
                />
                <span className="mt-4 block text-xs uppercase tracking-[0.2em] text-stone">
                  {p.tag}
                </span>
                <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight group-hover:text-ember transition-colors">
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
