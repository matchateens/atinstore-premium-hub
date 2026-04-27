import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Minus, Plus, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { buildCheckoutMessage } from "@/lib/checkout";
import { useState } from "react";

const WA_NUMBER = "6282324644060";

export const CartSheet = () => {
  const { items, count, totalText, removeItem, updateQty, clear } = useCart();
  const [open, setOpen] = useState(false);

  const handleCheckout = () => {
    if (items.length === 0) return;
    const message = buildCheckoutMessage(items, totalText);
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="relative bg-white text-brand hover:bg-white/90 rounded-full shadow-card"
          aria-label="Keranjang"
        >
          <ShoppingCart className="h-4 w-4" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-gold text-brand-deep text-[10px] font-bold flex items-center justify-center ring-2 ring-brand">
              {count}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-xl flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-brand" /> Keranjang ({count})
          </SheetTitle>
          <SheetDescription>Cek pesanan kamu sebelum checkout via WhatsApp</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto -mx-6 px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground py-12">
              <ShoppingCart className="h-12 w-12 mb-3 opacity-40" />
              <p className="text-sm">Keranjang masih kosong</p>
              <p className="text-xs mt-1">Pilih produk favoritmu dulu yuk!</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 p-3 rounded-xl border border-border bg-card"
                >
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand/10 to-brand-light/10 flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
                    {item.logo ? (
                      <img src={item.logo} alt={item.productName} className="h-full w-full object-contain" />
                    ) : (
                      <span className="font-display font-extrabold text-brand text-sm">
                        {item.productName
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
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-semibold text-sm text-foreground truncate">
                          {item.productName}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">{item.variantLabel}</div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                        aria-label="Hapus"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="font-display font-bold text-brand text-sm">{item.price}</div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="h-7 w-7 rounded-full border border-border flex items-center justify-center hover:border-brand hover:text-brand transition-colors"
                          aria-label="Kurangi"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center text-sm font-semibold">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="h-7 w-7 rounded-full border border-border flex items-center justify-center hover:border-brand hover:text-brand transition-colors"
                          aria-label="Tambah"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total estimasi</span>
              <span className="font-display text-lg font-extrabold text-brand">{totalText}</span>
            </div>
            <Button
              onClick={handleCheckout}
              className="w-full bg-gradient-brand hover:opacity-90 text-white gap-2 rounded-full"
              size="lg"
            >
              <MessageCircle className="h-4 w-4" /> Checkout via WhatsApp
            </Button>
            <button
              onClick={clear}
              className="w-full text-xs text-muted-foreground hover:text-destructive transition-colors"
            >
              Kosongkan keranjang
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};