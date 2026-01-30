import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="
        group block rounded-3xl border border-slate-200 bg-white p-4
        shadow-sm transition-all duration-300 ease-out
        hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-200/70
      "
    >
      {/* image area */}
      <div className="relative h-52 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-white">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="
            object-contain p-6
            transition-transform duration-300 ease-out
            group-hover:scale-110
          "
          sizes="(max-width: 768px) 100vw, 25vw"
        />

        {/* overlay glow lembut */}
        <div
          className="
          pointer-events-none absolute inset-0
          bg-gradient-to-t from-black/5 to-transparent
          opacity-0 transition duration-300
          group-hover:opacity-100
        "
        />
      </div>

      {/* text */}
      <div className="mt-4">
        <p className="line-clamp-2 font-semibold text-slate-950">
          {product.title}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm font-extrabold text-violet-700">
            ${product.price}
          </p>

          <span
            className="
            text-xs text-slate-500
            opacity-0 transition duration-300
            group-hover:opacity-100
          "
          >
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
