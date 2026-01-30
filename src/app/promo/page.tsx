import Link from "next/link";

export const dynamic = "force-static"; // ✅ SSG (static)

function IconBag(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6.75a3.75 3.75 0 10-7.5 0v3.75M3 10.5h18l-1.5 10.5H4.5L3 10.5z"
      />
    </svg>
  );
}

function IconArrowLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function IconArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function IconQuestionCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 9a2.25 2.25 0 114.5 0c0 1.5-2.25 2.25-2.25 3.75"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

export default function PromoPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-white text-slate-900">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-violet-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold tracking-[0.25em] text-slate-500">
              REVOSHOP • PROMOTION
            </p>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-950">
              Promo Minggu Ini
            </h1>

            <p className="max-w-2xl text-slate-600">
              Halaman ini <span className="font-semibold">SSG (Static)</span> —
              cepat diakses dan cocok untuk konten promosi yang jarang berubah.
            </p>

            {/* CTA */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                href="/store"
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-violet-700"
              >
                <IconBag className="h-4 w-4" />
                Lihat Produk
              </Link>

              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                <IconArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-violet-100 text-violet-700">
                🚚
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  Free Shipping
                </p>
                <p className="text-sm text-slate-600">
                  Gratis ongkir untuk pembelian minimal{" "}
                  <span className="font-semibold">$50</span>.
                </p>
              </div>
            </div>
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              Gabungkan beberapa item agar mencapai minimum belanja.
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-100 text-emerald-700">
                🔥
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  Weekly Deals
                </p>
                <p className="text-sm text-slate-600">
                  Diskon pilihan untuk produk best-seller setiap minggu.
                </p>
              </div>
            </div>
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              Cek halaman <span className="font-semibold">Store</span> untuk
              melihat harga terbaru.
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-100 text-amber-700">
                🎁
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  New User Bonus
                </p>
                <p className="text-sm text-slate-600">
                  Pengguna baru bisa dapat promo tambahan saat checkout.
                </p>
              </div>
            </div>
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              Kamu juga bisa pakai fitur{" "}
              <span className="font-semibold">coupon</span> di halaman Cart.
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm font-semibold text-slate-950">Catatan SSG</p>
          <p className="mt-2 text-sm text-slate-600">
            Promosi ini jangan terlewatkan .
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/store"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              <IconBag className="h-4 w-4" />
              Browse Store
              <IconArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/faq"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              <IconQuestionCircle className="h-4 w-4" />
              Baca FAQ
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
