import type { Product } from "@/lib/types";
import HomeClient from "@/components/HomeClient";

export const dynamic = "force-static"; // ✅ SSG

async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products"); // ✅ cached static by default
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch products: ${res.status} - ${text}`);
  }
  return (await res.json()) as Product[];
}

export default async function HomePage() {
  const products = await getProducts();
  return <HomeClient initialProducts={products} />;
}
