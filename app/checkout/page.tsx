"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { SHIPPING_RATE, NIGERIAN_STATES } from "@/lib/data/products";
import type { ShippingInfo } from "@/lib/types";

function formatPrice(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

const EMPTY_FORM: ShippingInfo = {
  firstName: "", lastName: "", email: "",
  phone: "", address: "", city: "", state: "",
};

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<ShippingInfo>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    router.replace("/shop");
    return null;
  }

  const sub = subtotal();
  const freeShipping = sub >= 50000;
  const shipping = freeShipping ? 0 : SHIPPING_RATE;
  const total = sub + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    const required = Object.entries(form).filter(([, v]) => !v.trim());
    if (required.length > 0) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          amount: total * 100, // Paystack uses kobo
          metadata: {
            items: items.map((i) => ({
              name: i.product.name,
              size: i.size,
              quantity: i.quantity,
              price: i.product.salePrice ?? i.product.price,
            })),
            shippingInfo: form,
          },
          callback_url: `${window.location.origin}/checkout/success`,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.authorization_url) {
        throw new Error(data.message ?? "Failed to initialize payment.");
      }

      // Save order intent to localStorage before redirecting
      const orderIntent = {
        items,
        subtotal: sub,
        shipping,
        total,
        shippingInfo: form,
        reference: data.reference,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem("pending_order", JSON.stringify(orderIntent));

      // Redirect to Paystack
      window.location.href = data.authorization_url;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-offwhite pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-nearblack mb-8" style={{ fontFamily: "var(--font-serif)" }}>
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Shipping form */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-base font-bold text-nearblack mb-5 tracking-wide">Shipping Information</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: "firstName", label: "First Name", type: "text", colSpan: 1 },
                    { name: "lastName", label: "Last Name", type: "text", colSpan: 1 },
                    { name: "email", label: "Email Address", type: "email", colSpan: 2 },
                    { name: "phone", label: "Phone Number", type: "tel", colSpan: 2 },
                    { name: "address", label: "Delivery Address", type: "text", colSpan: 2 },
                    { name: "city", label: "City", type: "text", colSpan: 1 },
                  ].map(({ name, label, type, colSpan }) => (
                    <div key={name} className={colSpan === 2 ? "sm:col-span-2" : ""}>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">{label}</label>
                      <input
                        type={type}
                        name={name}
                        value={form[name as keyof ShippingInfo]}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-maroon focus:outline-none bg-offwhite"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">State</label>
                    <select
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-maroon focus:outline-none bg-offwhite cursor-pointer"
                    >
                      <option value="">Select state</option>
                      {NIGERIAN_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              {/* Payment note */}
              <div className="bg-nearblack/5 rounded-2xl p-5 flex gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-nearblack shrink-0 mt-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-nearblack">Secure Payment via Paystack</p>
                  <p className="text-xs text-gray-500 mt-0.5">You'll be redirected to Paystack's secure payment page to complete your order. We accept cards, bank transfer, and USSD.</p>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
                <h2 className="text-base font-bold text-nearblack mb-5">Order Summary</h2>

                <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
                  {items.map((item) => {
                    const price = item.product.salePrice ?? item.product.price;
                    return (
                      <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                        <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                          <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-maroon text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-nearblack truncate" style={{ fontFamily: "var(--font-serif)" }}>{item.product.name}</p>
                          <p className="text-xs text-gray-400">Size: {item.size}</p>
                          <p className="text-sm font-bold text-maroon mt-0.5">{formatPrice(price * item.quantity)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2.5 text-sm mb-5">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold">{formatPrice(sub)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span className={freeShipping ? "text-green-600 font-semibold" : "font-semibold"}>
                      {freeShipping ? "Free" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-gray-100 pt-2.5 font-bold text-base">
                    <span>Total</span>
                    <span className="text-maroon">{formatPrice(total)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 text-sm font-bold tracking-widest uppercase bg-maroon text-white rounded-xl hover:bg-nearblack transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? "Redirecting to Paystack…" : `Pay ${formatPrice(total)}`}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
