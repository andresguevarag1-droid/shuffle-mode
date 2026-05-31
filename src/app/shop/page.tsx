import type { Metadata } from "next";
import { DROP } from "@/lib/content";
import { getProducts } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Shop the drop",
  description:
    "Every piece in this week's Shuffle Mode drop. Limited quantities, no restocks — when it's gone, it's gone.",
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <section className="py-16 md:py-24">
      <div className="container-x">
        <header className="reveal max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-stone">
            <span className="h-px w-8 bg-ember" /> {DROP.title} · Live now
          </span>
          <h1 className="font-display mt-5 text-5xl md:text-6xl font-semibold tracking-tight">
            Shop the drop
          </h1>
          <p className="mt-5 text-lg text-stone leading-relaxed">
            {DROP.totalPieces} pieces, designed to shuffle into each other.
            Once a piece sells through, it doesn&rsquo;t come back — so the
            ones below are what&rsquo;s left.
          </p>
          <p className="mt-4 text-sm text-stone">
            Only{" "}
            <span className="text-ember-ink font-medium">
              {DROP.piecesLeft} pieces
            </span>{" "}
            left in this drop
          </p>
        </header>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
