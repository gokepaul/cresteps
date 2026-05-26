"use client";

interface SizeGuideModalProps {
  onClose: () => void;
}

const sizes = [
  { eu: 36, uk: 3, us: 5, cm: 22.5 },
  { eu: 37, uk: 4, us: 6, cm: 23.5 },
  { eu: 38, uk: 5, us: 7, cm: 24.0 },
  { eu: 39, uk: 6, us: 7.5, cm: 24.5 },
  { eu: 40, uk: 6.5, us: 8, cm: 25.5 },
  { eu: 41, uk: 7, us: 8.5, cm: 26.0 },
  { eu: 42, uk: 8, us: 9.5, cm: 26.5 },
  { eu: 43, uk: 9, us: 10, cm: 27.5 },
  { eu: 44, uk: 9.5, us: 10.5, cm: 28.0 },
  { eu: 45, uk: 10, us: 11, cm: 28.5 },
  { eu: 46, uk: 11, us: 12, cm: 29.5 },
  { eu: 47, uk: 12, us: 13, cm: 30.0 },
];

export default function SizeGuideModal({ onClose }: SizeGuideModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-nearblack transition-colors cursor-pointer"
          aria-label="Close size guide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-6 h-6"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <h2
          className="text-2xl font-bold text-maroon mb-1"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Size Guide
        </h2>
        <p className="text-sm text-muted mb-5">
          Measure your foot from heel to toe in centimetres.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-maroon text-white">
                <th className="px-3 py-2 text-left font-semibold">EU</th>
                <th className="px-3 py-2 text-left font-semibold">UK</th>
                <th className="px-3 py-2 text-left font-semibold">US</th>
                <th className="px-3 py-2 text-left font-semibold">Foot (cm)</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((s, i) => (
                <tr
                  key={s.eu}
                  className={i % 2 === 0 ? "bg-cream" : "bg-white"}
                >
                  <td className="px-3 py-2 font-medium text-nearblack">{s.eu}</td>
                  <td className="px-3 py-2 text-gray-600">{s.uk}</td>
                  <td className="px-3 py-2 text-gray-600">{s.us}</td>
                  <td className="px-3 py-2 text-gray-600">{s.cm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-muted mt-4">
          * Sizes may vary slightly between styles. When in doubt, size up.
        </p>
      </div>
    </div>
  );
}
