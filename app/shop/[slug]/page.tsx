"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { getProductBySlug, products } from "@/lib/data/products";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import ProductCard from "@/components/ProductCard";

function formatPrice(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

export default function ProductPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0];
  const product = slug ? getProductBySlug(slug) : undefined;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);

  const { addItem } = useCartStore();
  const { toggle, isWishlisted } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
  }, []);

  if (!product) return notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const wishlisted = mounted && isWishlisted(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-offwhite pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-maroon transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-maroon transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-maroon transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-nearblack">{product.name}</span>
        </nav>
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Images */}
          <div className="flex flex-col-reverse sm:flex-row gap-3">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-2 sm:w-20">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-16 sm:w-full aspect-square rounded-lg overflow-hidden border-2 transition-colors cursor-pointer ${
                    selectedImage === i ? "border-maroon" : "border-transparent hover:border-gray-300"
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
                className="object-cover"
                priority
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-nearblack text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded">New</span>
              )}
              {product.salePrice && (
                <span className="absolute top-4 left-4 bg-maroon text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded">Sale</span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-sienna mb-2">{product.category}</span>
            <h1
              className="text-3xl md:text-4xl font-bold text-nearblack leading-tight mb-4"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              {product.salePrice ? (
                <>
                  <span className="text-2xl font-bold text-maroon">{formatPrice(product.salePrice)}</span>
                  <span className="text-base text-gray-400 line-through">{formatPrice(product.price)}</span>
                  <span className="text-xs font-bold bg-maroon/10 text-maroon px-2 py-0.5 rounded">
                    Save {formatPrice(product.price - product.salePrice)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-nearblack">{formatPrice(product.price)}</span>
              )}
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-6">{product.description}</p>

            {/* Size selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-nearblack">
                  Select Size {selectedSize && <span className="text-maroon">— {selectedSize}</span>}
                </span>
                <Link href="/about#size-guide" className="text-xs text-maroon underline underline-offset-4">
                  Size Guide
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false); }}
                    className={`px-4 py-2 text-sm rounded-lg border font-medium transition-all cursor-pointer ${
                      selectedSize === size
                        ? "bg-nearblack text-white border-nearblack"
                        : "bg-white text-nearblack border-gray-200 hover:border-nearblack"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="text-xs text-red-500 mt-2">Please select a size before adding to cart.</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 rounded-xl text-sm font-bold tracking-widest uppercase transition-all cursor-pointer ${
                  added
                    ? "bg-green-600 text-white"
                    : "bg-nearblack text-white hover:bg-maroon"
                }`}
              >
                {added ? "Added to Cart ✓" : "Add to Cart"}
              </button>
              <button
                onClick={() => toggle(product)}
                className={`w-14 flex items-center justify-center border rounded-xl transition-all cursor-pointer ${
                  wishlisted
                    ? "bg-maroon/10 border-maroon text-maroon"
                    : "bg-white border-gray-200 text-nearblack hover:border-maroon hover:text-maroon"
                }`}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
            </div>

            {/* Features */}
            <div className="border-t border-gray-100 pt-6 mb-6">
              <h3 className="text-sm font-bold tracking-widest uppercase text-nearblack mb-4">Product Details</h3>
              <ul className="space-y-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-6">
              {[
                { icon: "🚚", label: "Free shipping", sub: "On orders ₦50k+" },
                { icon: "↩️", label: "Easy returns", sub: "Within 14 days" },
                { icon: "🔒", label: "Secure payment", sub: "Paystack encrypted" },
              ].map((t) => (
                <div key={t.label} className="text-center">
                  <p className="text-xl mb-1">{t.icon}</p>
                  <p className="text-xs font-semibold text-nearblack">{t.label}</p>
                  <p className="text-[10px] text-gray-400">{t.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2
              className="text-2xl font-bold text-nearblack mb-8"
              style={{ fontFamily: "var(--font-serif)" }}
            >
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
