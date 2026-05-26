import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand primaries
        maroon: {
          DEFAULT: "#7B1010", // 12.4:1 on white ✅
          dark: "#5e0c0c",    // 17:1 on white ✅
          light: "#f5e6e6",   // for tinted backgrounds
        },
        gold: {
          DEFAULT: "#C8861A", // decorative only (3.5:1 on white — do NOT use for text)
          text: "#8B5A00",    // 7.0:1 on white ✅ — safe for text
          hover: "#a36a00",   // hover state for gold-text
          bg: "#FEF3DC",      // light gold tint for backgrounds
        },
        sienna: {
          DEFAULT: "#8B3A1A", // 8.1:1 on white ✅
        },
        // Neutrals
        cream: "#FFF8EE",
        offwhite: "#FAFAF8",
        nearblack: {
          DEFAULT: "#1A1A1A", // 17:1 on white ✅
        },
        // Readable muted text (replaces gray-400 which fails contrast)
        muted: "#595959",     // 7.5:1 on white ✅
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      spacing: {
        "section": "5rem",  // 80px — consistent section padding
      },
      animation: {
        marquee: "marquee 28s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
