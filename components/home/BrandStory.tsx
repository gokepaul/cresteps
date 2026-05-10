import Link from "next/link";

export default function BrandStory() {
  return (
    <section className="bg-offwhite py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Placeholder image */}
          <div
            className="h-80 lg:h-[440px] rounded-2xl shadow-lg flex items-center justify-center text-white/70 order-2 lg:order-1"
            style={{
              background: "linear-gradient(135deg, #C8861A 0%, #7B1010 100%)",
            }}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🔨</div>
              <p className="text-white/80 text-sm font-medium">
                Our workshop
              </p>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <span className="inline-block text-gold text-xs font-bold uppercase tracking-widest mb-4">
              Our Story
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-nearblack mb-6 leading-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Born from a love of leather
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Cresteps began as a small workshop in Nigeria, where skilled
                artisans transformed raw leather into footwear that stands the
                test of time.
              </p>
              <p>
                Every pair is hand-cut, hand-stitched, and quality-inspected
                before it reaches you — because we believe your shoes should
                tell a story worth wearing.
              </p>
              <p>
                From our hands to your feet, we pour authenticity into every
                step — honoring the tradition of Nigerian craftsmanship with
                a modern sensibility.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/about"
                className="inline-block bg-maroon hover:bg-[#5e0c0c] text-white font-semibold px-7 py-3 rounded-lg transition-colors cursor-pointer"
              >
                Meet the Maker
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
