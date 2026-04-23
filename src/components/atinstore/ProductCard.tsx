import type { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";

export const ProductCard = ({ product }: { product: Product }) => {
  const waText = encodeURIComponent(`Halo Atinstore, saya mau order ${product.name}`);
  const lowest = product.variants.reduce<string>((acc, v) => {
    const num = parseInt(v.price.replace(/\D/g, ""));
    if (!num) return acc;
    const accNum = parseInt(acc.replace(/\D/g, "")) || Infinity;
    return num < accNum ? v.price : acc;
  }, "");
  return (
    <article className="group relative rounded-2xl bg-card border border-border shadow-card hover:shadow-elegant hover:-translate-y-0.5 transition-all overflow-hidden flex flex-col">
      <div className="relative aspect-square w-full bg-gradient-to-br from-brand/10 via-brand-light/5 to-background flex items-center justify-center p-6 overflow-hidden">
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="bg-white/90 text-brand hover:bg-white text-[10px] font-semibold">
            {product.category}
          </Badge>
        </div>
        <img
          src={product.logo}
          alt={`${product.name} logo`}
          width={120}
          height={120}
          loading="lazy"
          className="h-20 w-20 md:h-24 md:w-24 object-contain drop-shadow-md transition-transform group-hover:scale-110"
        />
      </div>

      <div className="p-3 md:p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-display text-base md:text-lg font-bold text-foreground truncate">{product.name}</h3>
        <div className="text-[11px] text-muted-foreground line-clamp-1">
          {product.variants.length} pilihan paket tersedia
        </div>
        <div className="mt-auto pt-2">
          <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Mulai dari</div>
          <div className="font-display text-lg md:text-xl font-extrabold text-brand">
            {lowest || product.variants[0]?.price}
          </div>
        </div>
        <Button
          asChild
          size="sm"
          className="w-full bg-gradient-brand hover:opacity-90 text-white gap-1.5 rounded-full shadow-card"
        >
          <a href={`https://wa.me/6282324644060?text=${waText}`} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-3.5 w-3.5" /> Pesan
          </a>
        </Button>
      </div>
    </article>
  );
};