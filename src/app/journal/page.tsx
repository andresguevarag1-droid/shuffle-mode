import type { Metadata } from "next";
import Link from "next/link";
import { JOURNAL, journalHref, formatDate } from "@/lib/content";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes on dressing for the mood — styling, philosophy, and how Shuffle Mode makes its weekly drops.",
};

export default function JournalPage() {
  const [lead, ...rest] = JOURNAL;

  return (
    <section className="py-16 md:py-24">
      <div className="container-x">
        <header className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-stone">
            <span className="h-px w-8 bg-ember" /> The Journal
          </span>
          <h1 className="font-display mt-5 text-5xl md:text-6xl font-semibold tracking-tight">
            Notes on the mood
          </h1>
          <p className="mt-5 text-lg text-stone leading-relaxed">
            Styling, philosophy, and the thinking behind each drop — short reads
            for between the racks.
          </p>
        </header>

        {/* Lead story */}
        <Link
          href={journalHref(lead)}
          className="group mt-12 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          <div
            className="editorial-frame aspect-[16/10] rounded-3xl"
            style={{
              background: `linear-gradient(150deg, ${lead.palette[0]}, ${lead.palette[1]})`,
            }}
          />
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-stone">
              {lead.tag} · {lead.readMinutes} min read
            </span>
            <h2 className="font-display mt-4 text-3xl md:text-4xl font-semibold tracking-tight group-hover:text-ember transition-colors">
              {lead.title}
            </h2>
            <p className="mt-4 text-stone leading-relaxed">{lead.excerpt}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm">
              Read it <span aria-hidden>→</span>
            </span>
          </div>
        </Link>

        {/* The rest */}
        <div className="mt-16 grid md:grid-cols-2 gap-x-10 gap-y-12">
          {rest.map((post) => (
            <Link key={post.slug} href={journalHref(post)} className="group block">
              <div
                className="editorial-frame aspect-[16/10] rounded-2xl"
                style={{
                  background: `linear-gradient(150deg, ${post.palette[0]}, ${post.palette[1]})`,
                }}
              />
              <span className="mt-4 block text-xs uppercase tracking-[0.2em] text-stone">
                {post.tag} · {formatDate(post.date)}
              </span>
              <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight group-hover:text-ember transition-colors">
                {post.title}
              </h3>
              <p className="mt-2 text-stone leading-relaxed">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
