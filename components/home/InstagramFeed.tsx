import Image from "next/image";

const placeholderImages = [
  { seed: "insta-shoes-1", alt: "Leather shoes detail" },
  { seed: "insta-craft-2", alt: "Crafting process" },
  { seed: "insta-worn-3", alt: "Shoes being worn" },
  { seed: "insta-belt-4", alt: "Leather belt" },
  { seed: "insta-slipper-5", alt: "Slide slippers" },
  { seed: "insta-workshop-6", alt: "Workshop scene" },
];

export default function InstagramFeed() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-10">
          <h2
            className="text-4xl md:text-5xl font-bold text-nearblack mb-3"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Follow Us
          </h2>
          <p className="text-muted text-base">@cresteps</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-10">
          {placeholderImages.map((img, i) => (
            <a
              key={i}
              href="https://instagram.com/cresteps"
              target="_blank"
              rel="noopener noreferrer"
              className="relative block aspect-square rounded-xl overflow-hidden hover:opacity-90 transition-opacity shadow-sm"
              aria-label={img.alt}
            >
              <Image
                src={`https://picsum.photos/seed/${img.seed}/400/400`}
                alt={img.alt}
                fill
                className="object-cover"
              />
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
