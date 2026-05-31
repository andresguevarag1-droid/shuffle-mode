import Announcement from "@/components/Announcement";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import ShuffleMood from "@/components/ShuffleMood";
import Philosophy from "@/components/Philosophy";
import Lookbook from "@/components/Lookbook";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Announcement />
      <Header />
      <main className="flex-1">
        <Hero />
        <ProductGrid />
        <ShuffleMood />
        <Philosophy />
        <Lookbook />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
