import Image from "next/image";
import Link from "next/link";

const craftSteps = [
  {
    number: "01",
    title: "Select the Leather",
    description:
      "We source only genuine full-grain Nigerian leather — durable, supple, and rich in character.",
  },
  {
    number: "02",
    title: "Hand-Cut and Stitch",
    description:
      "Every piece is cut by hand, aligned with care, and stitched with double-thread reinforcement.",
  },
  {
    number: "03",
    title: "Quality Inspect",
    description:
      "Each finished item passes a rigorous 12-point quality check before it's packaged and shipped.",
  },
];

const values = [
  {
    icon: "◈",
    title: "Quality",
    description:
      "We never compromise on materials. Every hide, every thread, every sole is chosen for longevity.",
  },
  {
    icon: "◎",
    title: "Authenticity",
    description:
      "No shortcuts. Our products are made the old-fashioned way — by hand, with patience.",
  },
  {
    icon: "◉",
    title: "Community",
    description:
      "We employ local artisans, source locally where possible, and reinvest in Nigerian craftsmanship.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-offwhite">
      {/* Hero */}
      <div className="bg-maroon pt-24 pb-14 text-center px-4">
        <span className="inline-block text-sienna text-xs font-bold uppercase tracking-widest mb-4">
          Our Story
        </span>
        <h1
          className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          The Story Behind Cresteps
        </h1>
        <p className="text-gray-200 text-lg max-w-xl mx-auto">
          From a small workshop in Nigeria to feet around the world.
        </p>
      </div>

      {/* Founder story */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 lg:h-[460px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://picsum.photos/seed/cresteps-founder/600/700"
                alt="Cresteps founder"
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div>
              <span className="inline-block text-sienna text-xs font-bold uppercase tracking-widest mb-4">
                The Founder
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold text-nearblack mb-6"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                A craftsman&apos;s obsession with perfection
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Cresteps was born in Lagos, Nigeria, where our founder spent
                  years apprenticing under master cobblers before starting his
                  own workshop. His mission was simple: make footwear that lasts
                  a lifetime and looks better with age.
                </p>
                <p>
                  What started as a hobby — restoring old leather shoes for
                  friends and family — grew into a brand trusted by customers
                  across Nigeria and beyond. Each pair carries the same care and
                  attention that went into the very first shoe made in that tiny
                  workshop.
                </p>
                <p>
                  Today, Cresteps employs a small team of skilled artisans,
                  each trained in traditional leatherworking techniques. We
                  believe that good shoes should be earned — by the hands that
                  make them and by the feet that wear them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Craft process */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2
              className="text-4xl md:text-5xl font-bold text-nearblack mb-3"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              How We Make It
            </h2>
            <p className="text-gray-500">Our 3-step craft process.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {craftSteps.map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <div
                  className="text-4xl font-bold text-gold mb-4"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {step.number}
                </div>
                <h3
                  className="text-xl font-bold text-nearblack mb-3"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand values */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2
              className="text-4xl md:text-5xl font-bold text-nearblack mb-3"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Our Values
            </h2>
            <p className="text-gray-500">What guides every stitch we make.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="text-4xl text-gold mb-4">{value.icon}</div>
                <h3
                  className="text-xl font-bold text-nearblack mb-3"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-maroon py-16 text-center px-4">
        <h2
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Ready to own a pair?
        </h2>
        <p className="text-gray-200 mb-8 text-base">
          Browse our collection — handcrafted shoes, slippers, and belts.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-gold hover:bg-[#b37518] text-nearblack font-semibold px-8 py-3 rounded-lg transition-colors cursor-pointer"
        >
          Shop Now
        </Link>
      </section>
    </div>
  );
}
