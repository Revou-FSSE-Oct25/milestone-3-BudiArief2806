"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { addToCart, readCart, cartCount } from "@/lib/cart";
import { getStockQty } from "@/lib/stock";
import { applyOverrides } from "@/lib/adminCrud";

export default function ProductClient({ product }: { product: Product }) {
  const [viewProduct, setViewProduct] = useState<Product>(product);

  const [stock, setStock] = useState(10);
  const [cartItems, setCartItems] = useState(0);
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    // 1) Apply override admin ke product ini (price/description/qty)
    const merged = applyOverrides([{ ...product, qty: product.qty ?? 10 }])[0];
    setViewProduct(merged);

    // 2) Cart count
    const cart = readCart();
    setCartItems(cartCount(cart));

    // 3) Stock:
    //    - defaultStock dari admin qty (kalau ada)
    //    - lalu kita tetap pakai getStockQty agar konsisten dg sistem stock kamu
    const baseStock = merged?.qty ?? 10;
    setStock(getStockQty(product.id, baseStock));

    const onStorage = () => {
      // update cart & re-apply override kalau admin update
      const nextMerged = applyOverrides([
        { ...product, qty: product.qty ?? 10 },
      ])[0];
      setViewProduct(nextMerged);

      const nextCart = readCart();
      setCartItems(cartCount(nextCart));

      const nextBase = nextMerged?.qty ?? 10;
      setStock(getStockQty(product.id, nextBase));
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [product.id, product]);

  const maxCanBuyNow = useMemo(() => {
    const cart = readCart();
    const exist = cart.find((x) => x.id === product.id);
    const already = exist?.qty ?? 0;
    return Math.max(0, stock - already);
  }, [product.id, stock]);

  function clamp(n: number) {
    if (!Number.isFinite(n)) return 1;
    if (n < 1) return 1;
    if (n > (maxCanBuyNow || 1)) return maxCanBuyNow || 1;
    return n;
  }

  function handleAdd() {
    if (maxCanBuyNow <= 0) {
      setMsg("Stok sudah habis / sudah mencapai batas di cart.");
      setTimeout(() => setMsg(""), 1500);
      return;
    }

    const safeQty = clamp(qty);

    const next = addToCart(
      {
        id: product.id,
        title: viewProduct.title,
        price: viewProduct.price,
        image: viewProduct.image,
      },
      safeQty,
      stock,
    );

    setCartItems(cartCount(next));
    setMsg(`Ditambahkan ${safeQty} item ke cart ✅`);
    setTimeout(() => setMsg(""), 1200);
  }

  const pillBase =
    "text-xs rounded-full border px-3 py-1 bg-[#fff7ea] text-[#2b1b12] border-[#2b1b12]/15";

  const controlBtn =
    "h-10 w-10 rounded-xl border border-[#2b1b12]/15 bg-[#fff7ea] hover:bg-[#fff0d9] disabled:opacity-50";

  return (
    <div className="rounded-3xl border border-[#2b1b12]/10 bg-[#fff7ea] p-6 shadow-[0_16px_50px_rgba(43,27,18,0.12)]">
      {/* Title */}
      <h1 className="text-2xl font-extrabold leading-snug text-[#2b1b12]">
        {viewProduct.title}
      </h1>

      {/* Price + badges */}
      <div className="mt-3 flex items-center gap-3 flex-wrap">
        <span className="text-2xl font-extrabold text-[#7a4a2a]">
          ${viewProduct.price}
        </span>

        <span className={pillBase}>
          Stock: <b>{stock}</b>
        </span>

        <span className={pillBase}>{viewProduct.category}</span>

        <span className={pillBase}>
          Cart: <b>{cartItems}</b>
        </span>
      </div>

      {/* Description */}
      <p className="mt-4 text-sm leading-6 text-[#3b2a20]">
        {viewProduct.description}
      </p>

      {/* Qty + Add */}
      <div className="mt-6 rounded-2xl border border-[#2b1b12]/10 bg-gradient-to-b from-[#fff2dc] to-[#f3e5cf] p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* qty control */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#3b2a20]">Qty</span>

            <button
              type="button"
              className={controlBtn}
              onClick={() => setQty((q) => clamp(q - 1))}
              aria-label="Decrease quantity"
            >
              -
            </button>

            <input
              type="number"
              min={1}
              max={maxCanBuyNow || 1}
              value={qty}
              onChange={(e) => setQty(clamp(Number(e.target.value)))}
              className="h-10 w-24 rounded-xl border border-[#2b1b12]/15 bg-[#fff7ea] px-3 text-center text-[#2b1b12] outline-none focus:ring-2 focus:ring-[#7a4a2a]"
            />

            <button
              type="button"
              className={controlBtn}
              onClick={() => setQty((q) => clamp(q + 1))}
              disabled={maxCanBuyNow <= 0}
              aria-label="Increase quantity"
            >
              +
            </button>

            <span className="ml-2 text-xs text-[#3b2a20]/80">
              Maks: <b>{maxCanBuyNow}</b>
            </span>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleAdd}
              className="h-10 rounded-xl bg-[#7a4a2a] px-5 font-extrabold text-[#fff7ea] hover:opacity-90 disabled:opacity-50"
              disabled={maxCanBuyNow <= 0}
            >
              Add to Cart
            </button>

            {msg && (
              <span className="text-sm text-[#1f7a4a] font-semibold">
                {msg}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* little note */}
      <p className="mt-4 text-xs text-[#3b2a20]/70">
        Info: price/description/qty mengikuti perubahan Admin (localStorage
        overrides).
      </p>
    </div>
  );
}
