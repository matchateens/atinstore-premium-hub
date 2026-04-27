import { useState } from "react";
import type { Product } from "@/data/products";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { Check, ShoppingCart } from "lucide-react";

type Props = {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const VariantPickerDialog = ({ product, open, onOpenChange }: Props) => {
  const [selected, setSelected] = useState<number>(0);
  const { addItem } = useCart();

  if (!product) return null;

  const handleAdd = () => {
    const v = product.variants[selected];
    addItem({
      id: `${product.name}::${v.label}`,
      productName: product.name,
      variantLabel: v.label,
      price: v.price,
      note: v.note,
      logo: product.logo,
    });
    toast.success(`${product.name} - ${v.label} ditambahkan ke keranjang`);
    onOpenChange(false);
    setSelected(0);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-brand/10 to-brand-light/10 flex items-center justify-center p-2 shrink-0 overflow-hidden">
              {product.logo ? (
                <img src={product.logo} alt={product.name} className="h-full w-full object-contain" />
              ) : (
                <span className="font-display font-extrabold text-brand text-base">
                  {product.name
                    .replace(/[^A-Za-z0-9 ]/g, "")
                    .split(" ")
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")
                    .toUpperCase()}
                </span>
              )}
            </div>
            <div className="text-left">
              <DialogTitle className="font-display text-xl">{product.name}</DialogTitle>
              <DialogDescription>Pilih paket yang kamu inginkan</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {product.description && (
          <div className="rounded-lg bg-muted/40 border border-border px-3 py-2 text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
            {product.description}
          </div>
        )}

        <div className="grid gap-2 py-2 max-h-[50vh] overflow-y-auto">
          {product.variants.map((v, i) => (
            <button
              key={v.label}
              onClick={() => setSelected(i)}
              className={cn(
                "flex items-center justify-between gap-3 p-3 rounded-xl border-2 text-left transition-all",
                selected === i
                  ? "border-brand bg-brand/5 shadow-card"
                  : "border-border hover:border-brand/40"
              )}
            >
              <div className="min-w-0">
                <div className="font-semibold text-foreground text-sm">{v.label}</div>
                {v.note && <div className="text-xs text-muted-foreground mt-0.5">{v.note}</div>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="font-display font-bold text-brand text-sm">{v.price}</div>
                {selected === i && (
                  <div className="h-5 w-5 rounded-full bg-brand text-white flex items-center justify-center">
                    <Check className="h-3 w-3" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        <Button
          onClick={handleAdd}
          className="w-full bg-gradient-brand hover:opacity-90 text-white gap-2 rounded-full"
          size="lg"
        >
          <ShoppingCart className="h-4 w-4" /> Masukkan ke Keranjang
        </Button>
      </DialogContent>
    </Dialog>
  );
};