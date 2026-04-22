import { MessageCircle, CreditCard, KeyRound } from "lucide-react";

const steps = [
  { icon: MessageCircle, title: "Chat Admin", desc: "Hubungi admin via WhatsApp dan pilih aplikasi yang diinginkan." },
  { icon: CreditCard, title: "Lakukan Pembayaran", desc: "Transfer ke rekening yang tersedia. Aman & terpercaya." },
  { icon: KeyRound, title: "Terima Akun", desc: "Akun premium langsung dikirim, siap pakai dalam hitungan menit." },
];

export const HowToOrder = () => (
  <section id="cara" className="py-20 md:py-28 bg-beige-light">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="text-xs font-semibold tracking-[0.2em] text-gold uppercase mb-3">Cara Order</div>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-primary mb-4">Simpel, Cepat, Aman</h2>
        <p className="text-muted-foreground">Hanya 3 langkah untuk dapat akun premium impianmu.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <div key={s.title} className="relative bg-card rounded-2xl p-8 shadow-soft border border-border hover:shadow-elegant transition-smooth">
            <div className="absolute -top-4 -left-4 h-12 w-12 rounded-xl bg-gradient-gold flex items-center justify-center font-display font-bold text-navy text-lg shadow-gold">
              {i + 1}
            </div>
            <s.icon className="h-8 w-8 text-navy mb-4 mt-2" />
            <h3 className="font-display text-xl font-bold text-primary mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);