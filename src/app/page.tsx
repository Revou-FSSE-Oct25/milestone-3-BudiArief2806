import type { Product } from "@/lib/types";
import HomeClient from "@/components/HomeClient";
import { FALLBACK_PRODUCTS } from "@/lib/fallbackProducts";

export const dynamic = "force-static"; // ✅ SSG

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const text = await res.text();
    if (!res.ok) throw new Error(`Failed: ${res.status}`);
    if (!text) throw new Error("Empty response");

    return JSON.parse(text) as Product[];
  } catch {
    // ✅ kalau kena 403 Cloudflare → pakai fallback
    return FALLBACK_PRODUCTS;
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return <HomeClient initialProducts={products} />;
}
