import { useMemo, useState } from "react";
import { categories, products, type Category, type Product } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { BuyDialog } from "./BuyDialog";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export const ProductGrid = () => {
  const [active, setActive] = useState<Category>("Semua");
  const [query, setQuery] = useState("");
  const [picker, setPicker] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const catOk = active === "Semua" || p.category === active;
      const qOk = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [active, query]);

  return (
    <section id="produk" className="py-10 md:py-14 bg-background">
      <div className="container">
        {/* Search + category chips */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-6">
          <div className="relative md:w-72 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari produk…"
              className="w-full h-11 pl-11 pr-4 rounded-full bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>
          <div className="flex flex-nowrap overflow-x-auto gap-2 pb-1 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  "px-4 h-10 rounded-full text-sm font-semibold transition-colors border whitespace-nowrap shrink-0",
                  active === c
                    ? "bg-brand text-white border-brand shadow-card"
                    : "bg-card text-foreground border-border hover:border-brand/40 hover:text-brand"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
          {filtered.map((p) => (
          <ProductCard key={p.name} product={p} onPickVariant={setPicker} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-muted-foreground text-sm py-12">
            Produk tidak ditemukan.
          </div>
        )}
      </div>
      <BuyDialog
        product={picker}
        open={!!picker}
        onOpenChange={(o) => !o && setPicker(null)}
      />
    </section>
  );
};