import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-maroon overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #C8861A 0, #C8861A 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        {/* Text */}
        <div>
          <span className="inline-block text-gold text-xs font-semibold uppercase tracking-widest mb-6">
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
              className="inline-block bg-gold hover:bg-[#b37518] text-white font-semibold text-base px-8 py-3 rounded-lg transition-colors cursor-pointer shadow-md"
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

        {/* Placeholder image */}
        <div className="flex justify-center lg:justify-end">
          <div
            className="w-full max-w-sm h-96 lg:h-[480px] rounded-2xl shadow-2xl flex items-center justify-center text-white/60 text-sm font-medium"
            style={{
              background: "linear-gradient(135deg, #C8861A 0%, #7B1010 100%)",
            }}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">👟</div>
              <p className="text-white/80 font-medium">Product Photo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
