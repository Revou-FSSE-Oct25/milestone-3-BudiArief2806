"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { getAuth } from "@/lib/auth";
import {
  applyOverrides,
  updateProductOverride,
  deleteProductOverride,
  clearAllOverrides,
} from "@/lib/adminCrud";

type DraftMap = Record<
  number,
  Partial<Pick<Product, "price" | "description" | "qty">>
>;

export default function AdminPage() {
  const [authOk, setAuthOk] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ per-item drafts + status
  const [drafts, setDrafts] = useState<DraftMap>({});
  const [saving, setSaving] = useState<Record<number, boolean>>({});
  const [savedMsg, setSavedMsg] = useState<Record<number, string>>({});

  // cek admin
  useEffect(() => {
    const auth = getAuth();
    setAuthOk(auth?.role === "admin");
  }, []);

  // fetch produk (client) + apply override
  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = (await res.json()) as Product[];

        // default qty untuk demo stock
        const withQty = data.map((p) => ({ ...p, qty: p.qty ?? 10 }));

        // apply perubahan admin dari localStorage
        const merged = applyOverrides(withQty);

        if (alive) setProducts(merged);
      } catch (e: any) {
        if (alive) setError(e?.message || "Error");
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  // ====== Helpers UI ======
  const totalItems = products.length;

  function setDraft(
    id: number,
    patch: Partial<Pick<Product, "price" | "description" | "qty">>,
  ) {
    setDrafts((prev) => ({ ...prev, [id]: { ...(prev[id] || {}), ...patch } }));
    setSavedMsg((prev) => ({ ...prev, [id]: "" }));
  }

  function getValue<
    T extends keyof Pick<Product, "price" | "description" | "qty">,
  >(p: Product, key: T) {
    const d = drafts[p.id];
    if (d && key in d) return (d as any)[key];
    return (p as any)[key];
  }

  function hasChanges(id: number) {
    const d = drafts[id];
    return !!d && Object.keys(d).length > 0;
  }

  // ====== CRUD actions (tetap pake fungsi kamu) ======
  function handleSaveItem(id: number) {
    const patch = drafts[id];
    if (!patch || Object.keys(patch).length === 0) return;

    try {
      setSaving((prev) => ({ ...prev, [id]: true }));

      // UPDATE (CRUD)
      updateProductOverride(id, patch);

      // update UI langsung
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...patch } : p)),
      );

      // clear draft & show success
      setDrafts((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });

      setSavedMsg((prev) => ({ ...prev, [id]: "Saved!" }));
      setTimeout(() => {
        setSavedMsg((prev) => ({ ...prev, [id]: "" }));
      }, 1400);
    } catch (e: any) {
      setSavedMsg((prev) => ({
        ...prev,
        [id]: e?.message || "Failed to save",
      }));
    } finally {
      setSaving((prev) => ({ ...prev, [id]: false }));
    }
  }

  function handleReset(id: number) {
    // DELETE (CRUD)
    deleteProductOverride(id);
    location.reload();
  }

  function handleResetAll() {
    clearAllOverrides();
    location.reload();
  }

  if (!authOk) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-[#0b1026] text-white">
        <section className="mx-auto max-w-6xl px-6 py-10">
          <h1 className="text-3xl font-extrabold tracking-tight">Admin</h1>
          <p className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-red-200">
            Akses ditolak. Silakan login sebagai Admin.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-80px)] text-white">
      {/* ====== Background ala referensi (ungu tua + merah + oranye + pink) ====== */}
      <div className="fixed inset-0 -z-10 bg-[#0b1026]" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(255,122,0,0.22),transparent_45%),radial-gradient(circle_at_85%_25%,rgba(255,77,77,0.18),transparent_45%),radial-gradient(circle_at_55%_90%,rgba(255,173,210,0.18),transparent_45%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(135deg,rgba(11,16,38,0.0)_0%,rgba(11,16,38,0.0)_38%,rgba(255,77,77,0.22)_38%,rgba(255,77,77,0.22)_56%,rgba(255,173,210,0.18)_56%,rgba(255,173,210,0.18)_72%,rgba(255,122,0,0.20)_72%,rgba(255,122,0,0.20)_100%)] opacity-60" />

      <section className="mx-auto max-w-6xl px-6 py-10">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-white/70">
              ADMIN • CRUD
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-white/70">
              Admin bisa Update: qty(stock), description, price. Data disimpan
              di localStorage. Sekarang update dibuat{" "}
              <span className="font-semibold text-white">per item</span> (klik
              Save).
            </p>

            <div className="mt-4 inline-flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                Total products: {loading ? "—" : totalItems}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                Theme: Deep Purple • Orange • Red • Pink
              </span>
            </div>
          </div>

          <button
            onClick={handleResetAll}
            className="
              rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-extrabold
              hover:bg-white/15
            "
          >
            Reset ALL
          </button>
        </div>

        {/* Status */}
        {loading && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <p className="text-white/80">Loading...</p>
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-3xl border border-red-400/30 bg-red-500/10 p-6 backdrop-blur">
            <p className="text-red-100">{error}</p>
          </div>
        )}

        {/* List */}
        {!loading && !error && (
          <div className="mt-8 grid gap-5">
            {products.map((p) => {
              const priceVal = Number(getValue(p, "price") ?? 0);
              const qtyVal = Number(getValue(p, "qty") ?? 10);
              const descVal = String(getValue(p, "description") ?? "");

              const dirty = hasChanges(p.id);
              const isSaving = !!saving[p.id];
              const info = savedMsg[p.id];

              return (
                <div
                  key={p.id}
                  className="
                    rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur
                    shadow-[0_16px_60px_rgba(0,0,0,0.28)]
                  "
                >
                  {/* Top bar per item */}
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <p className="truncate text-lg font-extrabold">
                        {p.title}
                      </p>
                      <p className="mt-1 text-sm text-white/70">
                        Category:{" "}
                        <span className="font-semibold text-white/80">
                          {p.category}
                        </span>
                      </p>

                      {info && (
                        <p className="mt-2 text-xs font-semibold text-white/80">
                          {info}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {dirty ? (
                        <span className="rounded-full bg-[#ff7a00]/20 px-3 py-1 text-xs font-bold text-[#ffd7b0] border border-[#ff7a00]/30">
                          Unsaved changes
                        </span>
                      ) : (
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/70 border border-white/10">
                          No changes
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => handleSaveItem(p.id)}
                        disabled={!dirty || isSaving}
                        className="
                          rounded-full px-4 py-2 text-xs font-extrabold
                          bg-gradient-to-r from-[#ff4d4d] via-[#ff2d6f] to-[#ff7a00]
                          text-white shadow-[0_10px_30px_rgba(255,77,77,0.25)]
                          hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40
                        "
                      >
                        {isSaving ? "Saving..." : "Save changes"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleReset(p.id)}
                        className="
                          rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold
                          hover:bg-white/15
                        "
                      >
                        Reset item
                      </button>
                    </div>
                  </div>

                  {/* Fields */}
                  <div className="mt-5 grid gap-4 lg:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <label className="block text-xs font-bold tracking-wider text-white/70">
                        PRICE
                      </label>
                      <input
                        type="number"
                        className="
                          mt-2 w-full rounded-xl border border-white/10 bg-[#0b1026]/40 px-3 py-2
                          text-white outline-none focus:border-white/25
                        "
                        value={Number.isFinite(priceVal) ? priceVal : 0}
                        onChange={(e) =>
                          setDraft(p.id, { price: Number(e.target.value) })
                        }
                      />
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <label className="block text-xs font-bold tracking-wider text-white/70">
                        QTY (STOCK)
                      </label>
                      <input
                        type="number"
                        className="
                          mt-2 w-full rounded-xl border border-white/10 bg-[#0b1026]/40 px-3 py-2
                          text-white outline-none focus:border-white/25
                        "
                        value={Number.isFinite(qtyVal) ? qtyVal : 10}
                        onChange={(e) =>
                          setDraft(p.id, { qty: Number(e.target.value) })
                        }
                      />
                      <p className="mt-2 text-xs text-white/55">
                        Demo stock (default 10).
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <label className="block text-xs font-bold tracking-wider text-white/70">
                        QUICK ACTION
                      </label>
                      <div className="mt-2 flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setDraft(p.id, { qty: Math.max(0, qtyVal - 1) })
                          }
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold hover:bg-white/10"
                        >
                          -1
                        </button>
                        <button
                          type="button"
                          onClick={() => setDraft(p.id, { qty: qtyVal + 1 })}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold hover:bg-white/10"
                        >
                          +1
                        </button>
                      </div>
                      <p className="mt-2 text-xs text-white/55">
                        Tombol cepat untuk demo perubahan stock.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <label className="block text-xs font-bold tracking-wider text-white/70">
                      DESCRIPTION
                    </label>
                    <textarea
                      className="
                        mt-2 w-full rounded-xl border border-white/10 bg-[#0b1026]/40 px-3 py-2
                        text-white outline-none focus:border-white/25
                      "
                      rows={4}
                      value={descVal}
                      onChange={(e) =>
                        setDraft(p.id, { description: e.target.value })
                      }
                    />
                    <p className="mt-2 text-xs text-white/55">
                      Edit dulu, lalu klik{" "}
                      <span className="font-semibold text-white/80">
                        Save changes
                      </span>
                      .
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer hint */}
        {!loading && !error && (
          <p className="mt-8 text-xs text-white/60">
            Catatan: Override disimpan ke localStorage via{" "}
            <span className="font-semibold">adminCrud</span>. Tombol{" "}
            <span className="font-semibold">Reset item</span> menghapus override
            untuk 1 produk, sedangkan{" "}
            <span className="font-semibold">Reset ALL</span> menghapus semua
            override.
          </p>
        )}
      </section>
    </main>
  );
}
