import { useMemo, useState } from "react";
import { categories, products, type Category, type Product } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { VariantPickerDialog } from "./VariantPickerDialog";
import { cn } from "@/lib/utils";

export const ProductGrid = () => {
  const [active, setActive] = useState<Category>("Semua");
  const [picker, setPicker] = useState<Product | null>(null);

  const filtered = useMemo(
    () => (active === "Semua" ? products : products.filter((p) => p.category === active)),
    [active]
  );

  return (
    <section id="produk" className="py-14 md:py-20 bg-background">
      <div className="container">
        <div className="flex items-end justify-between mb-6 md:mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold tracking-[0.18em] text-brand uppercase mb-2">Katalog</div>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground">
              Pilih Aplikasi Favoritmu
            </h2>
            <p className="text-muted-foreground text-sm mt-1 hidden sm:block">
              17+ aplikasi premium · semua bergaransi · proses cepat
            </p>
          </div>
        </div>

        <div className="flex flex-nowrap overflow-x-auto gap-2 mb-8 pb-1 -mx-4 px-4 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-smooth border whitespace-nowrap shrink-0",
                active === c
                  ? "bg-brand text-white border-brand shadow-card"
                  : "bg-card text-foreground border-border hover:border-brand/40 hover:text-brand"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
          {filtered.map((p) => (
            <ProductCard key={p.name} product={p} onPickVariant={setPicker} />
          ))}
        </div>
      </div>
      <VariantPickerDialog
        product={picker}
        open={!!picker}
        onOpenChange={(o) => !o && setPicker(null)}
      />
    </section>
  );
};