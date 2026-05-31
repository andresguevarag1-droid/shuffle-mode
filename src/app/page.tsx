import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import ShuffleMood from "@/components/ShuffleMood";
import Philosophy from "@/components/Philosophy";
import Lookbook from "@/components/Lookbook";
import Newsletter from "@/components/Newsletter";
import { getProducts } from "@/lib/shopify";

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <Hero />
      <ProductGrid products={products} />
      <ShuffleMood products={products} />
      <Philosophy />
      <Lookbook />
      <Newsletter />
    </>
  );
}
