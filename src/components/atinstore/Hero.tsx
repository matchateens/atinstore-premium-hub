import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section
      id="top"
      className="relative pt-6 pb-8 md:pt-10 md:pb-14"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="container">
        <div className="rounded-3xl bg-card/70 backdrop-blur border border-border shadow-soft p-6 md:p-10 lg:p-12">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 items-center">
            {/* Left: headline */}
            <div className="lg:col-span-3">
              <div className="text-xs font-bold tracking-[0.22em] text-brand uppercase mb-4">
                Atinstore
              </div>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.05] tracking-tight">
                Toko aplikasi premium{" "}
                <span className="text-brand">murah & bergaransi</span>{" "}
                dengan checkout cepat.
              </h1>
              <p className="mt-4 md:mt-5 text-muted-foreground text-sm md:text-base max-w-xl">
                Netflix, Spotify, ChatGPT, Canva, Capcut & banyak lagi. Proses 5 menit,
                support WhatsApp, dan harga ramah kantong.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="h-11 px-6 rounded-full bg-brand hover:bg-brand/90 text-white font-semibold shadow-card"
                >
                  <a href="#produk">Lihat produk</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-11 px-6 rounded-full border-border bg-card text-foreground font-semibold"
                >
                  <a href="#cara">Cara order</a>
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Garansi penuh", "Proses cepat", "Support WhatsApp"].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 rounded-full bg-secondary text-brand text-xs font-semibold px-3 py-1.5 border border-border"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: quick pick card */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-gradient-to-br from-brand-bg to-white border border-border p-6 md:p-7 shadow-card">
                <div className="text-[11px] font-bold tracking-[0.2em] text-brand uppercase">
                  Pilihan cepat
                </div>
                <h3 className="mt-2 font-display text-xl md:text-2xl font-extrabold text-foreground leading-snug">
                  Checkout langsung via WhatsApp
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Pilih produk, kirim pesanan, akun siap dalam hitungan menit.
                </p>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    { k: "1x", v: "alur bayar" },
                    { k: "Live", v: "cek status" },
                    { k: "Rapi", v: "tampilan toko" },
                  ].map((i) => (
                    <div
                      key={i.k}
                      className="rounded-xl bg-card border border-border p-3 text-center"
                    >
                      <div className="font-display text-base md:text-lg font-extrabold text-brand">
                        {i.k}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        {i.v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};