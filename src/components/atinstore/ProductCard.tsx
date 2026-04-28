import type { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { useState } from "react";
import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type Props = {
  product: Product;
  onPickVariant: (product: Product) => void;
  flashDiscount?: number; // e.g. 10 means 10% OFF badge
  variant?: "default" | "flash";
};

export const ProductCard = ({ product, onPickVariant, flashDiscount, variant = "default" }: Props) => {
  const { addItem } = useCart();
  const [detailOpen, setDetailOpen] = useState(false);
  const hasMany = product.variants.length > 1;
  const lowest = product.variants.reduce<string>((acc, v) => {
    const num = parseInt(v.price.replace(/\D/g, ""));
    if (!num) return acc;
    const accNum = parseInt(acc.replace(/\D/g, "")) || Infinity;
    return num < accNum ? v.price : acc;
  }, "");

  const handleClick = () => {
    if (hasMany) {
      onPickVariant(product);
      return;
    }
    const v = product.variants[0];
    addItem({
      id: `${product.name}::${v.label}`,
      productName: product.name,
      variantLabel: v.label,
      price: v.price,
      note: v.note,
      logo: product.logo,
    });
    toast.success(`${product.name} ditambahkan ke keranjang`);
  };

  const lowestNum = parseInt((lowest || product.variants[0]?.price || "").replace(/\D/g, "")) || 0;
  const originalPrice =
    flashDiscount && lowestNum
      ? `Rp ${Math.round(lowestNum / (1 - flashDiscount / 100)).toLocaleString("id-ID")}`
      : null;

  return (
    <article className="group relative rounded-2xl bg-card border border-border shadow-card hover:shadow-elegant hover:-translate-y-0.5 transition-all overflow-hidden flex flex-col">
      {/* Image area with gradient (mimics reference) */}
      <div
        className="relative aspect-[4/3] w-full flex items-center justify-center p-6 overflow-hidden"
        style={{ background: "var(--gradient-card)" }}
      >
        {product.logo ? (
          <img
            src={product.logo}
            alt={`${product.name} logo`}
            width={120}
            height={120}
            loading="lazy"
            className="h-20 w-20 md:h-24 md:w-24 object-contain drop-shadow-md transition-transform group-hover:scale-110"
          />
        ) : (
          <div className="h-20 w-20 md:h-24 md:w-24 rounded-2xl bg-gradient-brand text-white font-display font-extrabold text-3xl md:text-4xl flex items-center justify-center shadow-card transition-transform group-hover:scale-110">
            {product.name
              .replace(/[^A-Za-z0-9 ]/g, "")
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((w) => w[0])
              .join("")
              .toUpperCase()}
          </div>
        )}
      </div>

      <div className="p-3 md:p-4 flex flex-col gap-2 flex-1">
        {/* Badges row */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {variant === "flash" && flashDiscount ? (
            <span className="inline-flex items-center rounded-md bg-destructive/10 text-destructive text-[10px] font-bold px-1.5 py-0.5">
              Flash {flashDiscount}%
            </span>
          ) : null}
          <span className="inline-flex items-center rounded-md bg-secondary text-brand text-[10px] font-semibold px-1.5 py-0.5">
            {product.category}
          </span>
        </div>

        <h3 className="font-display text-sm md:text-base font-extrabold text-foreground truncate mt-0.5">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-[11px] leading-snug text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="mt-auto pt-2">
          <div className="flex items-baseline gap-2">
            <div className="font-display text-base md:text-lg font-extrabold text-brand">
              {lowest || product.variants[0]?.price}
            </div>
            {originalPrice && (
              <div className="text-[11px] text-muted-foreground line-through">
                {originalPrice}
              </div>
            )}
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
            {hasMany ? `${product.variants.length} varian aktif` : product.variants[0].label}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => setDetailOpen(true)}
            size="sm"
            variant="outline"
            className="flex-1 border-border bg-white text-foreground hover:bg-secondary hover:text-brand font-semibold rounded-lg h-9 gap-1.5"
            aria-label={`Detail ${product.name}`}
          >
            <Info className="h-3.5 w-3.5" /> Detail
          </Button>
          <Button
            onClick={handleClick}
            size="sm"
            className="flex-1 bg-brand hover:bg-brand/90 text-white font-semibold rounded-lg h-9"
          >
            Beli
          </Button>
        </div>
      </div>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              {product.logo ? (
                <img
                  src={product.logo}
                  alt={`${product.name} logo`}
                  className="h-12 w-12 object-contain rounded-lg bg-secondary p-1"
                />
              ) : null}
              <div className="text-left">
                <DialogTitle className="font-display text-lg font-extrabold">
                  {product.name}
                </DialogTitle>
                <div className="text-[11px] text-brand font-semibold">
                  {product.category}
                </div>
              </div>
            </div>
            {product.description && (
              <DialogDescription className="text-left pt-2 whitespace-pre-line">
                {product.description}
              </DialogDescription>
            )}
          </DialogHeader>

          <div className="mt-2">
            <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Pilihan paket
            </div>
            <ul className="space-y-1.5">
              {product.variants.map((v) => (
                <li
                  key={v.label}
                  className="flex items-center justify-between rounded-lg border border-border bg-secondary/40 px-3 py-2"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-foreground truncate">
                      {v.label}
                    </div>
                    {v.note && (
                      <div className="text-[11px] text-muted-foreground truncate">
                        {v.note}
                      </div>
                    )}
                  </div>
                  <div className="font-display text-sm font-extrabold text-brand shrink-0 ml-3">
                    {v.price}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Button
            onClick={() => {
              setDetailOpen(false);
              handleClick();
            }}
            className="w-full bg-brand hover:bg-brand/90 text-white font-semibold rounded-lg h-10 mt-2"
          >
            {hasMany ? "Pilih paket & beli" : "Beli sekarang"}
          </Button>
        </DialogContent>
      </Dialog>
    </article>
  );
};