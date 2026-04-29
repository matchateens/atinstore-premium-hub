import type { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { useState } from "react";
import { Info, Zap, Sparkles } from "lucide-react";
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
            className="flex-1 border-border bg-card text-foreground hover:bg-secondary hover:text-brand font-semibold rounded-lg h-9 gap-1.5"
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
        <DialogContent className="sm:max-w-4xl p-0 overflow-hidden max-h-[92vh] overflow-y-auto">
          {/* Breadcrumb */}
          <div className="px-5 md:px-7 pt-6 text-xs text-muted-foreground">
            <span>Toko</span> <span className="mx-1">›</span>
            <span>{product.category}</span> <span className="mx-1">›</span>
            <span className="text-foreground font-medium uppercase tracking-wide">
              {product.name}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-5 md:p-7">
            {/* Left: product image */}
            <div
              className="relative rounded-2xl aspect-square md:aspect-[4/4] flex items-center justify-center p-8 overflow-hidden border border-border"
              style={{ background: "var(--gradient-card)" }}
            >
              {product.logo ? (
                <img
                  src={product.logo}
                  alt={`${product.name} logo`}
                  className="max-h-48 md:max-h-60 w-auto object-contain drop-shadow-xl"
                />
              ) : (
                <div className="h-40 w-40 rounded-2xl bg-gradient-brand text-white font-display font-extrabold text-6xl flex items-center justify-center shadow-card">
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

            {/* Right: info */}
            <div className="flex flex-col">
              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className="inline-flex items-center rounded-full bg-secondary text-brand text-xs font-semibold px-3 py-1">
                  {product.category}
                </span>
                {flashDiscount ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 text-destructive text-xs font-bold px-3 py-1">
                    <Zap className="h-3 w-3" /> Flash {flashDiscount}%
                  </span>
                ) : null}
              </div>

              <DialogTitle className="font-display text-xl md:text-2xl font-extrabold uppercase tracking-tight leading-tight">
                {product.name}
              </DialogTitle>
              <div className="text-xs text-emerald-600 font-semibold mt-1">
                {product.variants.length} varian aktif
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <div className="font-display text-3xl md:text-4xl font-extrabold text-brand">
                  {lowest || product.variants[0]?.price}
                </div>
                {originalPrice && (
                  <div className="text-sm text-muted-foreground line-through">
                    {originalPrice}
                  </div>
                )}
              </div>

              {/* Variants card */}
              <div className="mt-5 rounded-2xl border border-border bg-secondary/40 p-4">
                <div className="text-sm font-semibold text-foreground mb-3">
                  Pilihan varian tersedia
                </div>
                <ul className="space-y-3">
                  {product.variants.map((v, idx) => (
                    <li
                      key={v.label}
                      className={
                        "flex items-start justify-between gap-3" +
                        (idx < product.variants.length - 1
                          ? " pb-3 border-b border-border"
                          : "")
                      }
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-foreground uppercase tracking-wide">
                          {v.label}
                        </div>
                        {v.note && (
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {v.note}
                          </div>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-display text-sm font-extrabold text-brand">
                          {v.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                Klik beli untuk memilih varian yang ingin diorder.
              </p>

              {/* CTAs */}
              <div className="mt-4 space-y-2">
                <Button
                  onClick={() => {
                    setDetailOpen(false);
                    handleClick();
                  }}
                  className="w-full bg-brand hover:bg-brand/90 text-white font-semibold rounded-full h-12 text-base"
                >
                  Beli Sekarang
                </Button>
                <Button
                  onClick={() => setDetailOpen(false)}
                  variant="outline"
                  className="w-full rounded-full h-12 font-semibold"
                >
                  ← Lihat Produk Lain
                </Button>
              </div>

              <div className="mt-4 rounded-xl border border-border bg-secondary/30 p-3 space-y-1.5 text-xs text-muted-foreground">
                <div>🔐 Varian dipilih saat checkout sesuai stok dan harga aktif</div>
                <div>📧 Konfirmasi order dikirim via email</div>
              </div>
            </div>
          </div>

          {/* Description section */}
          {product.description && (
            <div className="px-5 md:px-7 pb-7">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-xs font-bold text-brand uppercase tracking-wider">
                    Informasi Produk
                  </div>
                  <div className="font-display text-lg font-extrabold text-foreground mt-0.5">
                    Deskripsi Produk
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                  Baca detail sebelum checkout
                </span>
              </div>
              <div className="rounded-2xl border border-border bg-secondary/40 p-4 md:p-5 flex gap-3">
                <div className="shrink-0 h-8 w-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center">
                  <Sparkles className="h-4 w-4" />
                </div>
                <DialogDescription className="text-sm text-foreground/80 whitespace-pre-line leading-relaxed">
                  {product.description}
                </DialogDescription>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </article>
  );
};