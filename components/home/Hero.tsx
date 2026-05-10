import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end md:items-center overflow-hidden">
      {/* Full-bleed background image */}
      <Image
        src="https://res.cloudinary.com/dcayv2r5u/image/upload/v1778414184/can_we_change_this_image_202605101255_e7tdpf.jpg"
        alt="Cresteps handcrafted leather shoes"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Warm dark gradient — strong at bottom where text sits, fades up */}
      <div className="absolute inset-0 bg-gradient-to-t from-nearblack/95 via-nearblack/55 to-maroon/25" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-0 md:py-32">
        <div className="max-w-2xl">
          <span className="inline-block text-cream text-xs font-semibold uppercase tracking-widest mb-6">
            ✦ Handcrafted in Nigeria
          </span>
          <h1
            className="text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Handcrafted Leather.{" "}
            <span className="text-gold">Built to Last.</span>
          </h1>
          <p className="text-lg text-gray-200 mb-10 leading-relaxed max-w-md">
            Unisex footwear &amp; belts — made by hand in Nigeria. Every pair
            tells a story of craft, patience, and genuine leather.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/shop"
              className="inline-block bg-gold hover:bg-[#b37518] text-nearblack font-semibold text-base px-8 py-3 rounded-lg transition-colors cursor-pointer shadow-md"
            >
              Shop Now
            </Link>
            <Link
              href="/about"
              className="text-white underline underline-offset-4 text-sm hover:text-gold transition-colors"
            >
              See How We Make It
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
