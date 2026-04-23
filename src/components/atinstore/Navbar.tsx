import logo from "@/assets/logos/atinstore.png";
import { Button } from "@/components/ui/button";
import { Search, MessageCircle } from "lucide-react";
import { CartSheet } from "./CartSheet";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-brand-deep via-brand to-brand-light shadow-soft">
      <nav className="container flex items-center gap-3 md:gap-6 py-3">
        <a href="#top" className="flex items-center gap-2 shrink-0 group">
          <img
            src={logo}
            alt="Atinstore logo"
            width={40}
            height={40}
            className="h-9 w-9 md:h-10 md:w-10 rounded-full ring-2 ring-white/40 transition-transform group-hover:scale-105"
          />
          <span className="hidden sm:inline font-display text-lg md:text-xl font-extrabold text-white tracking-tight">
            Atin<span className="text-gold-light">store</span>
          </span>
        </a>

        <div className="flex-1 relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Cari aplikasi: Netflix, ChatGPT, Canva..."
            className="w-full h-11 pl-11 pr-4 rounded-full bg-white text-foreground placeholder:text-muted-foreground text-sm shadow-card focus:outline-none focus:ring-2 focus:ring-white/60"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                document.getElementById("produk")?.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />
        </div>

        <CartSheet />
        <Button
          asChild
          className="hidden md:inline-flex bg-white text-brand hover:bg-white/90 font-semibold gap-2 rounded-full shadow-card"
        >
          <a href="https://wa.me/6282324644060" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4" /> Chat Admin
          </a>
        </Button>
      </nav>

      {/* Category strip */}
      <div className="bg-white/95 backdrop-blur border-t border-white/40">
        <div className="container flex items-center gap-1 overflow-x-auto py-2.5 scrollbar-none text-sm font-medium">
          {[
            { label: "🔥 Trending", href: "#produk" },
            { label: "Streaming", href: "#produk" },
            { label: "AI Tools", href: "#produk" },
            { label: "Produktivitas", href: "#produk" },
            { label: "VPN", href: "#produk" },
            { label: "Lifestyle", href: "#produk" },
            { label: "Cara Order", href: "#cara" },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="px-3 py-1.5 rounded-full text-foreground/80 hover:bg-brand/10 hover:text-brand whitespace-nowrap transition-colors"
            >
              {c.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};