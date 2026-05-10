"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/custom-orders", label: "Custom Orders" },
  { href: "/reviews", label: "Reviews" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const atTop = !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${
        atTop
          ? "bg-black/20 border-b border-white/10"
          : "bg-cream/90 border-b border-maroon/10 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16">

          {/* Logo — left */}
          <Link
            href="/"
            className={`text-xl font-bold tracking-widest transition-colors ${
              atTop ? "text-white" : "text-maroon"
            }`}
            style={{ fontFamily: "var(--font-serif)" }}
          >
            CRESTEPS
          </Link>

          {/* Nav links — center (desktop only) */}
          <div className="hidden md:flex items-center justify-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  atTop
                    ? "text-white/90 hover:text-gold"
                    : "text-nearblack hover:text-maroon"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right — Chat on WhatsApp button + mobile hamburger */}
          <div className="flex items-center justify-end gap-3">
            <a
              href="https://wa.me/2341234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 bg-[#075E54] hover:bg-[#054d43] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 shrink-0"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block h-0.5 w-6 transition-all duration-300 ${
                  atTop ? "bg-white" : "bg-nearblack"
                } ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 transition-all duration-300 ${
                  atTop ? "bg-white" : "bg-nearblack"
                } ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 transition-all duration-300 ${
                  atTop ? "bg-white" : "bg-nearblack"
                } ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-cream/95 backdrop-blur-md border-t border-maroon/10 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium text-nearblack hover:text-maroon transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/2341234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#075E54] text-white font-semibold text-sm px-4 py-2.5 rounded-lg w-fit"
            onClick={() => setMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}
