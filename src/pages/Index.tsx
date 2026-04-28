import { Navbar } from "@/components/atinstore/Navbar";
import { Hero } from "@/components/atinstore/Hero";
import { FlashSale } from "@/components/atinstore/FlashSale";
import { ProductGrid } from "@/components/atinstore/ProductGrid";
import { HowToOrder } from "@/components/atinstore/HowToOrder";
import { Footer } from "@/components/atinstore/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background font-sans">
      <Navbar />
      <Hero />
      <FlashSale />
      <ProductGrid />
      <HowToOrder />
      <Footer />
    </main>
  );
};

export default Index;
