// Shopify Storefront API data layer.
//
// When SHOPIFY_STORE_DOMAIN + SHOPIFY_STOREFRONT_ACCESS_TOKEN are set, the
// catalog is fetched live from Shopify and mapped to the app's `Product` type.
// Without them, everything falls back to the mock data in `content.ts`, so the
// site builds and runs with zero configuration. See README "Connecting Shopify".

import {
  PRODUCTS as MOCK_PRODUCTS,
  MOODS,
  type Product,
  type ProductImage,
  type ProductVariant,
} from "./content";

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION || "2024-10";

export const isShopifyConfigured = () => Boolean(DOMAIN && TOKEN);

// --- GraphQL ----------------------------------------------------------------

const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment ProductCard on Product {
    id
    handle
    title
    productType
    description
    tags
    featuredImage { url altText }
    images(first: 6) { nodes { url altText } }
    priceRange { minVariantPrice { amount currencyCode } }
    options { name values }
    variants(first: 50) {
      nodes {
        id
        title
        availableForSale
        selectedOptions { name value }
      }
    }
  }
`;

type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
};

type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  productType: string | null;
  description: string;
  tags: string[];
  featuredImage: { url: string; altText: string | null } | null;
  images: { nodes: { url: string; altText: string | null }[] };
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  options: { name: string; values: string[] }[];
  variants: { nodes: ShopifyVariant[] };
};

async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const res = await fetch(
    `https://${DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": TOKEN as string,
      },
      body: JSON.stringify({ query, variables }),
      // Revalidate hourly, or on-demand by tag via /api/revalidate (Shopify webhook).
      next: { revalidate: 3600, tags: ["shopify-products"] },
    }
  );

  if (!res.ok) {
    throw new Error(`Shopify Storefront API error: ${res.status}`);
  }

  const json = (await res.json()) as { data: T; errors?: unknown };
  if (json.errors) {
    throw new Error(`Shopify GraphQL error: ${JSON.stringify(json.errors)}`);
  }
  return json.data;
}

// --- Mapping ----------------------------------------------------------------

const MOOD_IDS = MOODS.map((m) => m.id);

// Deterministically assign a mood so the "Shuffle" feature keeps working with
// live products: prefer a matching tag, otherwise hash the handle.
function moodFor(p: ShopifyProduct): string {
  const tagged = p.tags
    .map((t) => t.toLowerCase())
    .find((t) => MOOD_IDS.includes(t));
  if (tagged) return tagged;
  let hash = 0;
  for (const ch of p.handle) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return MOOD_IDS[hash % MOOD_IDS.length];
}

// Fallback gradient derived from the handle (used only when there's no image).
function swatchFor(p: ShopifyProduct): [string, string] {
  let hash = 0;
  for (const ch of p.handle) hash = (hash * 17 + ch.charCodeAt(0)) >>> 0;
  const h = hash % 360;
  return [`hsl(${h} 24% 78%)`, `hsl(${h} 22% 56%)`];
}

function sizeOf(v: ShopifyVariant): string {
  const opt = v.selectedOptions.find((o) => /size/i.test(o.name));
  return opt?.value || v.title;
}

// Shopify cart permalink — adds the variant to the cart and lands on the
// hosted checkout. `gid://shopify/ProductVariant/123` → numeric id `123`.
function buyUrl(variantGid: string): string {
  const numericId = variantGid.split("/").pop();
  return `https://${DOMAIN}/cart/${numericId}:1`;
}

function variantsFor(p: ShopifyProduct): ProductVariant[] {
  return p.variants.nodes.map((v) => ({
    id: v.id,
    size: sizeOf(v),
    available: v.availableForSale,
    url: buyUrl(v.id),
  }));
}

function img(node: { url: string; altText: string | null } | null, alt: string): ProductImage | undefined {
  return node ? { url: node.url, alt: node.altText || alt } : undefined;
}

function mapProduct(p: ShopifyProduct): Product {
  const featured = img(p.featuredImage, p.title);
  const gallery = p.images.nodes.map((n) => img(n, p.title)!).filter(Boolean);
  const variants = variantsFor(p);
  const sizes = variants.map((v) => v.size);
  return {
    id: p.id,
    slug: p.handle,
    name: p.title,
    category: p.productType || "Drop",
    price: parseFloat(p.priceRange.minVariantPrice.amount),
    currencyCode: p.priceRange.minVariantPrice.currencyCode,
    mood: moodFor(p),
    badge: p.tags.includes("new") ? "New" : undefined,
    swatch: swatchFor(p),
    image: featured,
    images: gallery.length ? gallery : featured ? [featured] : undefined,
    description: p.description,
    details: [],
    sizes: sizes.length ? sizes : ["One size"],
    variants,
  };
}

// --- Public API -------------------------------------------------------------

export async function getProducts(limit = 24): Promise<Product[]> {
  if (!isShopifyConfigured()) return MOCK_PRODUCTS;

  const data = await shopifyFetch<{ products: { nodes: ShopifyProduct[] } }>(
    /* GraphQL */ `
      ${PRODUCT_FRAGMENT}
      query Products($first: Int!) {
        products(first: $first) {
          nodes { ...ProductCard }
        }
      }
    `,
    { first: limit }
  );
  return data.products.nodes.map(mapProduct);
}

export async function getProductByHandle(
  handle: string
): Promise<Product | undefined> {
  if (!isShopifyConfigured()) {
    return MOCK_PRODUCTS.find((p) => p.slug === handle);
  }

  const data = await shopifyFetch<{ product: ShopifyProduct | null }>(
    /* GraphQL */ `
      ${PRODUCT_FRAGMENT}
      query Product($handle: String!) {
        product(handle: $handle) { ...ProductCard }
      }
    `,
    { handle }
  );
  return data.product ? mapProduct(data.product) : undefined;
}
