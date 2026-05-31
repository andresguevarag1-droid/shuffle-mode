import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-28 md:py-40">
      <div className="container-x text-center">
        <span className="text-xs uppercase tracking-[0.22em] text-stone">
          404
        </span>
        <h1 className="font-display mt-5 text-5xl md:text-6xl font-semibold tracking-tight">
          This one shuffled off.
        </h1>
        <p className="mt-5 mx-auto max-w-md text-lg text-stone">
          The piece you&rsquo;re after may have sold through, or the link
          wandered. The current drop is still live.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full bg-ink px-7 py-3.5 text-cream hover:bg-ember transition-colors"
          >
            Shop the drop
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-2 py-3.5 text-ink/80 hover:text-ink transition-colors"
          >
            Back home <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
