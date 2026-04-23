import netflix from "@/assets/banners/netflix-banner.jpg";
import chatgpt from "@/assets/banners/chatgpt-banner.jpg";
import spotify from "@/assets/banners/spotify-banner.jpg";
import canva from "@/assets/banners/canva-banner.jpg";
import capcut from "@/assets/banners/capcut-banner.jpg";

export type Banner = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  badge: string;
  image: string;
  cta: string;
  waText: string;
  accent: string; // tailwind gradient classes for overlay
};

export const banners: Banner[] = [
  {
    id: "netflix",
    title: "Netflix Premium",
    subtitle: "Sharing 1P1U bergaransi penuh",
    price: "Rp 35.000",
    badge: "Hot Deal",
    image: netflix,
    cta: "Pesan Sekarang",
    waText: "Halo Atinstore, saya mau order Netflix Premium",
    accent: "from-red-900/90 via-red-900/60 to-transparent",
  },
  {
    id: "chatgpt",
    title: "ChatGPT Plus",
    subtitle: "Akses GPT-4 sepuasnya, mulai 25rb/bulan",
    price: "Rp 25.000",
    badge: "AI Trending",
    image: chatgpt,
    cta: "Pesan Sekarang",
    waText: "Halo Atinstore, saya mau order ChatGPT Plus",
    accent: "from-emerald-950/90 via-emerald-900/60 to-transparent",
  },
  {
    id: "spotify",
    title: "Spotify Premium",
    subtitle: "Musik tanpa iklan, harga termurah",
    price: "Murah",
    badge: "Best Seller",
    image: spotify,
    cta: "Cek Harga",
    waText: "Halo Atinstore, saya mau order Spotify Premium",
    accent: "from-green-950/90 via-green-900/60 to-transparent",
  },
  {
    id: "canva",
    title: "Canva Pro",
    subtitle: "Desain profesional cuma 4rb",
    price: "Rp 4.000",
    badge: "Super Murah",
    image: canva,
    cta: "Pesan Sekarang",
    waText: "Halo Atinstore, saya mau order Canva Pro",
    accent: "from-purple-950/90 via-purple-900/60 to-transparent",
  },
  {
    id: "capcut",
    title: "Capcut Pro",
    subtitle: "Edit video tanpa watermark",
    price: "Rp 7.000",
    badge: "Popular",
    image: capcut,
    cta: "Pesan Sekarang",
    waText: "Halo Atinstore, saya mau order Capcut Pro",
    accent: "from-slate-950/90 via-slate-900/60 to-transparent",
  },
];