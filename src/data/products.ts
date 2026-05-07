import netflix from "@/assets/logos/netflix.png";
import spotify from "@/assets/logos/spotify.png";
import fore from "@/assets/logos/fore.png";
import kopken from "@/assets/logos/kopken.png";
import canva from "@/assets/logos/canva.png";
import capcut from "@/assets/logos/capcut.png";
import chatgpt from "@/assets/logos/chatgpt.png";
import gemini from "@/assets/logos/gemini.png";
import grok from "@/assets/logos/grok.png";
import office365 from "@/assets/logos/office365.png";
import microsoft from "@/assets/logos/microsoft.png";
import vpnhma from "@/assets/logos/hma.png";
import vpnexpress from "@/assets/logos/express.png";
import vidio from "@/assets/logos/vidio.png";
import viu from "@/assets/logos/viu.png";
import youtube from "@/assets/logos/youtube.png";
import alightmotion from "@/assets/logos/alightmotion.png";
import applemusic from "@/assets/logos/apple_music.png";
import disneyplus from "@/assets/logos/disney+.png";
import duolingo from "@/assets/logos/duolingo.png";
import googledrive from "@/assets/logos/drive.png";
import grammarly from "@/assets/logos/grammarly.png";
import hbomax from "@/assets/logos/hbo.png";
import leonardoai from "@/assets/logos/leonardo.ai.png";
import lightroom from "@/assets/logos/lightroom.png";
import iqiyi from "@/assets/logos/iqiyi.png";
import primevideo from "@/assets/logos/prime.png";
import scribd from "@/assets/logos/scribd.png";
import vsco from "@/assets/logos/vsco.png";
import wattpad from "@/assets/logos/wattpad.png";
import wetv from "@/assets/logos/wetv.png";
import wpsoffice from "@/assets/logos/wps.png";
import starbucks from "@/assets/logos/starbucks.png";
import tomoro from "@/assets/logos/tomoro.png";

export type Variant = {
  label: string;
  price: string;
  note?: string;
};

export type Product = {
  name: string;
  category: "Streaming" | "AI" | "Produktivitas" | "Lifestyle" | "VPN" | "Edukasi";
  logo?: string;
  description?: string;
  variants: Variant[];
};

