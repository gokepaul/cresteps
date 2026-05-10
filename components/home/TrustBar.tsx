const items = [
  { icon: "✦", label: "Handcrafted" },
  { icon: "◈", label: "Genuine Leather" },
  { icon: "✦", label: "Worldwide Delivery 4–7 Days" },
  { icon: "◈", label: "Made in Nigeria" },
  { icon: "✦", label: "Custom Orders Welcome" },
];

// Duplicate 4× so the strip is always full-width before looping
const track = [...items, ...items, ...items, ...items];

export default function TrustBar() {
  return (
    <div className="bg-cream border-y border-sienna/20 overflow-hidden py-3.5">
      <div className="flex animate-marquee whitespace-nowrap">
        {track.map((item, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-2.5 text-maroon mx-10 shrink-0"
          >
            <span className="text-sienna text-base leading-none">{item.icon}</span>
            <span className="text-sm font-semibold tracking-wide">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
