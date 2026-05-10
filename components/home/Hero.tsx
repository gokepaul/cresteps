import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[600px] flex items-start overflow-hidden">
      {/* Looping background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
      >
        <source
          src="https://res.cloudinary.com/dcayv2r5u/video/upload/v1778441766/bacc03fd-5b32-4d9b-8300-d9a69cda6e61-2026-05-10_dtawxj.mp4"
          type="video/mp4"
        />
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/10" />

      {/* Content */}
      <div className="relative z-10 w-full text-center px-5 sm:px-8 lg:px-12 pt-24 sm:pt-28 md:pt-32 pb-10">
        <span className="inline-block text-white text-[11px] sm:text-xs font-semibold uppercase tracking-widest mb-4 sm:mb-6">
          ✦ Handcrafted in Nigeria
        </span>

        <h1
          className="font-bold text-white leading-[1.05] mb-5 sm:mb-7 mx-auto"
          style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
        >
          Handcrafted Leather.
          <br />
          <span className="text-gold">Built to Last.</span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-8 sm:mb-10 leading-relaxed max-w-xs sm:max-w-sm md:max-w-xl mx-auto">
          Unisex footwear &amp; belts — made by hand in Nigeria. Every pair
          tells a story of craft, patience, and genuine leather.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 items-center">
          <Link
            href="/shop"
            className="w-full sm:w-auto inline-block bg-gold hover:bg-[#b37518] text-nearblack font-bold text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4 rounded-lg transition-colors cursor-pointer shadow-xl"
          >
            Shop Now
          </Link>
          <Link
            href="/about"
            className="w-full sm:w-auto inline-block border border-white text-white hover:bg-white/10 font-semibold text-sm px-8 py-3.5 rounded-lg transition-colors cursor-pointer"
          >
            See How We Make It
          </Link>
        </div>
      </div>
    </section>
  );
}
