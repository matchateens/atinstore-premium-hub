import { useMemo, useState } from "react";
import { categories, products, type Category } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";

export const ProductGrid = () => {
  const [active, setActive] = useState<Category>("Semua");

  const filtered = useMemo(
    () => (active === "Semua" ? products : products.filter((p) => p.category === active)),
    [active]
  );

  return (
    <section id="produk" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold tracking-[0.2em] text-gold uppercase mb-3">Katalog</div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary mb-4">
            Pilih Aplikasi Favoritmu
          </h2>
          <p className="text-muted-foreground">
            Lebih dari 17 aplikasi premium tersedia. Semua bergaransi, semua murah.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-smooth border",
                active === c
                  ? "bg-primary text-primary-foreground border-primary shadow-soft"
                  : "bg-beige-light text-navy border-border hover:bg-beige"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
};