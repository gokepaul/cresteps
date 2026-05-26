"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { getProductBySlug, products } from "@/lib/data/products";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import ProductCard from "@/components/ProductCard";
import type { ProductColor } from "@/lib/types";

function formatPrice(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

export default function ProductPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0];
  const product = slug ? getProductBySlug(slug) : undefined;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [errors, setErrors] = useState<{ size?: boolean; color?: boolean }>({});
  const [added, setAdded] = useState(false);

  const { addItem } = useCartStore();
  const { toggle, isWishlisted } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
    useWishlistStore.persist.rehydrate();
  }, []);

  // Auto-select first color on load
  useEffect(() => {
    if (product && product.colors.length > 0 && !selectedColor) {
      setSelectedColor(product.colors[0]);
    }
  }, [product, selectedColor]);

  if (!product) return notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const wishlisted = mounted && isWishlisted(product.id);

  const handleAddToCart = () => {
    const newErrors: typeof errors = {};
    if (!selectedSize) newErrors.size = true;
    if (!selectedColor) newErrors.color = true;
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    addItem(product, selectedSize, selectedColor!);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-offwhite pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-5">
        <nav className="flex items-center gap-2 text-xs text-muted">
          <Link href="/" className="hover:text-maroon transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-maroon transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-maroon transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-nearblack font-medium">{product.name}</span>
        </nav>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Images */}
          <div className="flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3 sm:w-[88px]">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-16 sm:w-full aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImage === i
                      ? "border-nearblack shadow-sm"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <Image src={img} alt={`${product.name} view ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="relative flex-1 aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover transition-opacity duration-300"
                priority
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-nearblack text-white text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-lg">New</span>
                )}
                {product.salePrice && (
                  <span className="bg-maroon text-white text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-lg">Sale</span>
                )}
              </div>
            </div>
          </div>

          {/* Info panel */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-sienna mb-2 block">{product.category}</span>
              <h1
                className="text-3xl md:text-4xl font-bold text-nearblack leading-tight mb-4"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-3">
                {product.salePrice ? (
                  <>
                    <span className="text-2xl font-bold text-maroon">{formatPrice(product.salePrice)}</span>
                    <span className="text-base text-muted line-through">{formatPrice(product.price)}</span>
                    <span className="text-xs font-bold bg-maroon-light text-maroon px-2.5 py-1 rounded-lg">
                      Save {formatPrice(product.price - product.salePrice)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-nearblack">{formatPrice(product.price)}</span>
                )}
              </div>
            </div>

            <p className="text-sm text-muted leading-relaxed">{product.description}</p>

            {/* ── Color selector ── */}
            <div>
              <p className="text-sm font-semibold text-nearblack mb-3">
                Colour
                {selectedColor && (
                  <span className="ml-2 font-normal text-muted">— {selectedColor.name}</span>
                )}
              </p>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => { setSelectedColor(color); setErrors((e) => ({ ...e, color: false })); }}
                    title={color.name}
                    className={`relative w-9 h-9 rounded-full border-2 transition-all cursor-pointer hover:scale-110 active:scale-95 ${
                      selectedColor?.name === color.name
                        ? "border-nearblack scale-110 shadow-md"
                        : "border-white shadow-sm hover:border-gray-300"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                    aria-pressed={selectedColor?.name === color.name}
                  >
                    {selectedColor?.name === color.name && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                          className={`w-4 h-4 ${color.hex === "#F5ECD7" || color.hex === "#C19A6B" ? "text-nearblack" : "text-white"}`}>
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                  </button>
                ))}
              </div>
              {errors.color && (
                <p className="text-red-600 text-xs mt-2 font-medium">Please select a colour.</p>
              )}
            </div>

            {/* ── Size selector ── */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-nearblack">
                  Size
                  {selectedSize && (
                    <span className="ml-2 font-normal text-muted">— {selectedSize}</span>
                  )}
                </p>
                <Link href="/about#size-guide" className="text-xs font-medium text-sienna hover:underline underline-offset-4">
                  Size Guide
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setErrors((e) => ({ ...e, size: false })); }}
                    className={`px-4 py-2.5 text-sm rounded-xl border font-medium transition-all cursor-pointer ${
                      selectedSize === size
                        ? "bg-nearblack text-white border-nearblack shadow-sm"
                        : "bg-white text-nearblack border-gray-200 hover:border-nearblack"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {errors.size && (
                <p className="text-red-600 text-xs mt-2 font-medium">Please select a size.</p>
              )}
            </div>

            {/* Selected summary chip */}
            {(selectedColor || selectedSize) && (
              <div className="flex flex-wrap gap-2">
                {selectedColor && (
                  <span className="inline-flex items-center gap-1.5 bg-nearblack/5 text-nearblack text-xs font-semibold px-3 py-1.5 rounded-full">
                    <span className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: selectedColor.hex }} />
                    {selectedColor.name}
                  </span>
                )}
                {selectedSize && (
                  <span className="inline-flex items-center gap-1.5 bg-nearblack/5 text-nearblack text-xs font-semibold px-3 py-1.5 rounded-full">
                    EU {selectedSize}
                  </span>
                )}
              </div>
            )}

            {/* ── Actions ── */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 rounded-xl text-sm font-bold tracking-[0.1em] uppercase transition-all cursor-pointer ${
                  added
                    ? "bg-green-700 text-white"
                    : "bg-nearblack text-white hover:bg-maroon"
                }`}
              >
                {added ? "Added to Cart ✓" : "Add to Cart"}
              </button>
              <button
                onClick={() => toggle(product)}
                className={`w-14 flex items-center justify-center border-2 rounded-xl transition-all cursor-pointer ${
                  wishlisted
                    ? "bg-maroon-light border-maroon text-maroon"
                    : "bg-white border-gray-200 text-nearblack hover:border-maroon hover:text-maroon"
                }`}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
            </div>

            {/* Features */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-nearblack mb-4">Product Details</h3>
              <ul className="space-y-2.5">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-6">
              {[
                { icon: "🚚", label: "Free shipping", sub: "Orders ₦50k+" },
                { icon: "↩️", label: "Easy returns", sub: "Within 14 days" },
                { icon: "🔒", label: "Secure payment", sub: "Paystack" },
              ].map((t) => (
                <div key={t.label} className="text-center p-3 bg-white rounded-xl border border-gray-100">
                  <p className="text-xl mb-1">{t.icon}</p>
                  <p className="text-xs font-bold text-nearblack leading-tight">{t.label}</p>
                  <p className="text-[11px] text-muted mt-0.5">{t.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-bold text-nearblack mb-8" style={{ fontFamily: "var(--font-serif)" }}>
              You may also like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
