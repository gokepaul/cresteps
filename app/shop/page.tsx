"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { products } from "@/lib/data/products";
import ProductCard from "@/components/ProductCard";
import SizeGuideModal from "@/components/SizeGuideModal";
import type { Category } from "@/lib/types";

const CATEGORIES: Category[] = ["Shoes", "Boots", "Slippers", "Belts"];
const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as Category | null;
  const initialQuery = searchParams.get("q") ?? "";

  const [activeCategories, setActiveCategories] = useState<Set<Category>>(
    initialCategory ? new Set([initialCategory]) : new Set()
  );
  const [sort, setSort] = useState("featured");
  const [query, setQuery] = useState(initialQuery);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const toggleCategory = (cat: Category) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let list = [...products];

    if (activeCategories.size > 0) {
      list = list.filter((p) => activeCategories.has(p.category));
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "newest":
        list = list.filter((p) => p.isNew).concat(list.filter((p) => !p.isNew));
        break;
      case "price-asc":
        list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case "price-desc":
        list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      default:
        list = list.filter((p) => p.featured).concat(list.filter((p) => !p.featured));
    }

    return list;
  }, [activeCategories, sort, query]);

  return (
    <div className="min-h-screen bg-offwhite">
      {/* Header banner */}
      <div className="bg-nearblack pt-24 pb-12 text-center px-4">
        <p className="text-xs text-gold font-bold tracking-[0.3em] uppercase mb-3">
          Handcrafted in Nigeria
        </p>
        <h1
          className="text-4xl md:text-5xl font-bold text-white"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Shop All
        </h1>
        <p className="text-gray-400 mt-3 text-sm max-w-xs mx-auto">
          {products.length} products · Full-grain leather · Made to last
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Toolbar */}
        <div className="flex flex-wrap items-start gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 min-w-52">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:border-maroon focus:outline-none"
            />
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-2.5 focus:border-maroon focus:outline-none cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {/* Size guide */}
          <button
            onClick={() => setSizeGuideOpen(true)}
            className="text-sm font-medium text-maroon underline underline-offset-4 hover:text-gold transition-colors cursor-pointer py-2.5"
          >
            Size Guide
          </button>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategories(new Set())}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all border cursor-pointer ${
              activeCategories.size === 0
                ? "bg-nearblack text-white border-nearblack"
                : "bg-white text-nearblack border-gray-200 hover:border-nearblack"
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all border cursor-pointer ${
                activeCategories.has(cat)
                  ? "bg-maroon text-white border-maroon"
                  : "bg-white text-nearblack border-gray-200 hover:border-maroon hover:text-maroon"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-xs text-gray-400 mb-6">
          {filtered.length} product{filtered.length !== 1 && "s"}
          {query && ` for "${query}"`}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg mb-2">No products found</p>
            <button
              onClick={() => { setActiveCategories(new Set()); setQuery(""); }}
              className="text-sm text-maroon underline underline-offset-4 cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {sizeGuideOpen && <SizeGuideModal onClose={() => setSizeGuideOpen(false)} />}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-offwhite pt-24 flex items-center justify-center"><p className="text-gray-400">Loading…</p></div>}>
      <ShopContent />
    </Suspense>
  );
}
