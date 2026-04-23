import logo from "@/assets/logos/atinstore.png";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
      <nav className="container flex items-center justify-between py-4">
        <a href="#top" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Atinstore logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full shadow-soft transition-transform group-hover:scale-105"
          />
          <span className="font-display text-xl font-bold text-primary tracking-tight">
            Atin<span className="text-gold">store</span>
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#produk" className="hover:text-primary transition-colors">Produk</a>
          <a href="#kenapa" className="hover:text-primary transition-colors">Kenapa Kami</a>
          <a href="#cara" className="hover:text-primary transition-colors">Cara Order</a>
        </div>
        <Button asChild variant="default" className="bg-primary hover:bg-navy-light shadow-soft">
          <a href="https://wa.me/6282324644060" target="_blank" rel="noopener noreferrer">
            Order via WA
          </a>
        </Button>
      </nav>
    </header>
  );
};