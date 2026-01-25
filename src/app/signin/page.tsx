"use client";

import { useState } from "react";
import { setAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [msg, setMsg] = useState("");

  function handleSignIn(e: React.FormEvent) {
    e.preventDefault();

    if (!email) return setMsg("Email wajib diisi.");
    if (!password) return setMsg("Password wajib diisi.");

    setAuth({ email, role });
    setMsg("Login berhasil!");

    if (role === "admin") router.push("/admin");
    else router.push("/store");
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-white via-white to-[#f4f7ff] text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid items-stretch gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          {/* LEFT: Form */}
          <div className="flex items-center">
            <div className="w-full">
              <div className="mb-6">
                <p className="text-xs font-semibold tracking-[0.25em] text-slate-500">
                  REVOSHOP • SIGN IN
                </p>
                <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                  Welcome back
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                  Masuk untuk melanjutkan belanja. Tema: Biru Laut, Putih, dan
                  Violet.
                </p>
              </div>

              <form
                onSubmit={handleSignIn}
                className="
                  rounded-2xl border border-slate-200 bg-[#071a2f] p-6 shadow-[0_12px_40px_rgba(7,26,47,0.18)]
                  text-white
                "
              >
                {/* Role */}
                <label className="block text-sm font-semibold text-white/80">
                  Role
                </label>
                <select
                  className="
                    mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2
                    text-white outline-none focus:border-white/25
                  "
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                >
                  <option className="text-slate-900" value="user">
                    User
                  </option>
                  <option className="text-slate-900" value="admin">
                    Admin
                  </option>
                </select>

                {/* Email */}
                <label className="mt-4 block text-sm font-semibold text-white/80">
                  Email
                </label>
                <input
                  className="
                    mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2
                    text-white placeholder:text-white/40 outline-none focus:border-white/25
                  "
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {/* Password */}
                <label className="mt-4 block text-sm font-semibold text-white/80">
                  Password
                </label>
                <input
                  type="password"
                  className="
                    mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2
                    text-white placeholder:text-white/40 outline-none focus:border-white/25
                  "
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* CTA */}
                <button
                  className="
                    mt-6 w-full rounded-xl py-2.5 font-extrabold
                    bg-gradient-to-r from-[#7c3aed] via-[#6d28d9] to-[#4f46e5]
                    text-white shadow-[0_10px_30px_rgba(124,58,237,0.35)]
                    hover:opacity-95 active:opacity-90
                  "
                >
                  Sign in
                </button>

                {/* Message */}
                {msg && (
                  <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-sm text-white/80">{msg}</p>
                  </div>
                )}

                {/* Small hint */}
                <p className="mt-4 text-xs text-white/50">
                  Demo: Pilih role{" "}
                  <span className="text-white/80 font-semibold">Admin</span>{" "}
                  untuk masuk ke{" "}
                  <span className="text-white/80 font-semibold">/admin</span>.
                </p>
              </form>
            </div>
          </div>

          {/* RIGHT: Image / Illustration panel */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
            {/* Background gradient overlay (Biru Laut + Violet) */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#eaf2ff] via-white to-[#efe8ff]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,70,229,0.18),transparent_45%),radial-gradient(circle_at_90%_20%,rgba(124,58,237,0.18),transparent_40%),radial-gradient(circle_at_60%_90%,rgba(7,26,47,0.14),transparent_45%)]" />

            {/* Content */}
            <div className="relative h-full p-8">
              <div className="max-w-md">
                <p className="text-xs font-semibold tracking-[0.25em] text-slate-600">
                  SMART • SIMPLE • SUPERIOR
                </p>
                <h2 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-[#071a2f]">
                  Premium shopping experience.
                </h2>
                <p className="mt-3 text-sm text-slate-600">
                  Visual kanan ini bisa kamu isi ilustrasi/gambar seperti contoh
                  referensi. Nuansanya tetap biru laut, putih, dan violet.
                </p>

                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-xs font-semibold text-slate-700">
                  <span className="h-2 w-2 rounded-full bg-[#4f46e5]" />
                  <span>Secure sign-in</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span>Role-based access</span>
                </div>
              </div>

              {/* Image (ganti src sesuai file kamu di /public) */}
              <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/40 bg-white/40 shadow-sm">
                <Image
                  src="/signin-hero.png"
                  alt="Signin Illustration"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Bottom badge */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#071a2f] px-4 py-2 text-xs font-bold text-white">
                  Navy
                </span>
                <span className="rounded-full bg-[#4f46e5] px-4 py-2 text-xs font-bold text-white">
                  Violet
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-800">
                  White
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile note: kalau belum punya gambar */}
        <p className="mt-6 text-xs text-slate-500">
          Pastikan kamu menaruh gambar di{" "}
          <span className="font-semibold">/public/signin-hero.png</span>. Kalau
          nama file berbeda, tinggal ganti value{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5">src</code>.
        </p>
      </section>
    </main>
  );
}
