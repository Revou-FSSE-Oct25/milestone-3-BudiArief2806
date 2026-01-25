"use client";

import { useRef } from "react";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

export default function ProductSlider({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement | null>(null);

  function scrollBy(px: number) {
    ref.current?.scrollBy({ left: px, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <button
        onClick={() => scrollBy(-420)}
        className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 rounded-full border bg-white dark:bg-gray-900 px-3 py-2 shadow hover:opacity-90"
      >
        ‹
      </button>

      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
      >
        {products.map((p) => (
          <div key={p.id} className="min-w-[260px] snap-start">
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scrollBy(420)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 rounded-full border bg-white dark:bg-gray-900 px-3 py-2 shadow hover:opacity-90"
      >
        ›
      </button>
    </div>
  );
}
