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
- The "Shuffle my mood" moods are editable blocks in the section.
