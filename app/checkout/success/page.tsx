"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useCartStore } from "@/store/cartStore";
import type { Order } from "@/lib/types";

function formatPrice(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") ?? searchParams.get("trxref");
  const { clearCart } = useCartStore();

  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [order, setOrder] = useState<Partial<Order> | null>(null);

  useEffect(() => {
    useCartStore.persist.rehydrate();

    async function verify() {
      if (!reference) { setStatus("failed"); return; }

      try {
        const res = await fetch(`/api/verify-payment?reference=${reference}`);
        const data = await res.json();

        if (data.verified) {
          // Retrieve pending order from localStorage
          const pending = localStorage.getItem("pending_order");
          const pendingOrder = pending ? JSON.parse(pending) : null;

          const completedOrder: Partial<Order> = {
            id: `ORD-${Date.now()}`,
            reference,
            status: "paid",
            ...pendingOrder,
            createdAt: new Date().toISOString(),
          };

          // Save to order history
          const history: Partial<Order>[] = JSON.parse(localStorage.getItem("order_history") ?? "[]");
          history.unshift(completedOrder);
          localStorage.setItem("order_history", JSON.stringify(history));
          localStorage.removeItem("pending_order");

          setOrder(completedOrder);
          setStatus("success");
          clearCart();
        } else {
          setStatus("failed");
        }
      } catch {
        setStatus("failed");
      }
    }

    verify();
  }, [reference, clearCart]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-offwhite pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-maroon border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Verifying your payment…</p>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen bg-offwhite pt-24 flex flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-red-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-nearblack mb-2" style={{ fontFamily: "var(--font-serif)" }}>Payment Not Confirmed</h1>
          <p className="text-gray-500 text-sm">We couldn't verify your payment. If you were charged, please contact us on WhatsApp with your reference: <strong>{reference}</strong></p>
        </div>
        <div className="flex gap-3">
          <Link href="/cart" className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold hover:border-maroon transition-colors">Back to Cart</Link>
          <a href="https://wa.me/2341234567890" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#075E54] text-white rounded-xl text-sm font-semibold hover:bg-[#054d43] transition-colors">Contact Support</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offwhite pt-20">
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        {/* Success icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-10 h-10 text-green-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-nearblack mb-3" style={{ fontFamily: "var(--font-serif)" }}>
          Order Confirmed!
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Thank you for your purchase. We'll send a confirmation to{" "}
          <strong>{order?.shippingInfo?.email}</strong>. Your handcrafted footwear is being prepared.
        </p>

        {/* Order details */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 text-left mb-8">
          <div className="flex justify-between text-sm mb-4">
            <span className="text-gray-500">Order ID</span>
            <span className="font-semibold font-mono text-xs">{order?.id}</span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span className="text-gray-500">Reference</span>
            <span className="font-semibold font-mono text-xs">{reference}</span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span className="text-gray-500">Total Paid</span>
            <span className="font-bold text-maroon">{order?.total ? formatPrice(order.total) : "—"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Delivery to</span>
            <span className="font-semibold text-right max-w-[60%]">
              {order?.shippingInfo?.city}, {order?.shippingInfo?.state}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/account/orders" className="flex-1 py-3.5 text-sm font-bold tracking-widest uppercase bg-maroon text-white rounded-xl hover:bg-nearblack transition-colors">
            View Order
          </Link>
          <Link href="/shop" className="flex-1 py-3.5 text-sm font-semibold border border-gray-200 rounded-xl hover:border-maroon hover:text-maroon transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-offwhite pt-24 flex items-center justify-center"><p className="text-gray-400">Loading…</p></div>}>
      <SuccessContent />
    </Suspense>
  );
}
