"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAuth, logout, type AuthState } from "@/lib/auth";
import { readCart, cartCount } from "@/lib/cart";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [auth, setAuth] = useState<AuthState | null>(null);
  const [cartItems, setCartItems] = useState<number>(0);

  useEffect(() => {
    setAuth(getAuth());
    setCartItems(cartCount(readCart()));

    const onStorage = () => {
      setAuth(getAuth());
      setCartItems(cartCount(readCart()));
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function handleLogout() {
    logout();
    setAuth(null);
    router.push("/signin");
    router.refresh();
  }

  const navLink =
    "text-sm font-medium text-slate-700 hover:text-slate-950 hover:underline";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        {/* Brand */}
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight text-slate-950"
        >
          RevoShop
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-4 text-sm">
          <Link className={navLink} href="/">
            Home
          </Link>
          <Link className={navLink} href="/store">
            Store
          </Link>

          {/* Cart */}
          <Link
            className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-slate-950"
            href="/cart"
          >
            Cart 🛒
            <span className="ml-1 inline-flex min-w-6 items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-900">
              {cartItems}
            </span>
          </Link>

          {/* Auth area */}
          {auth ? (
            <div className="flex items-center gap-2">
              <span className="rounded-xl border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs text-slate-900">
                {auth.role.toUpperCase()}: {auth.email}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs hover:bg-slate-50"
                type="button"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
              href="/signin"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
