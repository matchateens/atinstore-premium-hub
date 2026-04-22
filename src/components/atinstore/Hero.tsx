import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";

export const Hero = () => {
  return (
    <section
      id="top"
      className="relative overflow-hidden text-primary-foreground"
      style={{
        backgroundImage: `linear-gradient(135deg, hsl(var(--navy-deep) / 0.92), hsl(var(--navy) / 0.88)), url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container py-24 md:py-36 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold-light text-xs font-medium mb-6 animate-fade-up">
          <Sparkles className="h-3.5 w-3.5" />
          Premium · Murah · Bergaransi
        </div>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight animate-fade-up [animation-delay:100ms] opacity-0">
          Aplikasi Premium <br className="hidden md:block" />
          <span className="bg-gradient-gold bg-clip-text text-transparent">Harga Bersahabat</span>
        </h1>
        <p className="max-w-2xl mx-auto text-base md:text-lg text-primary-foreground/75 mb-10 animate-fade-up [animation-delay:200ms] opacity-0">
          Netflix, Spotify, Canva, ChatGPT, Capcut, dan puluhan aplikasi favorit lainnya.
          Garansi penuh, proses cepat, harga jujur.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up [animation-delay:300ms] opacity-0">
          <Button asChild size="lg" className="bg-gradient-gold hover:opacity-90 text-navy font-semibold shadow-gold border-0">
            <a href="#produk">Lihat Katalog</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent border-beige/30 text-primary-foreground hover:bg-beige/10 hover:text-primary-foreground">
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">Chat Admin</a>
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { icon: ShieldCheck, title: "Bergaransi", desc: "Garansi penuh selama masa aktif" },
            { icon: Zap, title: "Proses Cepat", desc: "Akun siap pakai dalam hitungan menit" },
            { icon: Sparkles, title: "Harga Termurah", desc: "Lebih hemat tanpa kompromi kualitas" },
          ].map((f) => (
            <div key={f.title} className="p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <f.icon className="h-6 w-6 text-gold-light mb-2 mx-auto" />
              <div className="font-semibold text-sm">{f.title}</div>
              <div className="text-xs text-primary-foreground/65 mt-1">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};