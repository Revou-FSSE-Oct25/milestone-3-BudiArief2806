"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { addToCart, readCart, cartCount } from "@/lib/cart";
import { getStockQty } from "@/lib/stock";

export default function AddToCartButton({
  product,
}: {
  product: Pick<Product, "id" | "title" | "price" | "image">;
}) {
  const [cartItems, setCartItems] = useState(0);
  const [stock, setStock] = useState(10);
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const cart = readCart();
    setCartItems(cartCount(cart));
    setStock(getStockQty(product.id, 10));

    const onStorage = () => {
      const nextCart = readCart();
      setCartItems(cartCount(nextCart));
      setStock(getStockQty(product.id, 10));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [product.id]);

  // qty max = stock - qty yang sudah ada di cart untuk produk ini
  const maxCanBuyNow = useMemo(() => {
    const cart = readCart();
    const exist = cart.find((x) => x.id === product.id);
    const already = exist?.qty ?? 0;
    const max = Math.max(0, stock - already);
    return max;
  }, [product.id, stock]);

  function clamp(n: number) {
    if (!Number.isFinite(n)) return 1;
    if (n < 1) return 1;
    if (n > maxCanBuyNow) return maxCanBuyNow || 1;
    return n;
  }

  function handleAdd() {
    if (maxCanBuyNow <= 0) {
      setMsg("Stok sudah habis / sudah mencapai batas stok di cart.");
      setTimeout(() => setMsg(""), 1400);
      return;
    }

    const safeQty = clamp(qty);
    const next = addToCart(product, safeQty, stock); // enforce stock global
    setCartItems(cartCount(next));
    setMsg(`Ditambahkan ${safeQty} item ✅`);
    setTimeout(() => setMsg(""), 1100);
  }

  return (
    <div className="mt-4 rounded-xl border bg-white p-4 shadow-sm dark:bg-gray-900">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm opacity-80">
          Stock: <b>{stock}</b>
        </span>
        <span className="text-sm opacity-80">
          Cart items: <b>{cartItems}</b>
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm opacity-80">Qty</span>

          <button
            type="button"
            className="rounded-lg border px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setQty((q) => clamp(q - 1))}
          >
            -
          </button>

          <input
            type="number"
            min={1}
            max={maxCanBuyNow || 1}
            value={qty}
            onChange={(e) => setQty(clamp(Number(e.target.value)))}
            className="w-20 rounded-lg border px-3 py-2 bg-transparent text-center"
          />

          <button
            type="button"
            className="rounded-lg border px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setQty((q) => clamp(q + 1))}
            disabled={maxCanBuyNow <= 0}
          >
            +
          </button>
        </div>

        <button
          onClick={handleAdd}
          className="rounded-lg bg-purple-700 text-white px-4 py-2 hover:opacity-90 disabled:opacity-50"
          disabled={maxCanBuyNow <= 0}
        >
          Add to Cart
        </button>

        <span className="text-xs opacity-70">
          Maks. bisa ditambah sekarang: <b>{maxCanBuyNow}</b>
        </span>

        {msg && <span className="text-sm text-green-600">{msg}</span>}
      </div>
    </div>
  );
}
