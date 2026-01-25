"use client";

import { useEffect, useState } from "react";
import { getStockQty } from "@/lib/stock";

export default function StockBadge({ productId }: { productId: number }) {
  const [qty, setQty] = useState<number>(10);

  useEffect(() => {
    setQty(getStockQty(productId, 10));

    const onStorage = () => setQty(getStockQty(productId, 10));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [productId]);

  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs">
      Stock: <b className="ml-1">{qty}</b>
    </span>
  );
}
