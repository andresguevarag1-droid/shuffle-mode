# Shuffle Mode — Shopify theme

A custom **Online Store 2.0** Liquid theme for [shufflemode.us](https://shufflemode.us):
*dress for the mood, not the occasion.* Warm-paper editorial system (bone / ink /
ember), Fraunces + Inter, with a signature "Shuffle my mood" section.

> This branch contains **only the Shopify theme** (theme files at the repo root),
> so Shopify can connect it directly from GitHub. The headless Next.js version
> lives on the `claude/relaxed-curie-y8YSP` branch.

## Connect from Shopify (GitHub)

1. Shopify admin → **Online Store → Themes → Add theme → Connect from GitHub**.
2. Authorize the repo and pick the **`shopify-theme`** branch.
3. Shopify imports the theme; **Customize** to edit sections, then **Publish**.

Or with the Shopify CLI:

```bash
shopify theme dev    # local preview against your store
shopify theme push   # upload
shopify theme check  # lint the theme
```

## Structure

```
layout/theme.liquid            # document shell, fonts, design tokens from settings
templates/*.json               # index, product, collection, cart, page, blog, article, search, 404
sections/
  header-group.json            # announcement bar + header (renders on install)
  footer-group.json            # footer
  hero / featured-drop / shuffle / philosophy / lookbook / newsletter
  main-product / main-collection / main-cart / main-* …
snippets/product-card.liquid   # shared catalog card
assets/theme.css, theme.js     # design system + minimal interactions
config/settings_schema.json    # theme settings (colors, fonts, width)
locales/en.default.json        # translations
```

## Notes

- The homepage, header, and footer ship with content via JSON templates and
  section groups — no manual setup needed after connecting.
- **Featured drop** pulls from a collection you choose in the editor (falls back
  to placeholder cards until one is selected).
- Product, cart, and checkout use Shopify's native commerce — `Add to bag`
  posts to the cart and checkout is Shopify-hosted.
- Newsletter uses Shopify's built-in `customer` form (tags signups `newsletter`).
- The "Shuffle my mood" moods are editable blocks in the section. Point it at a
  collection and tag products `bold` / `soft` / `sharp` / `free` so each mood
  shows real pieces (it falls back to the first products otherwise).
- The hero shows a live **drop countdown** (set the date in the section) and a
  single editorial image — no decorative placeholder frames.
- Product cards swap to the **second product image** on hover; the product page
  has a thumbnail gallery, size pills with live price/availability, and a
  "More from this drop" related grid.
- Catalog uses real product imagery throughout; clean tonal placeholders appear
  only when a product (or section) has no image yet.

### Conversion features (merchant setup)

- **Quick-add + cart drawer**: cards add to a slide-in cart via AJAX. Works out
  of the box.
- **Search & filters**: enable the **Search & Discovery** app and configure
  filters (size/price/availability) so collection facets appear.
- **Free-shipping bar**: set the threshold in *Theme settings → Cart* and match
  it in *Settings → Shipping*.
- **Star ratings**: render automatically from the standard `reviews` product
  metafield (Shopify Product Reviews, Judge.me, etc.) — install a reviews app to
  populate them; the theme hides ratings until they exist.
- **Newsletter 10% off**: the form captures emails (tagged `newsletter`). Create
  an automatic discount + a welcome email (Shopify Email/Flow) to deliver the 10%.
- **Trust bar & testimonials**: editable sections on the homepage.
