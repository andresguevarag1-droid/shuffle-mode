import Link from "next/link";
import { PRODUCTS, DROP } from "@/lib/content";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  return (
    <section id="drop" className="py-20 md:py-28">
      <div className="container-x">
        <div className="reveal flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-stone">
              {DROP.title}
            </span>
            <h2 className="font-display mt-2 text-4xl md:text-5xl font-semibold tracking-tight">
              This week&rsquo;s drop
            </h2>
          </div>
          <p className="text-sm text-stone">
            Only <span className="text-ember-ink font-medium">{DROP.piecesLeft} pieces</span>{" "}
            left · restocks are rare
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-ink/30 px-8 py-3.5 hover:bg-ink hover:text-cream transition-colors"
          >
            View full drop <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