export const products: Product[] = [
  {
    name: "Alight Motion",
    category: "Produktivitas",
    logo: alightmotion,
    description: "Garansi login.",
    variants: [{ label: "1 Tahun", price: "Rp 1.500" }],
  },
  {
    name: "Apple Music",
    category: "Streaming",
    logo: applemusic,
    description: "No garansi — pahami sebelum order.",
    variants: [{ label: "1 Bulan", price: "Rp 5.000" }],
  },
  {
    name: "Bstation Premium",
    category: "Streaming",
    description: "Akun sharing dan bergaransi.",
    variants: [
      { label: "1 Bulan", price: "Rp 5.000" },
      { label: "1 Tahun", price: "Rp 18.000" },
    ],
  },
  {
    name: "Camscanner",
    category: "Produktivitas",
    description: "Akun sharing 1 tahun, garansi 3 bulan.",
    variants: [{ label: "1 Tahun", price: "Rp 18.000" }],
  },
  {
    name: "Canva Pro",
    category: "Produktivitas",
    logo: canva,
    description: "Durasi 1 bulan, full garansi.",
    variants: [
      { label: "Pro", price: "Rp 1.000" },
      { label: "Pro Head", price: "Rp 4.000" },
    ],
  },
  {
    name: "Capcut Pro",
    category: "Produktivitas",
    logo: capcut,
    description: "Full garansi & private akun. 35 day auto renew tiap 7 hari.",
    variants: [
      { label: "7 Day", price: "Rp 5.000" },
      { label: "35 Day", price: "Rp 15.000" },
    ],
  },
  {
    name: "ChatGPT",
    category: "AI",
    logo: chatgpt,
    description: "Durasi 1 bulan. Full garansi 25 hari (kecuali Go).",
    variants: [
      { label: "Via Invite 1 Bulan", price: "Rp 25.000", note: "Full garansi 25 hari" },
      { label: "ChatGPT Go 3 Bulan Privat", price: "Rp 25.000", note: "Garansi" },
      { label: "ChatGPT 1 Bulan Privat", price: "Rp 16.000", note: "No garansi" },
      { label: "ChatGPT 1 Bulan Sharing", price: "Rp 10.000", note: "No garansi" },
    ],
  },
  {
    name: "Disney+",
    category: "Streaming",
    logo: disneyplus,
    description: "Full garansi & akun sharing 10 user.",
    variants: [{ label: "1 Bulan", price: "Rp 23.000" }],
  },
  {
    name: "Drakor ID",
    category: "Streaming",
    description: "Akun sharing & garansi 3 bulan.",
    variants: [{ label: "1 Tahun", price: "Rp 8.000" }],
  },
  {
    name: "Dramabox VIP",
    category: "Streaming",
    description: "Full garansi & akun sharing.",
    variants: [{ label: "1 Bulan", price: "Rp 13.000" }],
  },
  {
    name: "Duolingo Super",
    category: "Edukasi",
    logo: duolingo,
    description: "Full garansi & akun private.",
    variants: [{ label: "1 Bulan", price: "Rp 2.000" }],
  },
  {
    name: "Dremina AI",
    category: "AI",
    description: "Full garansi, plan basic, dapat 570 credit.",
    variants: [{ label: "7 Hari", price: "Rp 2.500" }],
  },
  {
    name: "Gemini Pro",
    category: "AI",
    logo: gemini,
    description: "Durasi 4 bulan.",
    variants: [
      { label: "Gemini Pro Invite", price: "Rp 8.000" },
      { label: "Gemini Pro Head", price: "Rp 18.000", note: "No garansi" },
      { label: "Gemini Pro Head", price: "Rp 28.000", note: "Full garansi" },
    ],
  },
  {
    name: "Google Drive Storage",
    category: "Produktivitas",
    logo: googledrive,
    description: "Durasi 4 bulan, no garansi.",
    variants: [{ label: "Storage 2TB Sharing", price: "Rp 8.000" }],
  },
  {
    name: "Grammarly",
    category: "Produktivitas",
    logo: grammarly,
    description: "Akun sharing & garansi 25 hari.",
    variants: [{ label: "1 Bulan", price: "Rp 8.000" }],
  },
  {
    name: "HBO Max",
    category: "Streaming",
    logo: hbomax,
    description: "Akun sharing, full garansi.",
    variants: [{ label: "1 Bulan", price: "Rp 18.000" }],
  },
  {
    name: "Leonardo AI Unlimited",
    category: "AI",
    logo: leonardoai,
    description: "Sekali bayar, semua fitur terbuka. Bikin video AI & gambar sepuasnya. Cek di app.leonardo.ai",
    variants: [{ label: "Leonardo", price: "Rp 40.000" }],
  },
  {
    name: "Lightroom",
    category: "Produktivitas",
    logo: lightroom,
    description: "Garansi 3 bulan & akun private.",
    variants: [{ label: "1 Tahun", price: "Rp 8.000" }],
  },
  {
    name: "iQiyi Premium",
    category: "Streaming",
    logo: iqiyi,
    description: "Full garansi & akun sharing.",
    variants: [{ label: "1 Bulan", price: "Rp 9.000" }],
  },
  {
    name: "Loklok Premium",
    category: "Streaming",
    description: "Akun sharing 3 user & full garansi.",
    variants: [{ label: "1 Bulan", price: "Rp 18.000" }],
  },
  {
    name: "Netflix Premium",
    category: "Streaming",
    logo: netflix,
    description:
      "Full garansi. Kualitas HD/Full HD (tidak semua 4K). Cocok di HP & laptop semua device. Durasi akun 20–30 hari (sudah termasuk 1 bulan). Support all region. 1P1U: 1 profil, 1 device. Semi Private: 1 profil, 2 device, tidak nonton bareng.",
    variants: [
      { label: "1P1U — 1 Hari", price: "Rp 2.000" },
      { label: "1P1U — 3 Hari", price: "Rp 4.000" },
      { label: "1P1U — 7 Hari", price: "Rp 9.000" },
      { label: "1P1U — 1 Bulan", price: "Rp 26.000" },
      { label: "Semi Private — 1 Hari", price: "Rp 4.000" },
      { label: "Semi Private — 3 Hari", price: "Rp 6.000" },
      { label: "Semi Private — 7 Hari", price: "Rp 10.000" },
      { label: "Semi Private — 1 Bulan", price: "Rp 30.000" },
    ],
  },
  {
    name: "Microsoft 365",
    category: "Produktivitas",
    logo: microsoft,
    description: "Full garansi.",
    variants: [{ label: "1 Bulan", price: "Rp 8.000" }],
  },
  {
    name: "Melolo Premium",
    category: "Streaming",
    description: "Akun sharing & bergaransi.",
    variants: [
      { label: "1 Bulan", price: "Rp 6.000" },
      { label: "3 Bulan", price: "Rp 12.000" },
    ],
  },
  {
    name: "Office 365",
    category: "Produktivitas",
    logo: office365,
    description: "Garansi 6 bulan.",
    variants: [{ label: "Lifetime", price: "Rp 60.000" }],
  },
  {
    name: "Pippit AI",
    category: "AI",
    description: "Full garansi, dapat 827 credit. Plan starter & private akun.",
    variants: [{ label: "7 Hari", price: "Rp 8.000" }],
  },
  {
    name: "Prime Video",
    category: "Streaming",
    logo: primevideo,
    description: "Full garansi.",
    variants: [{ label: "1 Bulan Private", price: "Rp 13.000" }],
  },
  {
    name: "Scribd",
    category: "Edukasi",
    logo: scribd,
    description: "Full garansi & private akun.",
    variants: [{ label: "1 Bulan", price: "Rp 3.000" }],
  },
  {
    name: "Super Grok AI",
    category: "AI",
    logo: grok,
    description: "Pilihan private/sharing dengan garansi sesuai paket.",
    variants: [
      { label: "Private 3 Hari", price: "Rp 4.000", note: "Full garansi" },
      { label: "Private 7 Hari", price: "Rp 10.000", note: "Full garansi" },
      { label: "Private 3 Bulan", price: "Rp 170.000", note: "Full garansi" },
      { label: "Sharing 3 Bulan", price: "Rp 55.000", note: "Garansi" },
      { label: "Private 1 Bulan", price: "Rp 18.000", note: "No garansi" },
    ],
  },
  {
    name: "Vidio Platinum",
    category: "Streaming",
    logo: vidio,
    description: "Private akun, full garansi (TV: garansi login).",
    variants: [
      { label: "Mobile 1 Bulan", price: "Rp 28.000", note: "Full garansi" },
      { label: "TV 1 Tahun", price: "Rp 4.000", note: "Garansi login" },
    ],
  },
  {
    name: "Vision+",
    category: "Streaming",
    description: "Durasi 1 bulan, full garansi.",
    variants: [
      { label: "Private", price: "Rp 23.000" },
      { label: "Sharing 2 User", price: "Rp 13.000" },
    ],
  },
  {
    name: "Viu Premium",
    category: "Streaming",
    logo: viu,
    description: "Garansi 6 bulan selama method masih bisa.",
    variants: [
      { label: "1 Tahun Private", price: "Rp 2.000" },
      { label: "Lifetime Private", price: "Rp 4.000" },
    ],
  },
  {
    name: "VPN Express",
    category: "VPN",
    logo: vpnexpress,
    description: "Full garansi.",
    variants: [{ label: "1 Bulan Private", price: "Rp 8.000" }],
  },
  {
    name: "VPN HMA",
    category: "VPN",
    logo: vpnhma,
    description: "Full garansi.",
    variants: [{ label: "1 Bulan Private", price: "Rp 8.000" }],
  },
  {
    name: "VSCO",
    category: "Produktivitas",
    logo: vsco,
    description: "Akun sharing & garansi 3 bulan. Bisa iOS & Android.",
    variants: [{ label: "1 Tahun", price: "Rp 18.000" }],
  },
  {
    name: "Wattpad",
    logo: wattpad,
    category: "Lifestyle",
    description: "Akun sharing & bergaransi.",
    variants: [
      { label: "1 Bulan", price: "Rp 6.000" },
      { label: "1 Tahun", price: "Rp 18.000" },
    ],
  },
  {
    name: "WeTV Premium",
    logo: wetv,
    category: "Streaming",
    description: "Durasi 1 bulan & bergaransi.",
    variants: [
      { label: "Private", price: "Rp 28.000" },
      { label: "Sharing 6 User", price: "Rp 9.000" },
    ],
  },
  {
    name: "Wink",
    category: "Lifestyle",
    description: "Login khusus di Android via Google.",
    variants: [{ label: "Private 7 Hari", price: "Rp 4.000" }],
  },
  {
    name: "Wibuku Premium",
    category: "Lifestyle",
    description: "Akun sharing & bergaransi.",
    variants: [
      { label: "1 Bulan", price: "Rp 4.000" },
      { label: "3 Bulan", price: "Rp 9.000" },
    ],
  },
  {
    name: "WPS Office",
    logo: wpsoffice,
    category: "Produktivitas",
    description: "Akun sharing & garansi 3 bulan.",
    variants: [{ label: "1 Tahun", price: "Rp 18.000" }],
  },
  {
    name: "Youku",
    category: "Streaming",
    description: "Akun sharing & bergaransi.",
    variants: [
      { label: "1 Bulan", price: "Rp 6.000" },
      { label: "3 Bulan", price: "Rp 11.000" },
      { label: "1 Tahun", price: "Rp 18.000" },
    ],
  },
  {
    name: "YouTube Premium",
    category: "Streaming",
    logo: youtube,
    description: "Full garansi via invite.",
    variants: [{ label: "1 Bulan", price: "Rp 4.000" }],
  },
  {
    name: "Zoom Pro 100 Person",
    category: "Produktivitas",
    description: "Full garansi.",
    variants: [{ label: "14 Hari Private", price: "Rp 4.000" }],
  },
  {
    name: "Spotify",
    category: "Streaming",
    logo: spotify,
    description: "Premium individual.",
    variants: [{ label: "Premium", price: "Hubungi Admin" }],
  },
  {
    name: "Fore Coffee",
    category: "Lifestyle",
    logo: fore,
    description: "Akun voucher diskon.",
    variants: [{ label: "Akun", price: "Rp 6.000" }],
  },
  {
    name: "Kopi Kenangan",
    category: "Lifestyle",
    logo: kopken,
    description: "Akun voucher diskon.",
    variants: [{ label: "Akun", price: "Rp 6.000" }],
  },
  {
    name: "Starbucks",
    category: "Lifestyle",
    logo: starbucks,
    description: "Akun voucher diskon.",
    variants: [{ label: "Akun", price: "Rp 6.000" }],
  },
  {
    name: "Tomoro Coffee",
    category: "Lifestyle",
    logo: tomoro,
    description: "Akun voucher diskon.",
    variants: [{ label: "Akun", price: "Rp 6.000" }],
  },
];

export const categories = [
  "Semua",
  "Streaming",
  "AI",
  "Produktivitas",
  "Edukasi",
  "Lifestyle",
  "VPN",
] as const;
export type Category = (typeof categories)[number];