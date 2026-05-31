import { PRODUCTS, DROP, formatPrice } from "@/lib/content";

export default function ProductGrid() {
  return (
    <section id="shop" className="py-20 md:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-stone">
              {DROP.title}
            </span>
            <h2 className="font-display mt-2 text-4xl md:text-5xl font-semibold tracking-tight">
              This week&rsquo;s drop
            </h2>
          </div>
          <p className="text-sm text-stone">
            Only <span className="text-ember font-medium">{DROP.piecesLeft} pieces</span>{" "}
            left · restocks are rare
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {PRODUCTS.map((p) => (
            <article key={p.id} className="group">
              <div className="editorial-frame relative aspect-[4/5] rounded-2xl">
                <div
                  className="absolute inset-0 rounded-2xl opacity-90 transition-transform duration-500 group-hover:scale-[1.02]"
                  style={{
                    background: `linear-gradient(150deg, ${p.swatch[0]}, ${p.swatch[1]})`,
                  }}
                />
                {p.badge && (
                  <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-3 py-1 text-[11px] uppercase tracking-wider text-ink">
                    {p.badge}
                  </span>
                )}
                <button className="absolute inset-x-3 bottom-3 translate-y-2 rounded-full bg-cream/95 py-2.5 text-sm text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  Add to bag
                </button>
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <div>
                  <h3 className="font-medium leading-tight">{p.name}</h3>
                  <p className="text-sm text-stone">{p.category}</p>
                </div>
                <span className="font-display">{formatPrice(p.price)}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#shop"
            className="inline-flex items-center gap-2 rounded-full border border-ink/30 px-8 py-3.5 hover:bg-ink hover:text-cream transition-colors"
          >
            View full drop <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
