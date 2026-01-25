"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  readCart,
  changeQty,
  removeFromCart,
  clearCart,
  cartTotal,
  generateUniqueCoupon,
  isValidCoupon,
  applyDiscount,
  type CartItem,
} from "@/lib/cart";

function formatUSD(n: number) {
  return `$${n.toFixed(2)}`;
}

function CartSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((k) => (
        <div
          key={k}
          className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
        >
          <div className="flex gap-4">
            <div className="h-20 w-20 rounded-xl bg-white/10" />
            <div className="flex-1">
              <div className="h-4 w-2/3 rounded bg-white/10" />
              <div className="mt-3 h-4 w-1/3 rounded bg-white/10" />
              <div className="mt-4 h-8 w-40 rounded bg-white/10" />
            </div>
            <div className="h-8 w-20 rounded bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CartPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<CartItem[]>([]);
  const [error, setError] = useState("");

  // Kupon
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string>("");
  const [couponMsg, setCouponMsg] = useState<string>("");

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        const data = readCart() as CartItem[];
        setItems(Array.isArray(data) ? data : []);
      } catch (e: any) {
        setError(e?.message || "Gagal membaca cart");
      } finally {
        setLoading(false);
      }
    }, 700);

    return () => clearTimeout(t);
  }, []);

  // subtotal pakai helper cartTotal biar konsisten
  const subtotal = useMemo(() => cartTotal(items), [items]);

  const shipping = useMemo(() => {
    if (items.length === 0) return 0;
    return subtotal >= 100 ? 0 : 9.99;
  }, [items.length, subtotal]);

  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;
    return applyDiscount(subtotal, appliedCoupon); // 10% kalau valid
  }, [subtotal, appliedCoupon]);

  const total = useMemo(
    () => subtotal - discount + shipping,
    [subtotal, discount, shipping],
  );

  // ===== CRUD handlers (pakai lib/cart.ts kamu) =====
  function handleInc(id: number) {
    const next = changeQty(id, +1);
    setItems(next);
  }

  function handleDec(id: number) {
    const next = changeQty(id, -1); // kalau qty jadi 0, otomatis kehapus (sesuai lib kamu)
    setItems(next);

    // kalau cart jadi kosong, reset kupon biar natural
    if (next.length === 0) {
      setAppliedCoupon("");
      setCouponInput("");
      setCouponMsg("");
    }
  }

  function handleRemove(id: number) {
    const next = removeFromCart(id);
    setItems(next);

    if (next.length === 0) {
      setAppliedCoupon("");
      setCouponInput("");
      setCouponMsg("");
    }
  }

  function handleClear() {
    const next = clearCart();
    setItems(next);
    setAppliedCoupon("");
    setCouponInput("");
    setCouponMsg("");
  }

  // ===== Kupon =====
  function applyCoupon() {
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setCouponMsg("Masukkan kode kupon dulu.");
      setAppliedCoupon("");
      return;
    }
    if (!isValidCoupon(code)) {
      setCouponMsg('Kode tidak valid. Contoh format: "REVOU10-AB12CD"');
      setAppliedCoupon("");
      return;
    }
    setAppliedCoupon(code);
    setCouponMsg("Kupon diterapkan! Diskon 10% aktif.");
  }

  function generateCoupon() {
    const code = generateUniqueCoupon();
    setCouponInput(code);
    setCouponMsg("Kode unik dibuat. Klik Apply untuk aktifkan diskon 10%.");
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#071a2f] text-white">
      {/* Top bar / hero like Sotheby's */}
      <section className="border-b border-white/10 bg-[#061427]">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col gap-3">
            <p className="text-xs tracking-[0.25em] text-white/60">
              REVOSHOP • CART
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight">
              Your Cart, curated.
            </h1>
            <p className="max-w-2xl text-white/70">
              Review items in your basket and proceed to checkout. Designed with
              a navy & gold theme for a premium feel.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                href="/store"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                ← Continue shopping
              </Link>

              <span className="text-sm text-white/60">
                {loading ? "Loading items..." : `${items.length} item(s)`}
              </span>

              <button
                type="button"
                onClick={handleClear}
                disabled={loading || items.length === 0}
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Clear cart
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
          {/* Left: list */}
          <div>
            <div className="mb-4 flex items-end justify-between">
              <h2 className="text-xl font-bold">Items</h2>
              <span className="text-sm text-white/60">Theme: Navy & Gold</span>
            </div>

            {loading && <CartSkeleton />}

            {!loading && error && (
              <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-5 text-red-100">
                {error}
              </div>
            )}

            {!loading && !error && items.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-white/80">
                  Cart kamu masih kosong. Yuk pilih produk dulu.
                </p>
                <Link
                  href="/store"
                  className="mt-4 inline-flex rounded-full bg-[#c9a227] px-5 py-2 text-sm font-bold text-[#071a2f] hover:opacity-90"
                >
                  Browse Store
                </Link>
              </div>
            )}

            {!loading && !error && items.length > 0 && (
              <div className="space-y-4">
                {items.map((it) => (
                  <div
                    key={it.id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-white/10">
                          <Image
                            src={it.image}
                            alt={it.title}
                            fill
                            className="object-contain p-2"
                            sizes="80px"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-semibold text-white">
                            {it.title}
                          </p>
                          <p className="mt-1 text-sm text-white/70">
                            {formatUSD(it.price)} • Qty:{" "}
                            <span className="font-semibold text-white">
                              {it.qty}
                            </span>
                          </p>

                          {/* Qty controls */}
                          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1">
                            <button
                              type="button"
                              onClick={() => handleDec(it.id)}
                              className="h-8 w-8 rounded-full bg-white/5 text-white hover:bg-white/10"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>

                            <span className="min-w-8 text-center text-sm font-bold">
                              {it.qty}
                            </span>

                            <button
                              type="button"
                              onClick={() => handleInc(it.id)}
                              className="h-8 w-8 rounded-full bg-white/5 text-white hover:bg-white/10"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>

                            <button
                              type="button"
                              onClick={() => handleRemove(it.id)}
                              className="ml-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-white hover:bg-white/10"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 sm:justify-end">
                        <span className="text-sm text-white/60">Total</span>
                        <span className="text-lg font-extrabold text-[#c9a227]">
                          {formatUSD(it.price * it.qty)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: summary */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Summary</h3>
                <span className="text-xs tracking-[0.25em] text-white/50">
                  CHECKOUT
                </span>
              </div>

              {/* Coupon */}
              <div className="mt-5 rounded-2xl border border-white/10 bg-[#061427] p-4">
                <p className="text-sm font-semibold text-white">
                  Kode Unik Diskon 10%
                </p>
                <p className="mt-1 text-xs text-white/60">
                  Format:{" "}
                  <span className="font-semibold text-white">
                    REVOU10-XXXXXX
                  </span>
                </p>

                <div className="mt-3 flex gap-2">
                  <input
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Masukkan kode kupon"
                    className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
                  />
                  <button
                    type="button"
                    onClick={applyCoupon}
                    disabled={loading || items.length === 0}
                    className="rounded-full bg-[#c9a227] px-4 py-2 text-sm font-extrabold text-[#071a2f] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Apply
                  </button>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={generateCoupon}
                    className="text-xs font-semibold text-white/80 underline underline-offset-4 hover:text-white"
                  >
                    Generate kode unik
                  </button>

                  {appliedCoupon ? (
                    <span className="text-xs font-bold text-[#c9a227]">
                      Applied: {appliedCoupon}
                    </span>
                  ) : (
                    <span className="text-xs text-white/50">Not applied</span>
                  )}
                </div>

                {couponMsg && (
                  <p className="mt-2 text-xs text-white/70">{couponMsg}</p>
                )}
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between text-white/80">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">
                    {loading ? "—" : formatUSD(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-white/80">
                  <span>Discount</span>
                  <span className="font-semibold text-white">
                    {loading
                      ? "—"
                      : discount > 0
                        ? `- ${formatUSD(discount)}`
                        : "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-white/80">
                  <span>Shipping</span>
                  <span className="font-semibold text-white">
                    {loading
                      ? "—"
                      : shipping === 0
                        ? "Free"
                        : formatUSD(shipping)}
                  </span>
                </div>

                <div className="my-4 h-px bg-white/10" />

                <div className="flex items-center justify-between">
                  <span className="text-white/80">Total</span>
                  <span className="text-2xl font-extrabold text-[#c9a227]">
                    {loading ? "—" : formatUSD(total)}
                  </span>
                </div>
              </div>

              <button
                disabled={loading || items.length === 0}
                className="
                  mt-6 w-full rounded-full px-5 py-3 text-sm font-extrabold
                  bg-[#c9a227] text-[#071a2f] hover:opacity-90
                  disabled:cursor-not-allowed disabled:opacity-40
                "
                type="button"
              >
                {loading ? "Preparing checkout..." : "Proceed to Checkout"}
              </button>

              <p className="mt-4 text-xs text-white/60">
                Tip: Free shipping untuk subtotal ≥ $100.
              </p>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-[#061427] p-5">
              <p className="text-sm font-semibold text-white">Premium Feel</p>
              <p className="mt-1 text-xs text-white/60">
                Navy background + gold highlight membuat halaman terasa lebih
                elegan dan “high-end”.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
