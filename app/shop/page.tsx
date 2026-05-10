"use client";

import { useState } from "react";
import Image from "next/image";
import SizeGuideModal from "@/components/SizeGuideModal";

type Category = "All" | "Shoes" | "Slippers" | "Belts";

const products = [
  {
    name: "Classic Oxford",
    price: "₦35,000",
    category: "Shoes" as Category,
    image: "https://picsum.photos/seed/shop-oxford/400/300",
    waLink: "https://wa.me/2341234567890?text=I'm interested in the Classic Oxford",
  },
  {
    name: "Derby Brogues",
    price: "₦42,000",
    category: "Shoes" as Category,
    image: "https://picsum.photos/seed/shop-derby/400/300",
    waLink: "https://wa.me/2341234567890?text=I'm interested in the Derby Brogues",
  },
  {
    name: "Chelsea Boot",
    price: "₦55,000",
    category: "Shoes" as Category,
    image: "https://picsum.photos/seed/shop-chelsea/400/300",
    waLink: "https://wa.me/2341234567890?text=I'm interested in the Chelsea Boot",
  },
  {
    name: "Slide Slippers",
    price: "₦18,000",
    category: "Slippers" as Category,
    image: "https://picsum.photos/seed/shop-slide/400/300",
    waLink: "https://wa.me/2341234567890?text=I'm interested in the Slide Slippers",
  },
  {
    name: "Mule Slippers",
    price: "₦22,000",
    category: "Slippers" as Category,
    image: "https://picsum.photos/seed/shop-mule/400/300",
    waLink: "https://wa.me/2341234567890?text=I'm interested in the Mule Slippers",
  },
  {
    name: "Flat Sandal",
    price: "₦15,000",
    category: "Slippers" as Category,
    image: "https://picsum.photos/seed/shop-sandal/400/300",
    waLink: "https://wa.me/2341234567890?text=I'm interested in the Flat Sandal",
  },
  {
    name: "Classic Belt",
    price: "₦12,000",
    category: "Belts" as Category,
    image: "https://picsum.photos/seed/shop-belt-classic/400/300",
    waLink: "https://wa.me/2341234567890?text=I'm interested in the Classic Belt",
  },
  {
    name: "Wide Belt",
    price: "₦16,000",
    category: "Belts" as Category,
    image: "https://picsum.photos/seed/shop-belt-wide/400/300",
    waLink: "https://wa.me/2341234567890?text=I'm interested in the Wide Belt",
  },
  {
    name: "Braided Belt",
    price: "₦14,000",
    category: "Belts" as Category,
    image: "https://picsum.photos/seed/shop-belt-braided/400/300",
    waLink: "https://wa.me/2341234567890?text=I'm interested in the Braided Belt",
  },
];

const categories: Category[] = ["All", "Shoes", "Slippers", "Belts"];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-offwhite">
      {/* Header */}
      <div className="bg-maroon py-16 text-center">
        <h1
          className="text-5xl font-bold text-white mb-2"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Shop
        </h1>
        <p className="text-gray-200 text-base">
          All products handcrafted with genuine leather.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Controls row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer border ${
                  activeCategory === cat
                    ? "bg-maroon text-white border-maroon"
                    : "bg-white text-nearblack border-gray-200 hover:border-gold hover:text-gold"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="ml-1.5 text-gold">—</span>
                )}
              </button>
            ))}
          </div>

          {/* Size guide button */}
          <button
            onClick={() => setSizeGuideOpen(true)}
            className="text-sm font-medium text-maroon underline underline-offset-4 hover:text-gold transition-colors cursor-pointer"
          >
            Size Guide
          </button>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <div
              key={product.name}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <span className="inline-block text-xs font-semibold text-sienna bg-sienna/10 px-2 py-0.5 rounded-full mb-2">
                  {product.category}
                </span>
                <h3
                  className="text-lg font-bold text-nearblack mb-1"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {product.name}
                </h3>
                <p className="text-maroon font-semibold text-base mb-4">
                  {product.price}
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-gold hover:bg-[#b37518] text-nearblack font-semibold text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer">
                    View Details
                  </button>
                  <a
                    href={product.waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center text-sm font-semibold text-maroon border border-maroon px-4 py-2 rounded-lg hover:bg-maroon hover:text-white transition-colors"
                  >
                    DM to Order
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Size guide modal */}
      {sizeGuideOpen && (
        <SizeGuideModal onClose={() => setSizeGuideOpen(false)} />
      )}
    </div>
  );
}
