"use client";

import { useState } from "react";
import { MOODS, PRODUCTS, formatPrice } from "@/lib/content";

export default function ShuffleMood() {
  const [index, setIndex] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const mood = MOODS[index];
  const look = PRODUCTS.filter((p) => p.mood === mood.id).slice(0, 2);
  // Fall back so every mood always shows two pieces.
  const pieces = look.length >= 2 ? look : [...look, ...PRODUCTS].slice(0, 2);

  const shuffle = () => {
    if (spinning) return;
    setSpinning(true);
    let ticks = 0;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % MOODS.length);
      ticks += 1;
      if (ticks > 6) {
        clearInterval(id);
        setSpinning(false);
      }
    }, 110);
  };

  return (
    <section id="shuffle" className="py-20 md:py-28 bg-cream">
      <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-stone">
            <span className="h-px w-8 bg-ember" /> Shuffle Mode
          </span>
          <h2 className="font-display mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
            Not sure what today is?
            <br /> Let it shuffle.
          </h2>
          <p className="mt-5 max-w-md text-lg text-stone leading-relaxed">
            Pick the mood you&rsquo;re in — or hit shuffle and let us read the
            room. We&rsquo;ll pull a look from this week&rsquo;s drop to match.
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {MOODS.map((m, i) => (
              <button
                key={m.id}
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                className={`rounded-full border px-5 py-2 text-sm transition-all ${
                  i === index
                    ? "border-ink bg-ink text-cream"
                    : "border-ink/20 text-ink/70 hover:border-ink/50"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <button
            onClick={shuffle}
            className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-ember px-7 py-3.5 text-cream hover:brightness-105 active:scale-[0.98] transition"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className={spinning ? "animate-spin" : ""}
            >
              <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
            </svg>
            Shuffle my mood
          </button>
        </div>

        {/* Look card */}
        <div
          className="relative rounded-3xl p-8 md:p-10 text-cream overflow-hidden transition-all duration-300"
          style={{
            background: `linear-gradient(145deg, ${mood.palette[0]}, ${mood.palette[1]})`,
          }}
        >
          <div className="editorial-frame absolute inset-0 opacity-20" />
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.25em] text-cream/70">
              Today you&rsquo;re feeling
            </p>
            <p className="font-display text-4xl md:text-5xl font-semibold mt-2">
              {mood.label}
            </p>
            <p className="mt-3 max-w-sm text-cream/85 italic font-display text-lg">
              &ldquo;{mood.line}&rdquo;
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {pieces.map((p) => (
                <div
                  key={p.id}
                  className="rounded-xl bg-cream/10 backdrop-blur-sm p-4 ring-1 ring-cream/15"
                >
                  <div
                    className="h-24 rounded-lg mb-3"
                    style={{
                      background: `linear-gradient(135deg, ${p.swatch[0]}, ${p.swatch[1]})`,
                    }}
                  />
                  <p className="text-sm font-medium leading-tight">{p.name}</p>
                  <p className="text-cream/70 text-sm">{formatPrice(p.price)}</p>
                </div>
              ))}
            </div>

            <a
              href="#shop"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-ink text-sm hover:bg-bone transition-colors"
            >
              Shop this look <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
