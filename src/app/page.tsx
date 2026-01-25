"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";
import { applyOverrides } from "@/lib/adminCrud";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // fetch produk di client (karena 1 file + butuh localStorage override)
  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed to fetch products: ${res.status} - ${text}`);
        }

        const data = (await res.json()) as Product[];

        if (!alive) return;
        setProducts(data);
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message || "Failed to fetch products");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  // ✅ apply CRUD overrides dari Admin (localStorage)
  const finalProducts = useMemo(() => {
    const withQty = products.map((p) => ({ ...p, qty: p.qty ?? 10 }));
    return applyOverrides(withQty);
  }, [products]);

  // update kalau admin edit di tab lain
  useEffect(() => {
    const onStorage = () => {
      // trigger rerender memo: cukup set state ke nilai sama agar re-evaluasi
      setProducts((prev) => [...prev]);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <main className="min-h-screen text-slate-900">
      {/* Background gradien ala Stripe: gradien + putih + biru tua */}
      <div className="fixed inset-0 -z-10 bg-white" />
      <div className="fixed inset-x-0 top-0 -z-10 h-[420px] bg-gradient-to-b from-[#0b1b3a] via-[#0b1b3a]/40 to-transparent" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(56,189,248,0.35),transparent_45%),radial-gradient(circle_at_70%_15%,rgba(168,85,247,0.28),transparent_45%),radial-gradient(circle_at_30%_90%,rgba(34,211,238,0.22),transparent_50%)]" />

      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
              RevoShop
            </h1>
            <p className="text-white/70">Product listing (FakeStoreAPI)</p>
          </div>

          <nav className="flex gap-3 text-sm">
            <a
              className="rounded-full bg-white/10 px-4 py-2 font-semibold text-white hover:bg-white/15"
              href="/promo"
            >
              Promo
            </a>
            <a
              className="rounded-full bg-white/10 px-4 py-2 font-semibold text-white hover:bg-white/15"
              href="/faq"
            >
              FAQ
            </a>
          </nav>
        </header>

        {/* Status */}
        {loading && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-5 text-white/80 backdrop-blur">
            Loading products...
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-500/10 p-5 text-red-100 backdrop-blur">
            {error}
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          <section className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {finalProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </section>
        )}

        {!loading && !error && (
          <p className="mt-8 text-xs text-white/70">
            Info: Data produk mengikuti perubahan Admin (CRUD) via localStorage
            overrides.
          </p>
        )}
      </div>
    </main>
  );
}
