import netflix from "@/assets/logos/netflix.png";
import spotify from "@/assets/logos/spotify.png";
import fore from "@/assets/logos/fore.png";
import kopken from "@/assets/logos/kopken.png";
import bstation from "@/assets/logos/bstation.png";
import canva from "@/assets/logos/canva.png";
import capcut from "@/assets/logos/capcut.png";
import chatgpt from "@/assets/logos/chatgpt.png";
import dremina from "@/assets/logos/dremina.png";
import gemini from "@/assets/logos/gemini.png";
import grok from "@/assets/logos/grok.png";
import office365 from "@/assets/logos/office365.png";
import vpnhma from "@/assets/logos/vpnhma.png";
import vpnexpress from "@/assets/logos/vpnexpress.png";
import vidio from "@/assets/logos/vidio.png";
import viu from "@/assets/logos/viu.png";
import youtube from "@/assets/logos/youtube.png";

export type Variant = {
  label: string;
  price: string;
  note?: string;
};

export type Product = {
  name: string;
  category: "Streaming" | "AI" | "Produktivitas" | "Lifestyle" | "VPN";
  logo: string;
  variants: Variant[];
};

export const products: Product[] = [
  {
    name: "Netflix",
    category: "Streaming",
    logo: netflix,
    variants: [
      { label: "Sharing 1P1U", price: "Rp 35.000", note: "1 profil 1 user" },
      { label: "Private", price: "Hubungi Admin", note: "Akun pribadi" },
    ],
  },
  {
    name: "Spotify",
    category: "Streaming",
    logo: spotify,
    variants: [{ label: "Premium", price: "Hubungi Admin" }],
  },
  {
    name: "Fore Coffee",
    category: "Lifestyle",
    logo: fore,
    variants: [{ label: "Akun", price: "Rp 6.000" }],
  },
  {
    name: "Kopi Kenangan",
    category: "Lifestyle",
    logo: kopken,
    variants: [{ label: "Akun", price: "Rp 6.000" }],
  },
  {
    name: "Bstation",
    category: "Streaming",
    logo: bstation,
    variants: [
      { label: "1 Bulan", price: "Rp 10.000" },
      { label: "1 Tahun", price: "Rp 25.000" },
    ],
  },
  {
    name: "Canva",
    category: "Produktivitas",
    logo: canva,
    variants: [
      { label: "Pro", price: "Rp 4.000" },
      { label: "Head", price: "Rp 7.000" },
    ],
  },
  {
    name: "Capcut",
    category: "Produktivitas",
    logo: capcut,
    variants: [
      { label: "7 Hari", price: "Rp 7.000" },
      { label: "35 Hari", price: "Rp 15.000" },
    ],
  },
  {
    name: "ChatGPT",
    category: "AI",
    logo: chatgpt,
    variants: [
      { label: "Invite 1 Bulan", price: "Rp 25.000" },
      { label: "Private 1 Bulan", price: "Rp 30.000" },
    ],
  },
  {
    name: "Dremina",
    category: "AI",
    logo: dremina,
    variants: [{ label: "7 Hari", price: "Rp 7.000" }],
  },
  {
    name: "Gemini",
    category: "AI",
    logo: gemini,
    variants: [
      { label: "Invite Pro", price: "Rp 15.000" },
      { label: "Pro Head", price: "Rp 25.000" },
      { label: "Pro Head (Full Garansi)", price: "Rp 35.000" },
    ],
  },
  {
    name: "Grok",
    category: "AI",
    logo: grok,
    variants: [
      { label: "Private 3 Hari", price: "Rp 9.000", note: "Full garansi" },
      { label: "Private 7 Hari", price: "Rp 15.000", note: "Full garansi" },
      { label: "Private 3 Bulan", price: "Rp 190.000", note: "Full garansi" },
      { label: "Sharing 3 Bulan", price: "Rp 70.000", note: "Garansi" },
      { label: "Private 1 Bulan", price: "Rp 25.000", note: "No garansi" },
    ],
  },
  {
    name: "Office 365",
    category: "Produktivitas",
    logo: office365,
    variants: [{ label: "Lifetime", price: "Rp 80.000", note: "Garansi 6 bulan" }],
  },
  {
    name: "VPN HMA",
    category: "VPN",
    logo: vpnhma,
    variants: [{ label: "1 Bulan", price: "Rp 15.000" }],
  },
  {
    name: "VPN Express",
    category: "VPN",
    logo: vpnexpress,
    variants: [{ label: "1 Bulan", price: "Rp 15.000" }],
  },
  {
    name: "Vidio",
    category: "Streaming",
    logo: vidio,
    variants: [
      { label: "Mobile 1 Bulan", price: "Rp 35.000", note: "Private akun" },
      { label: "TV 1 Tahun", price: "Rp 8.000", note: "Full garansi login" },
    ],
  },
  {
    name: "Viu",
    category: "Streaming",
    logo: viu,
    variants: [
      { label: "1 Tahun Private", price: "Rp 5.000", note: "Garansi 6 bulan" },
      { label: "Lifetime Private", price: "Rp 8.000", note: "Garansi 6 bulan" },
    ],
  },
  {
    name: "YouTube",
    category: "Streaming",
    logo: youtube,
    variants: [{ label: "Invite 1 Bulan", price: "Rp 7.000" }],
  },
];

export const categories = ["Semua", "Streaming", "AI", "Produktivitas", "Lifestyle", "VPN"] as const;
export type Category = (typeof categories)[number];