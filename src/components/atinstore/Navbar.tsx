import logo from "@/assets/logos/atinstore.png";
import { Button } from "@/components/ui/button";
import { Search, Headphones, FileText } from "lucide-react";
import { CartSheet } from "./CartSheet";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur border-b border-border">
      <nav className="container flex items-center gap-3 md:gap-4 py-3">
        <a href="#top" className="flex items-center gap-2 shrink-0 group">
          <div className="h-10 w-10 rounded-xl bg-brand flex items-center justify-center shadow-card overflow-hidden">
            <img src={logo} alt="Tinspedia logo" width={40} height={40} className="h-8 w-8 object-contain" />
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-display text-base md:text-lg font-extrabold text-foreground tracking-tight">
              Tinspedia
            </span>
            <span className="text-[11px] text-muted-foreground">Digital goods, clean checkout</span>
          </div>
        </a>

        <div className="flex-1 relative max-w-xl hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Cari produk…"
            className="w-full h-10 pl-11 pr-4 rounded-full bg-secondary text-foreground placeholder:text-muted-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-brand/30"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                document.getElementById("produk")?.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button
            asChild
            variant="outline"
            className="hidden sm:inline-flex rounded-full border-border bg-card text-foreground hover:bg-secondary gap-2 font-semibold"
          >
            <a href="#produk">
              <FileText className="h-4 w-4" /> Cek Invoice
            </a>
          </Button>
          <Button
            asChild
            className="hidden sm:inline-flex rounded-full bg-brand text-white hover:bg-brand/90 gap-2 font-semibold shadow-card"
          >
            <a href="https://wa.me/6282324644060" target="_blank" rel="noopener noreferrer">
              <Headphones className="h-4 w-4" /> Bantuan
            </a>
          </Button>
          <CartSheet />
        </div>
      </nav>
    </header>
  );
};