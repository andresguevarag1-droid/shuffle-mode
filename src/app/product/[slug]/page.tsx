import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PRODUCTS,
  MOODS,
  getProduct,
  formatPrice,
} from "@/lib/content";
import ProductCard from "@/components/ProductCard";
import ProductPurchase from "@/components/ProductPurchase";

type Params = { params: Promise<{ slug: string }> };

// Prerender a static page for every piece in the drop.
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} · Shuffle Mode`,
      description: product.description,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const mood = MOODS.find((m) => m.id === product.mood);
  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="py-10 md:py-16">
      <div className="container-x">
        <nav className="text-sm text-stone" aria-label="Breadcrumb">
          <Link href="/shop" className="hover:text-ink transition-colors">
            Shop
          </Link>
          <span className="mx-2 text-ink/30">/</span>
          <span className="text-ink/70">{product.category}</span>
        </nav>

        <div className="mt-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Gallery */}
          <div className="grid grid-cols-2 gap-4">
            <div
              className="editorial-frame col-span-2 aspect-[4/5] rounded-2xl"
              style={{
                background: `linear-gradient(150deg, ${product.swatch[0]}, ${product.swatch[1]})`,
              }}
            />
            <div
              className="editorial-frame aspect-square rounded-2xl"
              style={{
                background: `linear-gradient(150deg, ${product.swatch[1]}, ${product.swatch[0]})`,
              }}
            />
            <div className="editorial-frame aspect-square rounded-2xl" />
          </div>

          {/* Info */}
          <div className="lg:sticky lg:top-28">
            <span className="text-xs uppercase tracking-[0.22em] text-stone">
              {product.badge ?? product.category}
            </span>
            <h1 className="font-display mt-3 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.02]">
              {product.name}
            </h1>
            <p className="mt-4 font-display text-2xl">
              {formatPrice(product.price)}
            </p>

            {mood && (
              <p className="mt-6 font-display text-lg italic text-ember">
                &ldquo;{mood.line}&rdquo;
              </p>
            )}

            <p className="mt-5 text-stone leading-relaxed">
              {product.description}
            </p>

            <ProductPurchase price={product.price} sizes={product.sizes} />

            <div className="mt-10 border-t border-ink/10 pt-6">
              <h2 className="text-xs uppercase tracking-[0.2em] text-stone">
                The details
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-ink/80">
                {product.details.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span aria-hidden className="text-ember">
                      ✦
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related */}
        <section className="mt-20 md:mt-28">
          <div className="flex items-end justify-between gap-4 mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
              More from this drop
            </h2>
            <Link
              href="/shop"
              className="text-sm text-stone hover:text-ink transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
