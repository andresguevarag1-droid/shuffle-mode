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
    layout.tsx        # fonts, metadata, root shell
    page.tsx          # composes the landing sections
    globals.css       # design tokens + utilities (Tailwind v4 @theme)
  components/         # Header, Hero, ProductGrid, ShuffleMood, … (one per section)
  lib/content.ts      # mock data: drop, moods, products, lookbook, nav
```

## Next steps

Replace mock data in `src/lib/content.ts` and the `.editorial-frame`
placeholders with real product data and photography, then wire commerce
(Shopify Storefront API / Stripe) and an email provider. See `AUDIT.md` §5.
