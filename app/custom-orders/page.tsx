"use client";

import { useState } from "react";

const euSizes = Array.from({ length: 12 }, (_, i) => 36 + i);

export default function CustomOrdersPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    whatsappNumber: "",
    productType: "",
    size: "",
    colourPreference: "",
    additionalNotes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Custom order submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-offwhite">
      {/* Header */}
      <div className="bg-maroon pt-24 pb-14 text-center px-4">
        <h1
          className="text-5xl font-bold text-white mb-3"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Custom Orders
        </h1>
        <p className="text-gray-200 text-lg">
          We&apos;ll reach out within 4 hours.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
                <div className="text-6xl mb-4">✅</div>
                <h2
                  className="text-3xl font-bold text-maroon mb-3"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Order Received!
                </h2>
                <p className="text-gray-600 mb-6">
                  Thanks, {formData.fullName}! We&apos;ll contact you on
                  WhatsApp within 4 hours to discuss your custom order.
                </p>
                <a
                  href="https://wa.me/2341234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-maroon hover:bg-[#5e0c0c] text-white font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer"
                >
                  Chat on WhatsApp
                </a>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2
                  className="text-2xl font-bold text-nearblack mb-6"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Tell us what you need
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-semibold text-nearblack mb-1"
                    >
                      Full Name <span className="text-maroon">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Adaeze Nwosu"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-nearblack placeholder-gray-500 focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>

                  {/* WhatsApp Number */}
                  <div>
                    <label
                      htmlFor="whatsappNumber"
                      className="block text-sm font-semibold text-nearblack mb-1"
                    >
                      WhatsApp Number <span className="text-maroon">*</span>
                    </label>
                    <input
                      type="tel"
                      id="whatsappNumber"
                      name="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={handleChange}
                      required
                      placeholder="+234 801 234 5678"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-nearblack placeholder-gray-500 focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Product Type + Size row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="productType"
                        className="block text-sm font-semibold text-nearblack mb-1"
                      >
                        Product Type <span className="text-maroon">*</span>
                      </label>
                      <select
                        id="productType"
                        name="productType"
                        value={formData.productType}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-nearblack focus:border-gold focus:outline-none transition-colors bg-white"
                      >
                        <option value="">Select type</option>
                        <option value="Shoes">Shoes</option>
                        <option value="Slippers">Slippers</option>
                        <option value="Belt">Belt</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="size"
                        className="block text-sm font-semibold text-nearblack mb-1"
                      >
                        Size (EU)
                      </label>
                      <select
                        id="size"
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-nearblack focus:border-gold focus:outline-none transition-colors bg-white"
                      >
                        <option value="">Select size</option>
                        {euSizes.map((s) => (
                          <option key={s} value={s}>
                            EU {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Colour Preference */}
                  <div>
                    <label
                      htmlFor="colourPreference"
                      className="block text-sm font-semibold text-nearblack mb-1"
                    >
                      Colour Preference
                    </label>
                    <input
                      type="text"
                      id="colourPreference"
                      name="colourPreference"
                      value={formData.colourPreference}
                      onChange={handleChange}
                      placeholder="e.g. Tan brown, black, cognac..."
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-nearblack placeholder-gray-500 focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label
                      htmlFor="additionalNotes"
                      className="block text-sm font-semibold text-nearblack mb-1"
                    >
                      Additional Notes
                    </label>
                    <textarea
                      id="additionalNotes"
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Any special requirements, style references, or questions..."
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-nearblack placeholder-gray-500 focus:border-gold focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-maroon hover:bg-[#5e0c0c] text-white font-semibold text-base px-6 py-3 rounded-lg transition-colors cursor-pointer"
                  >
                    Submit Custom Order
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Side panel */}
          <div className="lg:col-span-1">
            <div className="bg-cream border border-gold/20 rounded-2xl p-8 sticky top-24">
              <h3
                className="text-xl font-bold text-maroon mb-5"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Why Custom?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-sienna text-lg mt-0.5">✦</span>
                  <div>
                    <p className="text-sm font-semibold text-nearblack mb-1">
                      Perfect fit, every time
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      We make to your exact measurements so there&apos;s no
                      breaking-in period needed.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sienna text-lg mt-0.5">✦</span>
                  <div>
                    <p className="text-sm font-semibold text-nearblack mb-1">
                      Choose your leather & colour
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Pick from our range of genuine leathers — tan, black,
                      cognac, chocolate, and more.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sienna text-lg mt-0.5">✦</span>
                  <div>
                    <p className="text-sm font-semibold text-nearblack mb-1">
                      Unique to you
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Custom orders come with your initials stamped inside the
                      shoe at no extra cost.
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-gold/20">
                <p className="text-xs text-gray-500 mb-3">
                  Prefer to discuss first?
                </p>
                <a
                  href="https://wa.me/2341234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-maroon font-semibold text-sm hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat with us on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
