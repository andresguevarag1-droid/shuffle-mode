"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface to your monitoring here (Sentry, etc.).
    console.error(error);
  }, [error]);

  return (
    <section className="py-28 md:py-40">
      <div className="container-x text-center">
        <span className="text-xs uppercase tracking-[0.22em] text-stone">
          Something shuffled wrong
        </span>
        <h1 className="font-display mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
          We hit a snag loading this.
        </h1>
        <p className="mt-5 mx-auto max-w-md text-lg text-stone">
          It&rsquo;s us, not you. Try again — the drop is still here.
        </p>
        <button
          onClick={reset}
          className="mt-9 inline-flex items-center justify-center rounded-full bg-ink px-7 py-3.5 text-cream hover:bg-ember transition-colors"
        >
          Try again
        </button>
      </div>
    </section>
  );
}
