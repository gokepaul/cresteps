"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlistStore } from "@/store/wishlistStore";
import type { Product } from "@/lib/types";

function formatPrice(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

export default function ProductCard({ product }: { product: Product }) {
  const { toggle, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="group relative flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      <Link href={`/shop/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-gray-50">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={product.name + " detail"}
            fill
            className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-nearblack text-white text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded">
              New
            </span>
          )}
          {product.salePrice && (
            <span className="bg-maroon text-white text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={(e) => { e.preventDefault(); toggle(product); }}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:scale-110 active:scale-95"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={wishlisted ? "#7B1010" : "none"}
            stroke={wishlisted ? "#7B1010" : "#1A1A1A"}
            strokeWidth={1.8}
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1">
        <span className="text-[11px] text-sienna font-semibold tracking-wider uppercase">
          {product.category}
        </span>
        <Link
          href={`/shop/${product.slug}`}
          className="text-sm font-semibold text-nearblack hover:text-maroon transition-colors leading-snug"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {product.name}
        </Link>

        <div className="flex items-center gap-2 mt-1">
          {product.salePrice ? (
            <>
              <span className="text-sm font-bold text-maroon">
                {formatPrice(product.salePrice)}
              </span>
              <span className="text-xs text-muted line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-sm font-semibold text-nearblack">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Color swatches */}
        {product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2">
            {product.colors.slice(0, 4).map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="w-3.5 h-3.5 rounded-full border border-gray-300 shrink-0"
                style={{ backgroundColor: c.hex }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-muted">+{product.colors.length - 4}</span>
            )}
          </div>
        )}

        <Link
          href={`/shop/${product.slug}`}
          className="mt-3 w-full text-center text-xs font-bold tracking-widest uppercase bg-nearblack text-white py-2.5 rounded-lg hover:bg-maroon transition-colors"
        >
          View Product
        </Link>
      </div>
    </div>
  );
}
