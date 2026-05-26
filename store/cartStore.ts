"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product, ProductColor } from "@/lib/types";

type CartStore = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size: string, color: ProductColor) => void;
  removeItem: (productId: string, size: string, colorName: string) => void;
  updateQuantity: (productId: string, size: string, colorName: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  itemCount: () => number;
  subtotal: () => number;
};

function itemKey(productId: string, size: string, colorName: string) {
  return `${productId}|${size}|${colorName}`;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, size, color) => {
        const items = get().items;
        const existing = items.find(
          (i) =>
            i.product.id === product.id &&
            i.size === size &&
            i.color.name === color.name
        );
        if (existing) {
          set({
            items: items.map((i) =>
              itemKey(i.product.id, i.size, i.color.name) ===
              itemKey(product.id, size, color.name)
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
            isOpen: true,
          });
        } else {
          set({
            items: [...items, { product, size, color, quantity: 1 }],
            isOpen: true,
          });
        }
      },

      removeItem: (productId, size, colorName) => {
        set({
          items: get().items.filter(
            (i) =>
              itemKey(i.product.id, i.size, i.color.name) !==
              itemKey(productId, size, colorName)
          ),
        });
      },

      updateQuantity: (productId, size, colorName, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size, colorName);
          return;
        }
        set({
          items: get().items.map((i) =>
            itemKey(i.product.id, i.size, i.color.name) ===
            itemKey(productId, size, colorName)
              ? { ...i, quantity }
              : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      itemCount: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
      subtotal: () =>
        get().items.reduce((acc, i) => {
          const price = i.product.salePrice ?? i.product.price;
          return acc + price * i.quantity;
        }, 0),
    }),
    { name: "cresteps-cart", skipHydration: true }
  )
);
