"use client";

import { useState } from "react";
import { formatPrice, type ProductVariant } from "@/lib/content";

// Two modes:
//  • Connected store — `variants` carry a Shopify cart/checkout URL, so picking
//    a size and adding to bag sends the shopper to Shopify's hosted checkout.
//  • Mock data — no variants, so it confirms a (fake) add to bag.
export default function ProductPurchase({
  price,
  currencyCode,
  sizes,
  variants,
}: {
  price: number;
  currencyCode?: string;
  sizes: string[];
  variants?: ProductVariant[];
}) {
  const live = Boolean(variants && variants.length > 0);
  const options = live ? variants!.map((v) => v.size) : sizes;

  const [size, setSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(false);

  const selectedVariant = variants?.find((v) => v.size === size);

  const addMock = () => {
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
        {options.map((s) => {
          const soldOut = live
            ? !variants!.find((v) => v.size === s)?.available
            : false;
          return (
            <button
              key={s}
              onClick={() => {
                setSize(s);
                setError(false);
                setAdded(false);
              }}
              aria-pressed={s === size}
              disabled={soldOut}
              className={`min-w-12 rounded-full border px-4 py-2 text-sm transition-all ${
                s === size
                  ? "border-ink bg-ink text-cream"
                  : "border-ink/20 text-ink/70 hover:border-ink/50"
              } ${soldOut ? "line-through opacity-40 cursor-not-allowed" : ""}`}
            >
              {s}
            </button>
          );
        })}
      </div>

      {error && (
        <p className="mt-3 text-sm text-ember">Choose a size to continue.</p>
      )}

      {live ? (
        selectedVariant ? (
          <a
            href={selectedVariant.url}
            className="mt-6 block w-full rounded-full bg-ink px-7 py-4 text-center text-cream hover:bg-ember active:scale-[0.99] transition"
          >
            {`Add to bag — ${formatPrice(price, currencyCode)}`}
          </a>
        ) : (
          <button
            onClick={() => setError(true)}
            className="mt-6 w-full rounded-full bg-ink px-7 py-4 text-cream hover:bg-ember transition"
          >
            {`Add to bag — ${formatPrice(price, currencyCode)}`}
          </button>
        )
      ) : (
        <button
          onClick={addMock}
          className="mt-6 w-full rounded-full bg-ink px-7 py-4 text-cream hover:bg-ember active:scale-[0.99] transition disabled:opacity-70"
          disabled={added}
        >
          {added ? "Added to bag ✦" : `Add to bag — ${formatPrice(price, currencyCode)}`}
        </button>
      )}

      <p className="mt-3 text-center text-sm text-stone">
        Free shipping over $150 · easy 30-day returns
      </p>
    </div>
  );
}
