"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

function formatPrice(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } =
    useCartStore();

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2
            className="text-lg font-bold text-nearblack"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Your Cart{" "}
            {items.length > 0 && (
              <span className="text-sm text-gray-400 font-normal">
                ({items.reduce((a, i) => a + i.quantity, 0)})
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-14 h-14 text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm6.75 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p className="text-gray-400 text-sm">Your cart is empty.</p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="text-sm font-bold tracking-widest uppercase text-maroon underline underline-offset-4"
              >
                Start shopping
              </Link>
            </div>
          ) : (
            items.map((item) => {
              const price = item.product.salePrice ?? item.product.price;
              return (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-nearblack leading-snug truncate" style={{ fontFamily: "var(--font-serif)" }}>
                      {item.product.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">Size: {item.size}</p>
                    <p className="text-sm font-bold text-maroon mt-1">
                      {formatPrice(price * item.quantity)}
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                      {/* Qty stepper */}
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 text-sm cursor-pointer"
                        >−</button>
                        <span className="w-7 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 text-sm cursor-pointer"
                        >+</button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="text-xs text-gray-400 hover:text-maroon transition-colors cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-bold text-nearblack">{formatPrice(subtotal())}</span>
            </div>
            <p className="text-xs text-gray-400">Shipping calculated at checkout.</p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full text-center text-sm font-bold tracking-widest uppercase bg-maroon text-white py-3.5 rounded-xl hover:bg-nearblack transition-colors"
            >
              Checkout
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block w-full text-center text-sm font-semibold text-nearblack border border-gray-200 py-3 rounded-xl hover:border-maroon hover:text-maroon transition-colors"
            >
              View Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
