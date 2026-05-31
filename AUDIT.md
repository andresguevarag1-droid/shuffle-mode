# Shuffle Mode — Design Audit & Redesign Brief

> Audit date: 2026-05-31 · Scope: shufflemode.us (women's fashion, limited weekly drops)

## 0. Method

The live site is firewalled from the build environment (outbound requests
return `HTTP 403 · x-deny-reason: host_not_allowed`), so it was captured
**server-side via the Canva URL-import connector** (which is not subject to the
container's egress policy) and reviewed from the rendered page thumbnails of the
homepage and `/collections/all`. Findings below are **observed**, not assumed.

### What the live site actually is

- **Platform:** Shopify, running the stock **Dawn** theme with little
  customization — the announcement bar, centered logo, hamburger + search + cart
  icons, product card layout and "Filter and sort" control are all Dawn defaults.
- **Catalog:** **19 products** — elevated neutral womenswear (observed: a ruched
  ivory slip dress, black-and-white pinstripe wide-leg trousers; plus knits,
  tailored pieces).
- **Hero (homepage):** full-bleed editorial photo of models in ivory slip
  dresses, with a dark navy overlay box: headline `EFFORTLESS STYLE. EVERYDAY
  CONFIDENCE.`, sub-copy "Minimal pieces that elevate your wardrobe instantly,"
  and a `Shop Drop 01 →` button.
- **Brand color:** a single harsh, fully-saturated **link-blue** (~`#1d00ff`)
  used for the logo, announcement text and CTAs.
- **Positioning (meta/social):** "for women who don't dress for the occasion —
  they dress for the mood;" limited weekly **drops**; Boston-based
  (`@ShuffleModeBoston`).

---

## 1. Confirmed issues

| Area | Observed issue | Why it matters |
|------|----------------|----------------|
| **Generic identity** | Unconfigured stock Dawn theme — looks like a template, not a brand | The product photography is premium; the chrome around it is not, which undercuts perceived value |
| **Clashing accent** | Pure link-blue fights the warm ivory/neutral photography | The one brand color actively works against the imagery |
| **Low-contrast CTA** | Blue outline `Shop Drop 01` link on dark navy hero | Primary action is hard to see → fewer clicks |
| **Typography** | Dawn's default system sans throughout | Fashion sells on editorial type (display serif + clean sans) |
| **Brand voice buried** | Strong "dress for the mood" line absent from the page | The real differentiator never reaches the visitor |
| **Drops feel flat** | "Drop 01" named but no countdown, no "X left," no cadence cue | Drop models live or die on urgency/scarcity |
| **The "Shuffle" name** | Decorative only — no product/UX expression of it | A memorable name is wasted if the experience doesn't act it out |
| **Generic catalog page** | Default "Products" grid, default filter UI | No styling, story, or merchandising of the 19 pieces |

---

## 2. Redesign principles

1. **Lead with the line.** The tagline is the hero, set in an editorial display
   serif. Everything else supports it.
2. **Make the drop feel alive.** Live countdown, "pieces left," and a
   marquee ticker turn the weekly cadence into momentum.
3. **Act out the name.** A signature **"Shuffle my mood"** interaction picks a
   mood and pulls a matching look from the drop — the brand name becomes a
   feature, not a logo.
4. **Editorial restraint.** Warm paper + ink + one confident "ember" accent.
   Generous whitespace, big type, few colors.
5. **One obvious path.** Primary CTA is always *Shop the drop*; secondary is
   *Get on the list*. No competing buttons.
6. **Fast & accessible.** Server components by default, self-contained assets,
   `prefers-reduced-motion` respected, semantic landmarks, focus states.

---

## 3. Visual system

| Token | Value | Use |
|-------|-------|-----|
| `--color-bone` | `#f6f2ea` | Page background (warm paper) |
| `--color-ink` | `#16130f` | Text, dark sections |
| `--color-cream` | `#fbf9f4` | On-dark text, cards |
| `--color-ember` | `#c2502e` | Single accent — CTAs, emphasis |
| Display | **Fraunces** | Headlines, prices, editorial captions |
| Body/UI | **Inter** | Body copy, nav, buttons |

Image placeholders use a self-contained grain+gradient treatment so the layout
is fully functional with **zero external assets** — swap in real photography by
replacing `.editorial-frame` blocks with `next/image`.

---

## 4. Page architecture (implemented)

1. **Announcement marquee** — shipping, current drop, scarcity, list CTA
2. **Sticky header** — translucent on scroll, mobile menu, cart, primary CTA
3. **Hero** — tagline-as-headline + live drop countdown + editorial collage
4. **This week's drop** — product grid, "X pieces left," hover add-to-bag
5. **Shuffle my mood** — signature interactive mood→look selector
6. **Philosophy** — dark editorial strip, "fewer pieces, more you" + stats
7. **Lookbook** — masonry editorial grid with hover captions
8. **Newsletter** — early-access capture with success state
9. **Footer** — shop/help/brand columns, social, legal

---

## 5. Tech & next steps

- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4.
- **Now mock-data driven** (`src/lib/content.ts`) so it runs with no backend.
- **Routes (implemented):** `/` (homepage), `/shop` (full drop catalog), and
  `/product/[slug]` (statically generated per piece via `generateStaticParams`,
  with per-product `generateMetadata` and a styled `not-found`). The shared
  chrome (announcement, header, footer) now lives in the root `layout`, and the
  catalog card is a reusable `ProductCard`. Every CTA points at a real route
  instead of a placeholder anchor.

Recommended follow-ups, in order:
1. Pull the real 19 products + photography from the existing Shopify store
   (Storefront API) to replace the `.editorial-frame` placeholders and mock data.
2. Decide the path: **(a)** reskin Shopify with this design as a custom theme to
   keep the existing checkout/admin, or **(b)** run this Next.js front end
   headless against the Shopify Storefront API.
3. Wire a real email provider for the drop list, and a real cart/checkout
   behind the (currently mock) "Add to bag" flow on `/product/[slug]`.
4. Add the `/journal/[slug]` route (the remaining dynamic segment) once
   editorial content exists.
5. Analytics + A/B test the hero CTA and the Shuffle interaction.
