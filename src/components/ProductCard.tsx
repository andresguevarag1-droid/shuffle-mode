import Link from "next/link";
import { Product, formatPrice, productHref } from "@/lib/content";

// Shared catalog card used on the homepage drop grid and the /shop page.
// The whole card is a link to the product detail route.
export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link href={productHref(p)} className="group block">
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
        <span className="absolute inset-x-3 bottom-3 translate-y-2 rounded-full bg-cream/95 py-2.5 text-center text-sm text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          View piece
        </span>
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <div>
          <h3 className="font-medium leading-tight group-hover:text-ember transition-colors">
            {p.name}
          </h3>
          <p className="text-sm text-stone">{p.category}</p>
        </div>
        <span className="font-display">{formatPrice(p.price)}</span>
      </div>
    </Link>
  );
}
