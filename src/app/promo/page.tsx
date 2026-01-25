import Link from "next/link";

export const dynamic = "force-static"; // memastikan SSG (static)

export default function PromoPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Promotion</h1>

      <p className="mt-2 opacity-80">
        This is a static promotional page (SSG).
      </p>

      <ul className="mt-4 list-disc pl-6 space-y-1">
        <li>Free shipping over $50</li>
        <li>Weekly deals</li>
        <li>New user discount</li>
      </ul>

      {/* Back navigation with Next.js Link (client-side navigation) */}
      <Link
        className="mt-6 inline-block underline text-purple-700 hover:text-purple-900"
        href="/"
      >
        ← Back to Home
      </Link>
    </main>
  );
}
