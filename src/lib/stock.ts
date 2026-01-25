import type { Product } from "./types";

const OVERRIDE_KEY = "revoshop_product_overrides";

type ProductOverride = Partial<Pick<Product, "price" | "description" | "qty">>;

function readOverrides(): Record<number, ProductOverride> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(OVERRIDE_KEY);
    return raw ? (JSON.parse(raw) as Record<number, ProductOverride>) : {};
  } catch {
    return {};
  }
}

// ambil stock qty dari override, kalau tidak ada pakai defaultQty
export function getStockQty(productId: number, defaultQty = 10) {
  const overrides = readOverrides();
  const qty = overrides[productId]?.qty;
  return typeof qty === "number" ? qty : defaultQty;
}
