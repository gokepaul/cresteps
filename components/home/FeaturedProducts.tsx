import Link from "next/link";
import { getFeaturedProducts } from "@/lib/data/products";
import ProductCard from "@/components/ProductCard";

export default function FeaturedProducts() {
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <section className="bg-offwhite py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-sienna mb-2">
              Bestsellers
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-nearblack"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Featured Products
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-nearblack hover:text-maroon transition-colors group"
          >
            View all
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/shop" className="text-sm font-bold tracking-widest uppercase text-maroon underline underline-offset-4">
            View all products
          </Link>
        </div>
      </div>
    </section>
  );
}
