import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* image area */}
      <div className="relative h-44 w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-white">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-5 transition duration-200 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>

      {/* text */}
      <div className="mt-3">
        <p className="line-clamp-2 font-semibold text-slate-950">
          {product.title}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm font-extrabold text-violet-700">
            ${product.price}
          </p>

          <span className="text-xs text-slate-500 opacity-0 transition group-hover:opacity-100">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
