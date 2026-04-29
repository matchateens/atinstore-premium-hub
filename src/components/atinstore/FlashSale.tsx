import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { products, type Product } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { BuyDialog } from "./BuyDialog";

const FEATURED_NAMES = [
  "Netflix Premium",
  "Spotify Premium",
  "ChatGPT Plus",
  "Canva Pro",
  "Capcut Pro",
  "Bstation Premium",
  "Youtube Premium",
  "Viu Premium",
];

export const FlashSale = () => {
  const [picker, setPicker] = useState<Product | null>(null);
  const autoplay = useRef(Autoplay({ delay: 4500, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", containScroll: "trimSnaps" },
    [autoplay.current]
  );
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    update();
  }, [emblaApi]);

  const featured = FEATURED_NAMES
    .map((n) => products.find((p) => p.name === n))
    .filter((p): p is Product => !!p);

  if (featured.length === 0) return null;

  // Random-ish discount per product (stable)
  const getDiscount = (name: string) => {
    const n = name.charCodeAt(0) + name.length;
    return 10 + (n % 6) * 5; // 10..35
  };

  return (
    <section className="py-10 md:py-14 bg-background">
      <div className="container">
        <div className="rounded-3xl border border-border bg-card shadow-card p-5 md:p-7">
          <div className="flex items-end justify-between gap-4 mb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 text-destructive text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 mb-2">
                <Zap className="h-3 w-3" /> Flash Sale
              </div>
              <h2 className="font-display text-xl md:text-2xl font-extrabold text-foreground">
                Produk promo pilihan
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => emblaApi?.scrollPrev()}
                aria-label="Sebelumnya"
                disabled={!canPrev}
                className="h-9 w-9 rounded-full bg-secondary border border-border flex items-center justify-center text-foreground hover:bg-brand hover:text-white transition-colors disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => emblaApi?.scrollNext()}
                aria-label="Berikutnya"
                disabled={!canNext}
                className="h-9 w-9 rounded-full bg-secondary border border-border flex items-center justify-center text-foreground hover:bg-brand hover:text-white transition-colors disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-3 md:gap-4">
              {featured.map((p) => (
                <div
                  key={p.name}
                  className="min-w-0 flex-[0_0_70%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_23%]"
                >
                  <ProductCard
                    product={p}
                    onPickVariant={setPicker}
                    variant="flash"
                    flashDiscount={getDiscount(p.name)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BuyDialog
        product={picker}
        open={!!picker}
        onOpenChange={(o) => !o && setPicker(null)}
        flashDiscount={picker ? getDiscount(picker.name) : undefined}
      />
    </section>
  );
};