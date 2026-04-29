import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/data/products";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Zap } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  flashDiscount?: number;
};

const buyerSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter").max(100),
  email: z.string().trim().email("Email tidak valid").max(255),
});

const parsePrice = (price: string) => {
  const n = parseInt(price.replace(/\D/g, ""));
  return isNaN(n) ? 0 : n;
};

const formatRupiah = (n: number) =>
  n > 0 ? `Rp ${n.toLocaleString("id-ID")}` : "Hubungi Admin";

export const BuyDialog = ({ product, open, onOpenChange, flashDiscount }: Props) => {
  const [selected, setSelected] = useState(0);
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { addItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setSelected(0);
      setQty(1);
    }
  }, [open, product?.name]);

  if (!product) return null;

  const variant = product.variants[selected];
  const unitPrice = parsePrice(variant.price);
  const total = unitPrice * qty;
  const originalUnit = flashDiscount && unitPrice
    ? Math.round(unitPrice / (1 - flashDiscount / 100))
    : 0;

  const handleSubmit = () => {
    const parsed = buyerSchema.safeParse({ name, email });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    addItem(
      {
        id: `${product.name}::${variant.label}`,
        productName: product.name,
        variantLabel: variant.label,
        price: variant.price,
        note: variant.note,
        logo: product.logo,
      },
      qty
    );
    onOpenChange(false);
    navigate("/checkout", {
      state: {
        buyer: parsed.data,
        item: {
          productName: product.name,
          variantLabel: variant.label,
          price: variant.price,
          qty,
          logo: product.logo,
          note: variant.note,
        },
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden max-h-[92vh] flex flex-col bg-card">
        <DialogHeader className="px-5 pt-5 pb-3 border-b border-border">
          <DialogTitle className="font-display text-xl font-extrabold">Beli Produk</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Product header card */}
          <div
            className="rounded-2xl p-4 border border-border"
            style={{ background: "var(--gradient-card)" }}
          >
            <div className="flex items-start gap-3">
              <div className="h-14 w-14 shrink-0 rounded-xl bg-card/60 flex items-center justify-center p-2 overflow-hidden">
                {product.logo ? (
                  <img src={product.logo} alt={product.name} className="h-full w-full object-contain" />
                ) : (
                  <span className="font-display font-extrabold text-brand text-base">
                    {product.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-display font-extrabold text-foreground text-sm md:text-base uppercase tracking-tight">
                  {product.name} — {variant.label}
                </div>
                {flashDiscount ? (
                  <span className="inline-flex items-center gap-1 mt-1.5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5">
                    <Zap className="h-3 w-3" /> Flash Sale {flashDiscount}%
                  </span>
                ) : null}
                <div className="mt-2 flex items-baseline gap-2">
                  <div className="font-display text-xl font-extrabold text-brand">
                    {variant.price} <span className="text-xs text-muted-foreground font-normal">/ pcs</span>
                  </div>
                </div>
                {originalUnit > 0 && (
                  <div className="text-xs text-muted-foreground line-through">
                    {formatRupiah(originalUnit)}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Variant picker */}
          <div>
            <div className="text-sm font-semibold text-foreground mb-2">Pilih Varian</div>
            <div className="space-y-2">
              {product.variants.map((v, i) => {
                const vUnit = parsePrice(v.price);
                const vOrig = flashDiscount && vUnit ? Math.round(vUnit / (1 - flashDiscount / 100)) : 0;
                return (
                  <button
                    key={v.label}
                    onClick={() => setSelected(i)}
                    className={cn(
                      "w-full flex items-start justify-between gap-3 p-3 rounded-xl border-2 text-left transition-all",
                      selected === i
                        ? "border-brand bg-brand/5"
                        : "border-border hover:border-brand/40 bg-card"
                    )}
                  >
                    <div className="min-w-0">
                      <div className="font-bold text-foreground text-sm uppercase tracking-tight">
                        {v.label}
                      </div>
                      {v.note && (
                        <div className="text-xs text-muted-foreground mt-0.5">{v.note}</div>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-display font-extrabold text-brand text-sm">{v.price}</div>
                      {vOrig > 0 && (
                        <div className="text-xs text-muted-foreground line-through">
                          {formatRupiah(vOrig)}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Buyer form */}
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="buyer-name">Nama Lengkap</Label>
              <Input
                id="buyer-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkap"
                maxLength={100}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="buyer-email">Email (untuk invoice)</Label>
              <Input
                id="buyer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                maxLength={255}
              />
            </div>
          </div>

          {/* Quantity */}
          <div>
            <div className="text-sm font-semibold text-foreground mb-2">Jumlah</div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:border-brand hover:text-brand transition-colors"
                aria-label="Kurangi"
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="min-w-[2rem] text-center font-bold text-foreground">{qty}</div>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:border-brand hover:text-brand transition-colors"
                aria-label="Tambah"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer total + CTA */}
        <div className="border-t border-border px-5 py-4 flex items-center justify-between gap-3 bg-card">
          <div>
            <div className="text-xs text-brand font-semibold">Total Pembayaran</div>
            <div className="font-display text-2xl font-extrabold text-foreground">
              {formatRupiah(total)}
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            className="rounded-full bg-brand hover:bg-brand/90 text-white font-semibold h-11 px-5"
          >
            Lanjut ke Pembayaran →
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};