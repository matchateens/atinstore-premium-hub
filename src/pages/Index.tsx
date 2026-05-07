import { Navbar } from "@/components/atinstore/Navbar";
import { Hero } from "@/components/atinstore/Hero";
import { FlashSale } from "@/components/atinstore/FlashSale";
import { ProductGrid } from "@/components/atinstore/ProductGrid";
import { HowToOrder } from "@/components/atinstore/HowToOrder";
import { Footer } from "@/components/atinstore/Footer";
import { WelcomePopup } from "@/components/atinstore/WelcomePopup";

const Index = () => {
  return (
    <main className="min-h-screen bg-background font-sans">
      <WelcomePopup />
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
