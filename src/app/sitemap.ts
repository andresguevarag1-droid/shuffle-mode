import type { MetadataRoute } from "next";
import { JOURNAL } from "@/lib/content";
import { getProducts } from "@/lib/shopify";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shufflemode.us";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/shop`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/journal`, changeFrequency: "weekly", priority: 0.6 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/product/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const journalRoutes: MetadataRoute.Sitemap = JOURNAL.map((j) => ({
    url: `${base}/journal/${j.slug}`,
    lastModified: new Date(j.date),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...productRoutes, ...journalRoutes];
}
