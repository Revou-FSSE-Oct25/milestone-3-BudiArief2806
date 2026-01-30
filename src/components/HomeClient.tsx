"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";
import { applyOverrides } from "@/lib/adminCrud";

function ProductCardSkeleton() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
      <div className="h-52 w-full rounded-2xl bg-white/10" />
      <div className="mt-4 space-y-2">
        <div className="h-4 w-5/6 rounded bg-white/10" />
        <div className="h-4 w-3/6 rounded bg-white/10" />
        <div className="mt-3 h-4 w-2/6 rounded bg-white/10" />
      </div>
    </div>
  );
}

export default function HomeClient({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // ✅ loading palsu singkat biar natural (tanpa fetch ulang)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 650); // atur 450-900ms sesuai selera
    return () => clearTimeout(t);
  }, []);

  // ✅ apply CRUD overrides dari Admin (localStorage)
  const finalProducts = useMemo(() => {
    const withQty = products.map((p) => ({ ...p, qty: p.qty ?? 10 }));
    return applyOverrides(withQty);
  }, [products]);

  // update kalau admin edit di tab lain
  useEffect(() => {
    const onStorage = () => {
      setProducts((prev) => [...prev]);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <main className="min-h-screen text-slate-900">
      {/* Background gradien ala Stripe */}
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
            <p className="text-white/70">
              Product listing (SSG + localStorage overrides)
            </p>
          </div>

          <nav className="flex gap-3 text-sm">
            <Link
              className="rounded-full bg-white/10 px-4 py-2 font-semibold text-white hover:bg-white/15"
              href="/promo"
            >
              Promo
            </Link>
            <Link
              className="rounded-full bg-white/10 px-4 py-2 font-semibold text-white hover:bg-white/15"
              href="/faq"
            >
              FAQ
            </Link>
          </nav>
        </header>

        {/* Grid */}
        {loading ? (
          <section className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </section>
        ) : (
          <section className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {finalProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </section>
        )}

        {!loading && (
          <p className="mt-8 text-xs text-white/70">
            Info: Data produk static (SSG) + perubahan Admin via localStorage
            overrides.
          </p>
        )}
      </div>
    </main>
  );
}
