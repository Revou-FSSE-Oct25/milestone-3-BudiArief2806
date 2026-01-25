import Link from "next/link";

export const dynamic = "force-static";

export default function FaqPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">FAQ</h1>

      <div className="mt-4 space-y-4">
        <div>
          <p className="font-semibold">How do I buy?</p>
          <p className="opacity-80">Open a product, then click Add to Cart.</p>
        </div>
        <div>
          <p className="font-semibold">Is this real store?</p>
          <p className="opacity-80">No, this is a fictional demo store.</p>
        </div>
      </div>

      <Link className="mt-6 inline-block underline text-purple-700" href="/">
        ← Back to Home
      </Link>
    </main>
  );
}
