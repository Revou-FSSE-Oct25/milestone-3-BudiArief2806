import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import ProductClient from "./ProductClient";

export const dynamic = "force-dynamic";

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: "no-store",
  });

  const text = await res.text();
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} - ${text}`);
  if (!text) throw new Error("Empty response body from API");

  return JSON.parse(text) as Product;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#f6f0e4] text-[#2b1b12]">
      {/* soft grain / vignette */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(139,94,60,0.18),transparent_50%),radial-gradient(circle_at_70%_25%,rgba(255,226,182,0.30),transparent_55%),radial-gradient(circle_at_50%_90%,rgba(80,45,28,0.16),transparent_55%)]" />

      <section className="mx-auto max-w-6xl px-6 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-[#2b1b12]/15 bg-[#fff7ea] px-4 py-2 text-sm font-semibold text-[#7a4a2a] shadow-sm hover:bg-[#fff0d9]"
        >
          ← Back to Home
        </Link>

        <div className="mt-6 grid gap-6 lg:grid-cols-2 items-start">
          {/* Image card */}
          <div className="rounded-3xl border border-[#2b1b12]/10 bg-[#fff7ea] p-6 shadow-[0_16px_50px_rgba(43,27,18,0.12)]">
            <div className="relative h-[360px] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#fff2dc] to-[#f3e5cf]">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-6"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Client side (akan apply override admin + stok) */}
          <ProductClient product={product} />
        </div>
      </section>
    </main>
  );
}
