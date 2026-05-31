import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Shopify-hosted product imagery (Storefront API / CDN).
    remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com" }],
  },
};

export default nextConfig;
