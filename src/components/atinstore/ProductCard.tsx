import type { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";

export const ProductCard = ({ product }: { product: Product }) => {
  const waText = encodeURIComponent(`Halo Atinstore, saya mau order ${product.name}`);
  return (
    <article className="group relative rounded-2xl bg-gradient-card border border-border shadow-soft hover:shadow-elegant transition-smooth overflow-hidden flex flex-col">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-gold opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="p-6 flex items-start gap-4 border-b border-border/60">
        <div className="h-14 w-14 rounded-xl bg-beige-light p-2 flex items-center justify-center shadow-soft shrink-0">
          <img src={product.logo} alt={`${product.name} logo`} width={56} height={56} loading="lazy" className="h-full w-full object-contain" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-xl font-bold text-primary truncate">{product.name}</h3>
          <Badge variant="secondary" className="mt-1.5 bg-beige text-navy hover:bg-beige text-[10px] font-medium">
            {product.category}
          </Badge>
        </div>
      </div>

      <ul className="p-5 space-y-2.5 flex-1">
        {product.variants.map((v) => (
          <li key={v.label} className="flex items-start justify-between gap-3 py-2 border-b border-border/40 last:border-0">
            <div className="min-w-0">
              <div className="text-sm font-medium text-foreground">{v.label}</div>
              {v.note && <div className="text-[11px] text-muted-foreground mt-0.5">{v.note}</div>}
            </div>
            <div className="text-sm font-bold text-navy whitespace-nowrap">{v.price}</div>
          </li>
        ))}
      </ul>

      <div className="p-5 pt-0">
        <Button asChild className="w-full bg-primary hover:bg-navy-light text-primary-foreground gap-2">
          <a href={`https://wa.me/6282324644060?text=${waText}`} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4" /> Pesan Sekarang
          </a>
        </Button>
      </div>
    </article>
  );
};