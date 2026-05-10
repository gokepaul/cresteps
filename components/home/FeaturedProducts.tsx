const products = [
  {
    name: "Classic Oxford",
    price: "₦35,000",
    category: "Shoes",
    gradient: "linear-gradient(135deg, #7B1010 0%, #C8861A 100%)",
    waLink: "https://wa.me/2341234567890?text=I'm interested in the Classic Oxford",
  },
  {
    name: "Slide Slippers",
    price: "₦18,000",
    category: "Slippers",
    gradient: "linear-gradient(135deg, #C8861A 0%, #FFF8EE 100%)",
    waLink: "https://wa.me/2341234567890?text=I'm interested in the Slide Slippers",
  },
  {
    name: "Leather Belt",
    price: "₦12,000",
    category: "Belts",
    gradient: "linear-gradient(135deg, #1A1A1A 0%, #7B1010 100%)",
    waLink: "https://wa.me/2341234567890?text=I'm interested in the Leather Belt",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold text-nearblack mb-3"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Featured Products
          </h2>
          <p className="text-gray-500 text-base max-w-md mx-auto">
            Our most-loved pieces — handcrafted with genuine Nigerian leather.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.name}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              {/* Placeholder image */}
              <div
                className="h-56 flex items-center justify-center text-white/70 text-sm"
                style={{ background: product.gradient }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">👟</div>
                  <p className="text-white/80 text-xs">{product.name}</p>
                </div>
              </div>

              <div className="p-5">
                <span className="inline-block text-xs font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full mb-2">
                  {product.category}
                </span>
                <h3
                  className="text-lg font-bold text-nearblack mb-1"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {product.name}
                </h3>
                <p className="text-maroon font-semibold text-base mb-4">
                  {product.price}
                </p>
                <div className="flex gap-2">
                  <button
                    disabled
                    className="flex-1 bg-gold/20 text-gold font-semibold text-sm px-4 py-2 rounded-lg cursor-not-allowed opacity-70"
                    title="Online cart coming soon"
                  >
                    Add to Cart
                  </button>
                  <a
                    href={product.waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center text-sm font-semibold text-[#25D366] border border-[#25D366] px-4 py-2 rounded-lg hover:bg-[#25D366] hover:text-white transition-colors"
                  >
                    DM to Order
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
