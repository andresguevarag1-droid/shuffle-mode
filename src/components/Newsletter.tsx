"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section id="newsletter" className="py-20 md:py-28 bg-sand">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center reveal">
          <span className="text-xs uppercase tracking-[0.22em] text-stone">
            First in line
          </span>
          <h2 className="font-display mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
            Get the drop before it&rsquo;s gone
          </h2>
          <p className="mt-4 text-lg text-stone">
            Drops sell out fast. Join the list for early access, mood guides, and
            the occasional note — never spam.
          </p>

          {done ? (
            <p className="mt-8 font-display text-xl text-ember">
              You&rsquo;re on the list. See you Sunday. ✦
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.includes("@")) setDone(true);
              }}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                aria-label="Email address"
                className="flex-1 rounded-full border border-ink/20 bg-bone px-5 py-3.5 outline-none focus:border-ink transition-colors"
              />
              <button
                type="submit"
                className="rounded-full bg-ink px-7 py-3.5 text-cream hover:bg-ember transition-colors"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
