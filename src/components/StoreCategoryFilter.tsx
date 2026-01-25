"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import ProductSlider from "@/components/ProductSlider";
import ProductCard from "@/components/ProductCard";

type CategoryKey = "all" | "tas" | "baju" | "komputer" | "perhiasan";

const CATEGORY_LABEL: Record<CategoryKey, string> = {
  all: "Semua",
  tas: "Tas",
  baju: "Baju",
  komputer: "Kelengkapan Komputer",
  perhiasan: "Perhiasan",
};

export default function StoreCategoryFilter({
  products,
}: {
  products: Product[];
}) {
  const [active, setActive] = useState<CategoryKey>("all");

  const filtered = useMemo(() => {
    if (active === "all") return products;

    if (active === "baju") {
      return products.filter((p) => {
        const isClothing =
          p.category === "men's clothing" || p.category === "women's clothing";

        const t = p.title.toLowerCase();
        const isBag =
          t.includes("bag") || t.includes("backpack") || t.includes("pack");

        // hanya baju, bukan tas
        return isClothing && !isBag;
      });
    }

    if (active === "komputer") {
      return products.filter((p) => p.category === "electronics");
    }

    if (active === "perhiasan") {
      return products.filter((p) => p.category === "jewelery");
    }

    // "Tas" (fallback): cari keyword dari title
    if (active === "tas") {
      const bagKeywords = ["bag", "backpack", "packsack", "pack"];
      return products.filter((p) => {
        const t = p.title.toLowerCase();
        return bagKeywords.some((k) => t.includes(k));
      });
    }

    return products;
  }, [active, products]);

  return (
    <div className="mt-6">
      {/* Category buttons */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(CATEGORY_LABEL) as CategoryKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={[
              "rounded-full border px-4 py-2 text-sm transition",
              "hover:bg-gray-100 dark:hover:bg-gray-800",
              key === active
                ? "bg-purple-700 text-white border-purple-700"
                : "bg-white dark:bg-gray-900",
            ].join(" ")}
          >
            {CATEGORY_LABEL[key]}
          </button>
        ))}
      </div>

      {/* Featured slider */}
      <div className="mt-6 rounded-xl border bg-white dark:bg-gray-900 p-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold">Featured</h2>
            <p className="text-sm opacity-80">
              Slide produk untuk kategori: <b>{CATEGORY_LABEL[active]}</b>
            </p>
          </div>
        </div>

        <div className="mt-4">
          <ProductSlider products={filtered} />
        </div>
      </div>

      {/* Grid */}
      <div className="mt-6">
        <h2 className="text-lg font-bold">Produk</h2>
        <p className="text-sm opacity-80">List produk yang sudah difilter</p>

        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
