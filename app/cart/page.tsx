"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { SHIPPING_RATE } from "@/lib/data/products";

function formatPrice(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
  }, []);

  if (!mounted) return null;

  const sub = subtotal();
  const freeShipping = sub >= 50000;
  const shipping = freeShipping ? 0 : SHIPPING_RATE;
  const total = sub + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-offwhite pt-24 flex flex-col items-center justify-center gap-6 px-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-16 h-16 text-gray-300">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
        </svg>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-nearblack mb-2" style={{ fontFamily: "var(--font-serif)" }}>Your cart is empty</h1>
          <p className="text-gray-400 text-sm">Looks like you haven't added anything yet.</p>
        </div>
        <Link href="/shop" className="bg-maroon text-white text-sm font-bold tracking-widest uppercase px-8 py-3.5 rounded-xl hover:bg-nearblack transition-colors">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offwhite pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-nearblack" style={{ fontFamily: "var(--font-serif)" }}>
            Shopping Cart
          </h1>
          <button
            onClick={clearCart}
            className="text-xs text-gray-400 hover:text-maroon transition-colors cursor-pointer underline underline-offset-4"
          >
            Clear all
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const price = item.product.salePrice ?? item.product.price;
              return (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 bg-white rounded-2xl p-4 border border-gray-100"
                >
                  <Link href={`/shop/${item.product.slug}`} className="relative w-24 h-28 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[11px] text-sienna font-semibold uppercase tracking-widest">{item.product.category}</span>
                        <Link href={`/shop/${item.product.slug}`}>
                          <h3 className="text-base font-bold text-nearblack hover:text-maroon transition-colors leading-snug" style={{ fontFamily: "var(--font-serif)" }}>
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-gray-400 mt-0.5">Size: {item.size}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="text-gray-300 hover:text-maroon transition-colors cursor-pointer shrink-0 mt-0.5"
                        aria-label="Remove"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-sm cursor-pointer">−</button>
                        <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-sm cursor-pointer">+</button>
                      </div>

                      <div className="text-right">
                        {item.product.salePrice && (
                          <p className="text-xs text-gray-400 line-through">{formatPrice(item.product.price * item.quantity)}</p>
                        )}
                        <p className="text-base font-bold text-maroon">{formatPrice(price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
              <h2 className="text-base font-bold text-nearblack mb-5" style={{ fontFamily: "var(--font-serif)" }}>Order Summary</h2>

              <div className="space-y-3 text-sm mb-5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal ({items.reduce((a, i) => a + i.quantity, 0)} items)</span>
                  <span className="font-semibold">{formatPrice(sub)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className={freeShipping ? "text-green-600 font-semibold" : "font-semibold"}>
                    {freeShipping ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                {!freeShipping && (
                  <p className="text-xs text-gray-400">
                    Add {formatPrice(50000 - sub)} more for free shipping
                  </p>
                )}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span className="text-maroon">{formatPrice(total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full text-center text-sm font-bold tracking-widest uppercase bg-maroon text-white py-4 rounded-xl hover:bg-nearblack transition-colors"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/shop"
                className="block w-full text-center text-sm text-gray-400 hover:text-maroon transition-colors mt-4"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
