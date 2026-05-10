const items = [
  { icon: "✦", label: "Handcrafted" },
  { icon: "✦", label: "Genuine Leather" },
  { icon: "✦", label: "Worldwide Delivery 4–7 Days" },
];

export default function TrustBar() {
  return (
    <div className="bg-cream border-y border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-maroon">
              <span className="text-sienna text-lg">{item.icon}</span>
              <span className="text-sm font-semibold tracking-wide">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
