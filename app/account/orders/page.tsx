"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Order } from "@/lib/types";

function formatPrice(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

const STATUS_STYLES: Record<string, string> = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  shipped: "bg-blue-100 text-blue-700",
  delivered: "bg-emerald-100 text-emerald-700",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Partial<Order>[]>([]);

  useEffect(() => {
    const history = localStorage.getItem("order_history");
    if (history) setOrders(JSON.parse(history));
  }, []);

  return (
    <div className="min-h-screen bg-offwhite pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/account" className="text-muted hover:text-maroon transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <h1 className="text-3xl font-bold text-nearblack" style={{ fontFamily: "var(--font-serif)" }}>My Orders</h1>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-14 h-14 text-gray-300 mx-auto mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
            </svg>
            <p className="text-muted text-sm mb-4">No orders yet.</p>
            <Link href="/shop" className="text-sm font-bold tracking-widest uppercase text-maroon underline underline-offset-4">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => (
              <div key={order.id ?? i} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted font-mono">{order.id}</p>
                    <p className="text-xs text-muted mt-0.5">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" }) : ""}
                    </p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${STATUS_STYLES[order.status ?? "pending"] ?? "bg-gray-100 text-gray-600"}`}>
                    {order.status}
                  </span>
                </div>

                {order.items && (
                  <div className="space-y-2 mb-4">
                    {order.items.slice(0, 2).map((item, j) => (
                      <div key={j} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.product.name} × {item.quantity} <span className="text-muted">(Size {item.size})</span>
                        </span>
                        <span className="font-semibold">{formatPrice((item.product.salePrice ?? item.product.price) * item.quantity)}</span>
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <p className="text-xs text-muted">+{order.items.length - 2} more item{order.items.length - 2 > 1 ? "s" : ""}</p>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div>
                    <p className="text-xs text-muted">Total</p>
                    <p className="text-base font-bold text-maroon">{order.total ? formatPrice(order.total) : "—"}</p>
                  </div>
                  {order.shippingInfo && (
                    <p className="text-xs text-muted text-right">
                      Delivering to<br />
                      <span className="font-medium text-nearblack">{order.shippingInfo.city}, {order.shippingInfo.state}</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
