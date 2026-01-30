import type { Product } from "@/lib/types";

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Backpack (Fallback)",
    price: 39.99,
    description: "Produk cadangan saat API eksternal diblokir.",
    category: "bags",
    image: "https://placehold.co/600x400?text=Fallback+Product",
  },
  {
    id: 2,
    title: "T-Shirt (Fallback)",
    price: 19.99,
    description: "Produk cadangan saat API eksternal bermasalah.",
    category: "fashion",
    image: "https://placehold.co/600x400?text=Fallback+Product",
  },
  {
    id: 3,
    title: "Jacket (Fallback)",
    price: 59.99,
    description: "Produk cadangan untuk menjaga build tetap sukses.",
    category: "fashion",
    image: "https://placehold.co/600x400?text=Fallback+Product",
  },
];
