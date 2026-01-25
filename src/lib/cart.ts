import type { Product } from "./types";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  qty: number;
};

const CART_KEY = "revoshop_cart";

// =========================
// READ
// =========================
export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

// =========================
// WRITE helper
// =========================
function writeCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

// =========================
// CREATE (add item)
// =========================
export function addToCart(
  product: Pick<Product, "id" | "title" | "price" | "image">,
  qty = 1,
  maxQty?: number,
): CartItem[] {
  const cart = readCart();
  const idx = cart.findIndex((it) => it.id === product.id);

  if (idx >= 0) {
    const nextQty = cart[idx].qty + qty;
    cart[idx] = {
      ...cart[idx],
      qty: typeof maxQty === "number" ? Math.min(nextQty, maxQty) : nextQty,
    };
  } else {
    const initQty = typeof maxQty === "number" ? Math.min(qty, maxQty) : qty;
    cart.push({ ...product, qty: initQty });
  }

  writeCart(cart);
  return cart;
}

// =========================
// UPDATE qty (+ / -)
// =========================
export function changeQty(id: number, delta: number): CartItem[] {
  const cart = readCart();
  const idx = cart.findIndex((it) => it.id === id);
  if (idx < 0) return cart;

  const nextQty = cart[idx].qty + delta;

  if (nextQty <= 0) {
    cart.splice(idx, 1);
  } else {
    cart[idx] = { ...cart[idx], qty: nextQty };
  }

  writeCart(cart);
  return cart;
}

// =========================
// DELETE one item
// =========================
export function removeFromCart(id: number): CartItem[] {
  const cart = readCart().filter((it) => it.id !== id);
  writeCart(cart);
  return cart;
}

// =========================
// DELETE all items
// =========================
export function clearCart(): CartItem[] {
  writeCart([]);
  return [];
}

// =========================
// HELPERS (total & count)
// =========================
export function cartTotal(items: CartItem[]) {
  return items.reduce((sum, it) => sum + it.qty * it.price, 0);
}

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, it) => sum + it.qty, 0);
}

// =====================================================
// COUPON / DISCOUNT SYSTEM (Kode Unik Diskon 10%)
// =====================================================

// Generate kode unik: REVOU10-XXXXXX
export function generateUniqueCoupon(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) {
    s += chars[Math.floor(Math.random() * chars.length)];
  }
  return `REVOU10-${s}`;
}

// Validasi format kupon
export function isValidCoupon(code: string): boolean {
  return /^REVOU10-[A-Z0-9]{6}$/.test(code.trim().toUpperCase());
}

// Hitung diskon 10% jika kupon valid
export function applyDiscount(subtotal: number, code: string): number {
  if (!isValidCoupon(code)) return 0;
  return subtotal * 0.1; // 10% discount
}
