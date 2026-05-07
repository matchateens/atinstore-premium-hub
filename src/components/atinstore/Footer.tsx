import logoLight from "@/assets/logos/tinspedia_light.png";
import logoDark from "@/assets/logos/tinspedia_dark.png";
import { Instagram, MessageCircle, Mail } from "lucide-react";
import { useTheme } from "next-themes";

export const Footer = () => {
  const { resolvedTheme } = useTheme();
  const currentLogo = resolvedTheme === "dark" ? logoDark : logoLight;

  return (
  <footer className="bg-gradient-to-br from-brand-deep via-brand to-brand-light text-white mt-4">
    <div className="container py-14">
      <div className="grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={currentLogo} alt="Tinspedia" width={40} height={40} className="h-10 w-10 rounded-full bg-white object-cover scale-[1.35]" />
            <span className="font-display text-xl font-bold">
              Tins<span className="text-gold-light">pedia</span>
            </span>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            Toko aplikasi premium terpercaya. Murah, cepat, dan bergaransi.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3 text-gold-light">Navigasi</h4>
          <ul className="space-y-2 text-sm text-white/75">
            <li><a href="#produk" className="hover:text-gold-light transition-colors">Katalog Produk</a></li>
            <li><a href="#cara" className="hover:text-gold-light transition-colors">Cara Order</a></li>
            <li><a href="https://wa.me/6282324644060" target="_blank" rel="noopener noreferrer" className="hover:text-gold-light transition-colors">Chat Admin</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3 text-gold-light">Hubungi Kami</h4>
          <ul className="space-y-2 text-sm text-white/75">
            <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /> WhatsApp Admin</li>
            <li className="flex items-center gap-2"><Instagram className="h-4 w-4" /> @fatin.cahyo_</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> fatincahya69@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-white/15 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Tinspedia. All rights reserved.
      </div>
    </div>
  </footer>
  );
};