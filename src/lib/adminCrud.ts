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

function writeOverrides(data: Record<number, ProductOverride>) {
  localStorage.setItem(OVERRIDE_KEY, JSON.stringify(data));
}

// READ: gabungkan produk API + override lokal
export function applyOverrides(products: Product[]): Product[] {
  if (typeof window === "undefined") return products;
  const overrides = readOverrides();

  return products.map((p) => {
    const o = overrides[p.id];
    return o ? { ...p, ...o } : p;
  });
}

// UPDATE (CRUD)
export function updateProductOverride(id: number, patch: ProductOverride) {
  const overrides = readOverrides();
  overrides[id] = { ...(overrides[id] || {}), ...patch };
  writeOverrides(overrides);
}

// DELETE override (balik ke data API)
export function deleteProductOverride(id: number) {
  const overrides = readOverrides();
  delete overrides[id];
  writeOverrides(overrides);
}

// DELETE ALL
export function clearAllOverrides() {
  writeOverrides({});
}
