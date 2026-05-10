const reviews = [
  {
    name: "Adaeze O.",
    rating: 5,
    text: "The quality is unmatched! I've been wearing my Classic Oxfords for 6 months and they look better every day. Will definitely order again.",
  },
  {
    name: "Tunde B.",
    rating: 5,
    text: "I ordered a custom belt and it arrived exactly as I envisioned. The leather is thick and supple — truly premium Nigerian craftsmanship.",
  },
  {
    name: "Chioma E.",
    rating: 5,
    text: "Fast delivery and beautiful packaging. The slide slippers are so comfortable. My family can't stop complimenting them!",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-sienna text-lg">
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewStrip() {
  return (
    <section className="bg-offwhite py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold text-nearblack mb-3"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            What Customers Say
          </h2>
          <p className="text-gray-500 text-base">
            Real reviews from real people.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 border-l-4 border-l-sienna"
            >
              <Stars count={review.rating} />
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="text-nearblack font-semibold text-sm">
                — {review.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
