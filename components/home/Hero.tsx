import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-start overflow-hidden">
      {/* Full-bleed background image */}
      <Image
        src="https://res.cloudinary.com/dcayv2r5u/image/upload/v1778414184/can_we_change_this_image_202605101255_e7tdpf.jpg"
        alt="Cresteps handcrafted leather shoes"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Gradient: dark at top for text legibility, fades to transparent at bottom so shoes show through */}
      <div className="absolute inset-0 bg-gradient-to-b from-nearblack/90 via-nearblack/50 to-black/10" />

      {/* Content — top-aligned, centred, sits above the product */}
      <div className="relative z-10 w-full text-center px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-16">
        <span className="inline-block text-cream text-xs font-semibold uppercase tracking-widest mb-6">
          ✦ Handcrafted in Nigeria
        </span>

        <h1
          className="text-6xl sm:text-7xl md:text-8xl xl:text-9xl font-bold text-white leading-none mb-6 mx-auto max-w-5xl"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Handcrafted Leather.{" "}
          <span className="text-gold">Built to Last.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-xl mx-auto">
          Unisex footwear &amp; belts — made by hand in Nigeria. Every pair
          tells a story of craft, patience, and genuine leather.
        </p>

        <div className="flex flex-wrap justify-center gap-4 items-center">
          <Link
            href="/shop"
            className="inline-block bg-gold hover:bg-[#b37518] text-nearblack font-bold text-base px-10 py-4 rounded-lg transition-colors cursor-pointer shadow-xl"
          >
            Shop Now
          </Link>
          <Link
            href="/about"
            className="inline-block border border-white text-white hover:bg-white/10 font-semibold text-sm px-8 py-4 rounded-lg transition-colors cursor-pointer"
          >
            See How We Make It
          </Link>
        </div>
      </div>
    </section>
  );
}
