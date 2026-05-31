"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/content";

// Mock add-to-bag flow — there is no cart backend yet, so this just
// surfaces the size requirement and confirms the (fake) add.
export default function ProductPurchase({
  price,
  currencyCode,
  sizes,
}: {
  price: number;
  currencyCode?: string;
  sizes: string[];
}) {
  const [size, setSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(false);

  const add = () => {
    if (!size) {
      setError(true);
      return;
    }
    setAdded(true);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.2em] text-stone">
          Select size
        </span>
        <button className="text-xs uppercase tracking-[0.2em] text-stone underline-offset-4 hover:text-ink hover:underline">
          Size guide
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2.5">
        {sizes.map((s) => (
          <button
            key={s}
            onClick={() => {
              setSize(s);
              setError(false);
              setAdded(false);
            }}
            aria-pressed={s === size}
            className={`min-w-12 rounded-full border px-4 py-2 text-sm transition-all ${
              s === size
                ? "border-ink bg-ink text-cream"
                : "border-ink/20 text-ink/70 hover:border-ink/50"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {error && (
        <p className="mt-3 text-sm text-ember">Choose a size to continue.</p>
      )}

      <button
        onClick={add}
        className="mt-6 w-full rounded-full bg-ink px-7 py-4 text-cream hover:bg-ember active:scale-[0.99] transition disabled:opacity-70"
        disabled={added}
      >
        {added
          ? "Added to bag ✦"
          : `Add to bag — ${formatPrice(price, currencyCode)}`}
      </button>

      <p className="mt-3 text-center text-sm text-stone">
        Free shipping over $150 · easy 30-day returns
      </p>
    </div>
  );
}
