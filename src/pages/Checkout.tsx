import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/atinstore/Navbar";
import { Footer } from "@/components/atinstore/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, QrCode, Wallet, Building2, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type BuyerInfo = { name: string; email: string; whatsapp: string };
type CheckoutItem = {
  productName: string;
  variantLabel: string;
  price: string;
  qty: number;
  logo?: string;
  note?: string;
};

const ADMIN_WA = "6282324644060";

const PAYMENT_METHODS = [
  { id: "qris", label: "QRIS", desc: "Scan QR semua bank & e-wallet", icon: QrCode },
  { id: "va", label: "Virtual Account", desc: "BCA, BNI, Mandiri, BRI", icon: Building2 },
  { id: "ewallet", label: "E-Wallet", desc: "GoPay, OVO, Dana, ShopeePay", icon: Wallet },
  { id: "card", label: "Kartu Kredit / Debit", desc: "Visa, Mastercard, JCB", icon: CreditCard },
];

const parsePrice = (price: string) => {
  const n = parseInt(price.replace(/\D/g, ""));
  return isNaN(n) ? 0 : n;
};
const formatRupiah = (n: number) =>
  n > 0 ? `Rp ${n.toLocaleString("id-ID")}` : "Hubungi Admin";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? {}) as { buyer?: BuyerInfo; item?: CheckoutItem };
  const buyer = state.buyer;
  const item = state.item;

  const [method, setMethod] = useState<string>("qris");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  // ID transaksi unik — di-generate sekali per kunjungan halaman checkout
  const orderId = useMemo(
    () =>
      "ATN-" +
      Date.now().toString(36).toUpperCase() +
      "-" +
      Math.random().toString(36).slice(2, 6).toUpperCase(),
    []
  );

  if (!buyer || !item) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="font-display text-2xl font-extrabold text-foreground mb-2">
            Tidak ada pesanan
          </h1>
          <p className="text-muted-foreground mb-6">
            Silakan pilih produk dulu sebelum checkout.
          </p>
          <Button onClick={() => navigate("/")} className="rounded-full bg-brand text-white hover:bg-brand/90">
            ← Kembali ke Toko
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  const subtotal = parsePrice(item.price) * item.qty;
  const adminFee = method === "va" ? 4000 : method === "card" ? Math.round(subtotal * 0.029) : 0;
  const total = subtotal + adminFee;

  // QR mock dinamis: payload berbeda tiap transaksi → gambar QR berubah
  const qrPayload = `ATINSTORE|${orderId}|${item.productName}-${item.variantLabel}|qty:${item.qty}|amount:${total}|to:${ADMIN_WA}`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=8&data=${encodeURIComponent(qrPayload)}`;

  const handlePay = () => {
    setProcessing(true);
    // mock processing — replace with real payment gateway call later
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      toast.success("Pembayaran berhasil disimulasikan!");
    }, 1800);
  };

  if (success) {
    const waMessage = [
      "*BUKTI PEMBAYARAN ATINSTORE*",
      "",
      `Order ID: ${orderId}`,
      `Tanggal: ${new Date().toLocaleString("id-ID")}`,
      "",
      "*Data Pembeli*",
      `Nama   : ${buyer.name}`,
      `Email  : ${buyer.email}`,
      `WA     : ${buyer.whatsapp}`,
      "",
      "*Detail Pesanan*",
      `Produk : ${item.productName}`,
      `Varian : ${item.variantLabel}`,
      `Jumlah : ${item.qty}`,
      item.note ? `Catatan: ${item.note}` : "",
      "",
      "*Pembayaran*",
      `Metode   : ${PAYMENT_METHODS.find((m) => m.id === method)?.label ?? method}`,
      `Subtotal : ${formatRupiah(subtotal)}`,
      `Admin    : ${adminFee > 0 ? formatRupiah(adminFee) : "Gratis"}`,
      `*TOTAL   : ${formatRupiah(total)}*`,
      "",
      "Status: ✅ LUNAS (simulasi)",
      "",
      "Terima kasih telah berbelanja di Atinstore 🙏",
    ]
      .filter(Boolean)
      .join("\n");

    const waAdminUrl = `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(waMessage)}`;

    // Auto-redirect ke WhatsApp admin setelah sukses
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const t = setTimeout(() => {
        window.open(waAdminUrl, "_blank", "noopener,noreferrer");
      }, 800);
      return () => clearTimeout(t);
    }, [waAdminUrl]);

    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-16 max-w-xl">
          <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-card">
            <div className="mx-auto h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h1 className="font-display text-2xl font-extrabold text-foreground">
              Pembayaran Berhasil
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Order <span className="font-mono font-semibold text-foreground">{orderId}</span>
            </p>
            <div className="mt-6 rounded-2xl bg-secondary/40 p-4 text-left text-sm space-y-1">
              <div className="flex justify-between"><span className="text-muted-foreground">Produk</span><span className="font-semibold">{item.productName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Varian</span><span>{item.variantLabel}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Jumlah</span><span>{item.qty}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">WhatsApp</span><span>{buyer.whatsapp}</span></div>
              <div className="flex justify-between font-bold text-brand pt-2 border-t border-border mt-2"><span>Total</span><span>{formatRupiah(total)}</span></div>
            </div>
            <p className="text-xs text-muted-foreground mt-6">
              Mengarahkan ke WhatsApp admin untuk mengirim bukti pembayaran…
            </p>
            <a href={waAdminUrl} target="_blank" rel="noopener noreferrer" className="block mt-3">
              <Button className="w-full rounded-full bg-emerald-500 hover:bg-emerald-600 text-white h-11 font-semibold">
                <MessageCircle className="h-4 w-4 mr-2" /> Kirim Bukti ke Admin Atinstore
              </Button>
            </a>
            <button
              onClick={() => navigate("/")}
              className="mt-3 text-sm text-muted-foreground hover:text-brand"
            >
              ← Kembali ke Toko
            </button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 md:py-12">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-brand mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali
        </button>

        <h1 className="font-display text-2xl md:text-3xl font-extrabold text-foreground mb-6">
          Checkout Pembayaran
        </h1>

        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          {/* Left: payment method */}
          <div className="space-y-6">
            <section className="rounded-2xl border border-border bg-card p-5">
              <h2 className="font-display text-base font-bold text-foreground mb-4">
                Pilih Metode Pembayaran
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {PAYMENT_METHODS.map((m) => {
                  const Icon = m.icon;
                  const active = method === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setMethod(m.id)}
                      className={cn(
                        "flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all",
                        active
                          ? "border-brand bg-brand/5"
                          : "border-border hover:border-brand/40"
                      )}
                    >
                      <div
                        className={cn(
                          "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                          active ? "bg-brand text-white" : "bg-secondary text-brand"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-foreground text-sm">{m.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{m.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card p-5">
              <h2 className="font-display text-base font-bold text-foreground mb-3">
                Data Pembeli
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-muted-foreground">Nama</span>
                  <span className="font-semibold text-foreground">{buyer.name}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-semibold text-foreground break-all">{buyer.email}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-muted-foreground">WhatsApp</span>
                  <span className="font-semibold text-foreground">{buyer.whatsapp}</span>
                </div>
                <div className="flex justify-between gap-3 pt-2 border-t border-border">
                  <span className="text-muted-foreground">Order ID</span>
                  <span className="font-mono font-semibold text-foreground">{orderId}</span>
                </div>
              </div>
            </section>

            {method === "qris" && (
              <section className="rounded-2xl border border-border bg-card p-5">
                <h2 className="font-display text-base font-bold text-foreground mb-1">
                  Scan QRIS untuk Membayar
                </h2>
                <p className="text-xs text-muted-foreground mb-4">
                  QR unik untuk transaksi <span className="font-mono">{orderId}</span> — berubah tiap pesanan.
                </p>
                <div className="flex flex-col items-center gap-3">
                  <div className="rounded-2xl bg-white p-3 border border-border">
                    <img
                      src={qrImageUrl}
                      alt={`QR pembayaran ${orderId}`}
                      className="h-[260px] w-[260px] object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Nominal</div>
                    <div className="font-display text-xl font-extrabold text-brand">
                      {formatRupiah(total)}
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground text-center max-w-xs">
                    Catatan: ini QR simulasi. Untuk QR GoPay/QRIS asli yang nominal-nya berubah otomatis tiap transaksi, perlu integrasi payment gateway (Midtrans/Xendit).
                  </p>
                </div>
              </section>
            )}
          </div>

          {/* Right: summary */}
          <aside className="rounded-2xl border border-border bg-card p-5 h-fit lg:sticky lg:top-24">
            <h2 className="font-display text-base font-bold text-foreground mb-4">
              Ringkasan Pesanan
            </h2>

            <div className="flex gap-3 pb-4 border-b border-border">
              <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
                {item.logo ? (
                  <img src={item.logo} alt={item.productName} className="h-full w-full object-contain" />
                ) : (
                  <span className="font-display font-extrabold text-brand text-sm">
                    {item.productName.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-foreground text-sm truncate">{item.productName}</div>
                <div className="text-xs text-muted-foreground">{item.variantLabel} × {item.qty}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-display font-bold text-brand text-sm">{item.price}</div>
              </div>
            </div>

            <div className="space-y-2 py-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-foreground">{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Biaya admin</span>
                <span className="font-semibold text-foreground">
                  {adminFee > 0 ? formatRupiah(adminFee) : "Gratis"}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-baseline pt-3 border-t border-border">
              <span className="text-sm text-muted-foreground">Total Pembayaran</span>
              <span className="font-display text-2xl font-extrabold text-brand">
                {formatRupiah(total)}
              </span>
            </div>

            <Button
              onClick={handlePay}
              disabled={processing}
              className="mt-5 w-full rounded-full bg-brand hover:bg-brand/90 text-white h-12 font-semibold"
            >
              {processing ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Memproses…</>
              ) : (
                <>Bayar Sekarang</>
              )}
            </Button>

            <p className="text-[11px] text-muted-foreground mt-3 text-center">
              🔒 Simulasi pembayaran — payment gateway asli akan ditambahkan nanti.
            </p>
          </aside>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Checkout;