import Image from "next/image";
import Link from "next/link";

export default function BrandStory() {
  return (
    <section className="bg-offwhite py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Workshop image */}
          <div className="relative h-80 lg:h-[440px] rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1">
            <Image
              src="https://picsum.photos/seed/leather-workshop/800/600"
              alt="Our leather workshop"
              fill
              className="object-cover"
            />
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <span className="inline-block text-sienna text-xs font-bold uppercase tracking-widest mb-4">
              Our Story
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-nearblack mb-6 leading-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Born from a love of leather
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
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
                className="inline-block bg-maroon hover:bg-maroon-dark text-white font-semibold px-7 py-3 rounded-lg transition-colors cursor-pointer"
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
