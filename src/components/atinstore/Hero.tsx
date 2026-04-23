import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ShieldCheck, Zap, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { banners } from "@/data/banners";
import { cn } from "@/lib/utils";

export const Hero = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 4500, stopOnInteraction: false }),
  ]);
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    const onSel = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSel);
    onSel();
    return () => {
      emblaApi.off("select", onSel);
    };
  }, [emblaApi]);

  return (
    <section id="top" className="relative bg-gradient-to-b from-brand-light/15 via-background to-background pt-6 pb-10 md:pt-8 md:pb-14">
      <div className="container">
        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-elegant" ref={emblaRef}>
            <div className="flex">
              {banners.map((b, i) => (
                <div key={b.id} className="min-w-0 flex-[0_0_100%] relative">
                  <div className="relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[24/9] w-full overflow-hidden">
                    <img
                      src={b.image}
                      alt={`${b.title} promo banner`}
                      width={1024}
                      height={1280}
                      loading={i === 0 ? "eager" : "lazy"}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className={cn("absolute inset-0 bg-gradient-to-r", b.accent)} />
                    <div className="relative z-10 h-full flex flex-col justify-center p-6 sm:p-10 md:p-14 max-w-2xl">
                      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-foreground shadow-gold">
                        ⚡ {b.badge}
                      </span>
                      <h2 className="mt-3 font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight drop-shadow">
                        {b.title}
                      </h2>
                      <p className="mt-2 text-white/85 text-sm sm:text-base max-w-md">{b.subtitle}</p>
                      <div className="mt-4 flex items-center gap-3">
                        <span className="text-white/70 text-xs sm:text-sm">Mulai</span>
                        <span className="font-display text-xl sm:text-2xl font-bold text-gold-light">{b.price}</span>
                      </div>
                      <div className="mt-5">
                        <a
                          href={`https://wa.me/6282324644060?text=${encodeURIComponent(b.waText)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-full bg-white px-5 sm:px-7 py-2.5 sm:py-3 text-sm font-semibold text-brand shadow-card hover:bg-white/90 transition-colors"
                        >
                          {b.cta}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Sebelumnya"
            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/90 text-foreground shadow-card hover:bg-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Berikutnya"
            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/90 text-foreground shadow-card hover:bg-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {snaps.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Banner ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  selected === i ? "w-6 bg-white" : "w-1.5 bg-white/50"
                )}
              />
            ))}
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-6 grid grid-cols-3 gap-3 md:gap-6">
          {[
            { icon: ShieldCheck, title: "Transaksi Aman", desc: "Garansi penuh" },
            { icon: Zap, title: "Proses 5 Menit", desc: "Akun langsung jadi" },
            { icon: Sparkles, title: "Harga Termurah", desc: "Mulai Rp 4.000" },
          ].map((f) => (
            <div key={f.title} className="flex items-center gap-3 rounded-xl bg-card border border-border p-3 md:p-4 shadow-card">
              <div className="h-9 w-9 md:h-10 md:w-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0">
                <f.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-sm text-foreground truncate">{f.title}</div>
                <div className="text-[11px] md:text-xs text-muted-foreground truncate">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};