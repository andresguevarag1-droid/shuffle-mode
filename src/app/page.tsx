import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import ShuffleMood from "@/components/ShuffleMood";
import Philosophy from "@/components/Philosophy";
import Lookbook from "@/components/Lookbook";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductGrid />
      <ShuffleMood />
      <Philosophy />
      <Lookbook />
      <Newsletter />
    </>
  );
}
