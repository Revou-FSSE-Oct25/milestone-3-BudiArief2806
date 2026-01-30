import Link from "next/link";

export const dynamic = "force-static"; // ✅ SSG (static)

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

function IconShieldCheck(props: React.SVGProps<SVGSVGElement>) {
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
        d="M12 3l7 4v6c0 5-3 8-7 8s-7-3-7-8V7l7-4z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.5 12.5l1.75 1.75L14.5 11"
      />
    </svg>
  );
}

function IconTruck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h11v10H3V7z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 10h4l3 3v4h-7V10z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 17.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM17.5 17.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
      />
    </svg>
  );
}

function IconCreditCard(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18v10H3V7z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 15h4" />
    </svg>
  );
}

export default function FaqPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-white text-slate-900">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-violet-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <p className="text-xs font-semibold tracking-[0.25em] text-slate-500">
            REVOSHOP • FAQ
          </p>

          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-950">
            Frequently Asked Questions
          </h1>

          <p className="mt-2 max-w-2xl text-slate-600">
            Halaman ini <span className="font-semibold">SSG (Static)</span> —
            berisi pertanyaan yang sering ditanyakan pelanggan.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/store"
              className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-violet-700"
            >
              <IconBag className="h-4 w-4" />
              Browse Store
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
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* FAQ card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-violet-100 text-violet-700">
                <IconQuestionCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  How do I buy?
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Open a product detail page, then click{" "}
                  <span className="font-semibold">Add to Cart</span>.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-100 text-emerald-700">
                <IconShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  Is this a real store?
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  No. This is a fictional demo store for learning Next.js.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-100 text-amber-700">
                <IconTruck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  How about shipping?
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Shipping rules are shown on Promo and calculated at Cart (free
                  shipping for subtotal ≥{" "}
                  <span className="font-semibold">$100</span> in your demo).
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-100 text-slate-700">
                <IconCreditCard className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  Do you support checkout/payment?
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  This module focuses on product listing, routing, and cart
                  interaction. Checkout button is a demo UI.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm font-semibold text-slate-950">Catatan SSG</p>
          <p className="mt-2 text-sm text-slate-600">
            FAQ dibuat statis agar cepat dan stabil. Untuk konten yang jarang
            berubah, SSG adalah pilihan yang tepat.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/promo"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              <IconQuestionCircle className="h-4 w-4" />
              Lihat Promo
            </Link>

            <Link
              href="/store"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              <IconBag className="h-4 w-4" />
              Browse Store
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
