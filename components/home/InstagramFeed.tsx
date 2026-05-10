const placeholderGradients = [
  "linear-gradient(135deg, #7B1010 0%, #C8861A 100%)",
  "linear-gradient(135deg, #C8861A 0%, #FFF8EE 100%)",
  "linear-gradient(135deg, #1A1A1A 0%, #7B1010 100%)",
  "linear-gradient(135deg, #C8861A 0%, #7B1010 100%)",
  "linear-gradient(135deg, #FFF8EE 0%, #C8861A 100%)",
  "linear-gradient(135deg, #7B1010 0%, #1A1A1A 100%)",
];

export default function InstagramFeed() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2
            className="text-4xl md:text-5xl font-bold text-nearblack mb-3"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Follow Us
          </h2>
          <p className="text-gray-500 text-base">@cresteps</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-10">
          {placeholderGradients.map((gradient, i) => (
            <a
              key={i}
              href="https://instagram.com/cresteps"
              target="_blank"
              rel="noopener noreferrer"
              className="block aspect-square rounded-xl overflow-hidden hover:opacity-90 transition-opacity shadow-sm"
              style={{ background: gradient }}
              aria-label={`Instagram post ${i + 1}`}
            >
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="1.5"
                  className="w-8 h-8"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://instagram.com/cresteps"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-maroon text-maroon hover:bg-maroon hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors cursor-pointer"
          >
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
