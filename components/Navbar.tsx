"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import dynamic from "next/dynamic";

const NavbarAuthSection = dynamic(() => import("./NavbarAuthSection"), {
  ssr: false,
  loading: () => <div className="w-9 h-9" />,
});

const HAS_AUTH = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const navLinks = [
  { href: "/shop", label: "Shop All" },
  { href: "/shop?category=Shoes", label: "Shoes" },
  { href: "/shop?category=Boots", label: "Boots" },
  { href: "/shop?category=Slippers", label: "Slippers" },
  { href: "/shop?category=Belts", label: "Belts" },
  { href: "/custom-orders", label: "Custom" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const { toggleCart, itemCount } = useCartStore();
  const count = mounted ? itemCount() : 0;

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const atTop = !scrolled;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${
          atTop
            ? "bg-black/20 border-b border-white/10"
            : "bg-white border-b border-gray-100 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">

            {/* Logo */}
            <Link
              href="/"
              className={`text-xl font-bold tracking-widest shrink-0 transition-colors ${
                atTop ? "text-white" : "text-maroon"
              }`}
              style={{ fontFamily: "var(--font-serif)" }}
            >
              CRESTEPS
            </Link>

            {/* Nav links — desktop */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-semibold tracking-widest uppercase transition-colors ${
                    atTop
                      ? "text-white/90 hover:text-gold"
                      : "text-nearblack hover:text-maroon"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
                  atTop ? "text-white hover:bg-white/10" : "text-nearblack hover:bg-gray-100"
                }`}
                aria-label="Search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-[18px] h-[18px]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>

              {/* Auth — only rendered when Clerk is configured */}
              {HAS_AUTH && mounted && <NavbarAuthSection atTop={atTop} />}

              {/* Cart */}
              <button
                onClick={toggleCart}
                className={`relative w-9 h-9 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
                  atTop ? "text-white hover:bg-white/10" : "text-nearblack hover:bg-gray-100"
                }`}
                aria-label="Open cart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-[18px] h-[18px]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                </svg>
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-maroon text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {count > 9 ? "9+" : count}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                className={`lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 cursor-pointer rounded-full ${
                  atTop ? "text-white hover:bg-white/10" : "text-nearblack hover:bg-gray-100"
                }`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <span className={`block h-0.5 w-5 transition-all duration-300 bg-current ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block h-0.5 w-5 transition-all duration-300 bg-current ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-5 transition-all duration-300 bg-current ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2.5 text-sm font-semibold text-nearblack hover:text-maroon transition-colors tracking-wider"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-100 mt-2">
              <Link href="/account" className="py-2.5 text-sm text-nearblack hover:text-maroon block" onClick={() => setMenuOpen(false)}>My Account</Link>
              <Link href="/account/orders" className="py-2.5 text-sm text-nearblack hover:text-maroon block" onClick={() => setMenuOpen(false)}>My Orders</Link>
              <Link href="/account/wishlist" className="py-2.5 text-sm text-nearblack hover:text-maroon block" onClick={() => setMenuOpen(false)}>Wishlist</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center pt-24 px-4 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">
            <form onSubmit={handleSearch} className="flex items-center gap-3 px-5 py-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-400 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for shoes, belts, slippers…"
                className="flex-1 text-base outline-none text-nearblack placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-sm text-gray-400 hover:text-nearblack cursor-pointer"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
