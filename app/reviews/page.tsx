const reviews = [
  {
    initials: "AO",
    name: "Adaeze Okonkwo",
    location: "Lagos, Nigeria",
    rating: 5,
    text: "I've bought from Cresteps twice now and the quality keeps exceeding my expectations. The Classic Oxford is a masterpiece — I wear them to every important meeting.",
    product: "Classic Oxford",
  },
  {
    initials: "TB",
    name: "Tunde Babatunde",
    location: "Abuja, Nigeria",
    rating: 5,
    text: "Ordered a custom belt and the craftsmanship is incredible. The leather is thick, firm, and beautifully stitched. Will last a lifetime.",
    product: "Custom Leather Belt",
  },
  {
    initials: "CE",
    name: "Chioma Eze",
    location: "Port Harcourt, Nigeria",
    rating: 5,
    text: "The slide slippers are so comfortable. Perfect for lounging at home or stepping out. The leather gets better with every wear.",
    product: "Slide Slippers",
  },
  {
    initials: "FO",
    name: "Femi Olawale",
    location: "Ibadan, Nigeria",
    rating: 5,
    text: "Fast delivery and the packaging was premium. I ordered the Chelsea Boot and I've received so many compliments. Highly recommend!",
    product: "Chelsea Boot",
  },
  {
    initials: "NK",
    name: "Ngozi Kamalu",
    location: "Enugu, Nigeria",
    rating: 5,
    text: "I was skeptical about ordering online but the customer service via WhatsApp was so smooth. The Derby Brogues fit perfectly and look amazing.",
    product: "Derby Brogues",
  },
  {
    initials: "SO",
    name: "Seun Ojo",
    location: "London, UK",
    rating: 5,
    text: "Shipped all the way to the UK and the quality blew my mind. Nigerian craftsmanship at its finest. My go-to gift for anyone who appreciates quality.",
    product: "Classic Oxford",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-gold text-lg">
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-offwhite">
      {/* Header */}
      <div className="bg-maroon py-16 text-center px-4">
        <h1
          className="text-5xl font-bold text-white mb-3"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          What Our Customers Say
        </h1>
        <p className="text-gray-200 text-base">
          Real reviews from people who wear Cresteps every day.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Rating summary */}
        <div className="flex flex-col items-center mb-14 text-center">
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="text-gold text-3xl">
                ★
              </span>
            ))}
          </div>
          <p className="text-2xl font-bold text-nearblack">
            5.0 / 5.0
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Based on {reviews.length} reviews
          </p>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-maroon text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {review.initials}
                </div>
                <div>
                  <p className="font-semibold text-nearblack text-sm">
                    {review.name}
                  </p>
                  <p className="text-gray-400 text-xs">{review.location}</p>
                </div>
              </div>

              <Stars count={review.rating} />

              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="pt-3 border-t border-gray-100">
                <span className="text-xs font-semibold text-gold bg-gold/10 px-2 py-1 rounded-full">
                  Purchased: {review.product}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-cream rounded-2xl p-10 border border-gold/20">
          <h2
            className="text-3xl font-bold text-maroon mb-3"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Share Your Experience
          </h2>
          <p className="text-gray-600 mb-6 text-base">
            Bought from us? We&apos;d love to hear from you. Send us a message
            on WhatsApp.
          </p>
          <a
            href="https://wa.me/2341234567890?text=Hi! I'd like to leave a review for Cresteps."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold px-7 py-3 rounded-lg transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Share Your Experience
          </a>
        </div>
      </div>
    </div>
  );
}
