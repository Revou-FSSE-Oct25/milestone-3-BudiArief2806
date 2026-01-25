"use client";

import { applyOverrides } from "@/lib/adminCrud";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

type CategoryKey = "all" | "tas" | "baju" | "komputer" | "perhiasan";
type SortKey = "default" | "low-high" | "high-low";

const CATEGORY_LABEL: Record<CategoryKey, string> = {
  all: "Semua",
  tas: "Tas",
  baju: "Baju",
  komputer: "Kelengkapan Komputer",
  perhiasan: "Perhiasan",
};

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [active, setActive] = useState<CategoryKey>("all");
  const [sort, setSort] = useState<SortKey>("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = (await res.json()) as Product[];
        const withQty = data.map((p) => ({ ...p, qty: p.qty ?? 10 }));
        const merged = applyOverrides(withQty);

        if (isMounted) setProducts(merged);
      } catch (e: any) {
        if (isMounted) setError(e?.message || "Error fetching products");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    let result = products;

    if (active === "baju") {
      result = result.filter((p) => {
        const isClothing =
          p.category === "men's clothing" || p.category === "women's clothing";

        const t = p.title.toLowerCase();
        const isBag =
          t.includes("bag") || t.includes("backpack") || t.includes("pack");

        return isClothing && !isBag;
      });
    } else if (active === "komputer") {
      result = result.filter((p) => p.category === "electronics");
    } else if (active === "perhiasan") {
      result = result.filter((p) => p.category === "jewelery");
    } else if (active === "tas") {
      const bagKeywords = ["bag", "backpack", "packsack", "pack"];
      result = result.filter((p) => {
        const t = p.title.toLowerCase();
        return bagKeywords.some((k) => t.includes(k));
      });
    }

    if (sort === "low-high") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, active, sort]);

  const sliderRef = useRef<HTMLDivElement | null>(null);
  function scrollBy(px: number) {
    sliderRef.current?.scrollBy({ left: px, behavior: "smooth" });
  }

  const tabBase =
    "rounded-full px-5 py-2 text-sm font-semibold border transition shadow-sm";

  const tabActive =
    "bg-emerald-400 text-slate-900 border-emerald-400 hover:bg-emerald-300";

  const tabIdle = "bg-white/90 text-slate-800 border-white/40 hover:bg-white";

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500">
      <div className="mx-auto max-w-6xl p-6">
        {/* Hero / Header Panel */}
        <div className="rounded-3xl bg-white/10 backdrop-blur border border-white/20 p-8 text-white">
          <h1 className="text-4xl font-extrabold tracking-tight">Store</h1>
          <p className="mt-2 text-white/80 max-w-2xl">
            Pilih kategori dan urutkan harga agar customer lebih mudah mencari
            barang.
          </p>

          {/* Category buttons */}
          <div className="mt-6 flex flex-wrap gap-2">
            {(Object.keys(CATEGORY_LABEL) as CategoryKey[]).map((key) => {
              const activeNow = key === active;
              return (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className={`${tabBase} ${activeNow ? tabActive : tabIdle}`}
                >
                  {CATEGORY_LABEL[key]}
                </button>
              );
            })}
          </div>

          {/* Sort harga */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <label className="text-sm text-white/80">Urutkan harga:</label>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="
                h-10 rounded-xl border border-white/30 bg-white/90 px-3 text-sm text-slate-900
                shadow-sm outline-none focus:ring-2 focus:ring-emerald-300
              "
            >
              <option value="default">Normal</option>
              <option value="low-high">Termurah → Termahal</option>
              <option value="high-low">Termahal → Termurah</option>
            </select>

            <span className="text-sm text-white/80">
              ({CATEGORY_LABEL[active]} • {filtered.length} produk)
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-10">
          {/* Loading */}
          {loading && (
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-600">Loading products...</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="rounded-2xl border border-red-300 bg-red-50 p-6 text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && (
            <>
              {/* Featured slider */}
              <section className="rounded-2xl bg-white p-6 shadow-md">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Featured
                    </h2>
                    <p className="text-sm text-slate-600">
                      Slide produk untuk kategori:{" "}
                      <b>{CATEGORY_LABEL[active]}</b>
                    </p>
                  </div>
                </div>

                <div className="relative mt-5">
                  <button
                    onClick={() => scrollBy(-420)}
                    className="
                      absolute -left-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2
                      rounded-full border border-slate-200 bg-white shadow-sm
                      hover:bg-slate-50
                    "
                    aria-label="Previous"
                    type="button"
                  >
                    ‹
                  </button>

                  <div
                    ref={sliderRef}
                    className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3"
                  >
                    {filtered.map((p) => (
                      <div key={p.id} className="min-w-[280px] snap-start">
                        <ProductCard product={p} />
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => scrollBy(420)}
                    className="
                      absolute -right-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2
                      rounded-full border border-slate-200 bg-white shadow-sm
                      hover:bg-slate-50
                    "
                    aria-label="Next"
                    type="button"
                  >
                    ›
                  </button>
                </div>
              </section>

              {/* Grid list */}
              <section className="mt-10">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-white">Produk</h2>
                  <p className="text-sm text-white/80">
                    List produk yang sudah difilter & diurutkan
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {filtered.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
