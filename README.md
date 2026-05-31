# Shuffle Mode — redesign

An improved, conversion-focused redesign of [shufflemode.us](https://shufflemode.us) —
a women's fashion brand built on **limited weekly drops**: *dress for the mood,
not the occasion.*

See **[`AUDIT.md`](./AUDIT.md)** for the design audit and the rationale behind
this rebuild.

## Highlights

- **Editorial brand system** — warm paper + ink + one "ember" accent, with a
  Fraunces display / Inter body type pairing.
- **Live drop countdown** + scarcity cues that make the weekly cadence feel urgent.
- **"Shuffle my mood"** — a signature interaction that turns the brand name into
  a feature: pick a mood (or shuffle) and get a matching look from the drop.
- **Fully self-contained** — placeholder imagery is rendered with CSS
  (grain + gradient), so it runs with zero external assets or backend.
- Accessible & fast: server components by default, semantic landmarks,
  `prefers-reduced-motion` support.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Structure

```
src/
  app/
    layout.tsx          # fonts, metadata, root shell (announcement/header/footer)
    page.tsx            # composes the landing sections (fetches the catalog)
    shop/page.tsx       # full drop catalog
    product/[slug]/     # product detail (SSG via generateStaticParams)
    journal/            # editorial index + posts
    globals.css         # design tokens + utilities (Tailwind v4 @theme)
  components/           # Header, Hero, ProductGrid, ShuffleMood, … (one per section)
  lib/
    content.ts          # types + mock data: drop, moods, products, journal, nav
    shopify.ts          # Storefront API data layer (mock fallback)
```

## Connecting Shopify (headless)

The catalog is served through `src/lib/shopify.ts`. With **no environment
variables** it uses the built-in mock catalog, so the app builds and runs with
zero configuration. To go live against a real store:

1. Copy `.env.example` → `.env.local` and fill in:
   - `SHOPIFY_STORE_DOMAIN` (e.g. `your-store.myshopify.com`)
   - `SHOPIFY_STOREFRONT_ACCESS_TOKEN` (Storefront API token)
2. In Shopify admin → **Settings → Apps and sales channels → Develop apps**,
   create an app, enable the **Storefront API**, and grant
   `unauthenticated_read_product_listings` (+ inventory).
3. `npm run dev` — products, prices, sizes and images now come from Shopify.

How it maps: Shopify `handle → slug`, `title → name`, `productType → category`,
min variant price → `price` (with `currencyCode`), the `Size` option → sizes,
and product images render via `next/image` (the gradient placeholders are the
fallback when a product has no image). Moods come from a matching product **tag**
(`bold` / `soft` / `sharp` / `free`), otherwise they're assigned deterministically
so the "Shuffle" feature keeps working. The Storefront response is revalidated
hourly — see `next: { revalidate }` in `shopify.ts`.

## Production readiness

Wired and ready (graceful fallback when env vars are unset):

- **Checkout** — on a connected store, picking a size and "Add to bag" sends the
  shopper to Shopify's hosted checkout via a cart permalink (real variants, with
  sold-out states). Mock data keeps the demo confirmation.
- **On-demand revalidation** — point a Shopify `products/*` webhook at
  `POST /api/revalidate?secret=…` to refresh the cached catalog (`SHOPIFY_REVALIDATION_SECRET`).
- **Newsletter** — the form posts to `POST /api/subscribe`, which validates and,
  if `NEWSLETTER_WEBHOOK_URL` is set, forwards to your provider.
- **SEO** — dynamic `sitemap.xml` (products + journal) and `robots.txt`, plus
  `Product` and `Organization` JSON-LD. Set `NEXT_PUBLIC_SITE_URL`.
- **Resilience & a11y** — `loading` / `error` / `global-error` boundaries,
  keyboard skip-link, visible focus, `prefers-reduced-motion` support.

Remaining follow-ups: a native multi-item cart (vs. the permalink hand-off),
and moving journal posts to a CMS. See `AUDIT.md` §5.
