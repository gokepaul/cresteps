import type { Product, ProductColor } from "@/lib/types";

// ── Shared color palettes ──────────────────────────────────────────
const SHOE_COLORS: ProductColor[] = [
  { name: "Black", hex: "#1A1A1A" },
  { name: "Tan", hex: "#C19A6B" },
  { name: "Cognac", hex: "#9B4722" },
  { name: "Dark Brown", hex: "#3E1C00" },
];

const BOOT_COLORS: ProductColor[] = [
  { name: "Black", hex: "#1A1A1A" },
  { name: "Cognac", hex: "#9B4722" },
  { name: "Dark Brown", hex: "#3E1C00" },
];

const SLIPPER_COLORS: ProductColor[] = [
  { name: "Black", hex: "#1A1A1A" },
  { name: "Tan", hex: "#C19A6B" },
  { name: "Cream", hex: "#F5ECD7" },
];

const BELT_COLORS: ProductColor[] = [
  { name: "Black", hex: "#1A1A1A" },
  { name: "Tan", hex: "#C19A6B" },
  { name: "Dark Brown", hex: "#3E1C00" },
];

// ── Product catalog ────────────────────────────────────────────────
export const products: Product[] = [
  {
    id: "1",
    slug: "classic-oxford",
    name: "Classic Oxford",
    price: 35000,
    category: "Shoes",
    images: [
      "https://picsum.photos/seed/oxford-1/600/700",
      "https://picsum.photos/seed/oxford-2/600/700",
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    colors: SHOE_COLORS,
    description:
      "A timeless Oxford crafted from premium Nigerian leather. Full-grain upper with a Goodyear welt construction ensures durability and a refined silhouette for every occasion.",
    features: [
      "Full-grain Nigerian leather upper",
      "Goodyear welt construction",
      "Leather-lined interior",
      "Rubber outsole with leather heel",
    ],
    inStock: true,
    featured: true,
    isNew: false,
  },
  {
    id: "2",
    slug: "derby-brogues",
    name: "Derby Brogues",
    price: 42000,
    salePrice: 36000,
    category: "Shoes",
    images: [
      "https://picsum.photos/seed/derby-1/600/700",
      "https://picsum.photos/seed/derby-2/600/700",
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    colors: SHOE_COLORS,
    description:
      "Intricate brogue detailing on a classic Derby last. Hand-stitched medallion toecap and wing-tip perforations give these shoes a distinguished, old-world character.",
    features: [
      "Hand-stitched brogue detailing",
      "Derby open-lacing construction",
      "Cushioned insole",
      "Anti-slip leather sole",
    ],
    inStock: true,
    featured: false,
    isNew: false,
  },
  {
    id: "3",
    slug: "chelsea-boot",
    name: "Chelsea Boot",
    price: 55000,
    category: "Shoes",
    images: [
      "https://picsum.photos/seed/chelsea-1/600/700",
      "https://picsum.photos/seed/chelsea-2/600/700",
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    colors: SHOE_COLORS,
    description:
      "The Chelsea Boot — an icon reinterpreted in rich Nigerian leather. Elastic side panels for effortless slip-on wear, with a stacked leather heel for commanding presence.",
    features: [
      "Pull-on elastic side panels",
      "Stacked leather heel",
      "Full leather lining",
      "Durable rubber outsole",
    ],
    inStock: true,
    featured: true,
    isNew: true,
  },
  {
    id: "4",
    slug: "loafer-penny",
    name: "Penny Loafer",
    price: 38000,
    salePrice: 32000,
    category: "Shoes",
    images: [
      "https://picsum.photos/seed/loafer-1/600/700",
      "https://picsum.photos/seed/loafer-2/600/700",
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    colors: SHOE_COLORS,
    description:
      "Effortless elegance in a slip-on silhouette. The penny saddle strap and hand-burnished finish make this loafer a versatile staple from boardroom to weekend.",
    features: [
      "Hand-burnished leather finish",
      "Penny saddle strap",
      "Leather sock lining",
      "Lightweight rubber outsole",
    ],
    inStock: true,
    featured: false,
    isNew: true,
  },
  {
    id: "5",
    slug: "slide-slippers",
    name: "Slide Slippers",
    price: 18000,
    category: "Slippers",
    images: [
      "https://picsum.photos/seed/slide-1/600/700",
      "https://picsum.photos/seed/slide-2/600/700",
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    colors: SLIPPER_COLORS,
    description:
      "Premium leather slides with a wide single-band strap. Anatomically contoured footbed for all-day comfort without compromising on style.",
    features: [
      "Wide leather strap",
      "Anatomic contoured footbed",
      "Soft suede lining",
      "Non-slip rubber outsole",
    ],
    inStock: true,
    featured: true,
    isNew: false,
  },
  {
    id: "6",
    slug: "mule-slippers",
    name: "Leather Mule",
    price: 22000,
    category: "Slippers",
    images: [
      "https://picsum.photos/seed/mule-1/600/700",
      "https://picsum.photos/seed/mule-2/600/700",
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    colors: SLIPPER_COLORS,
    description:
      "A backless mule crafted from supple Nigerian leather. The low block heel adds subtle elevation while maintaining all-day comfort.",
    features: [
      "Backless slip-on design",
      "Low block heel",
      "Padded leather insole",
      "Textured rubber outsole",
    ],
    inStock: true,
    featured: false,
    isNew: false,
  },
  {
    id: "7",
    slug: "sandal-flat",
    name: "Flat Sandal",
    price: 15000,
    salePrice: 12000,
    category: "Slippers",
    images: [
      "https://picsum.photos/seed/sandal-1/600/700",
      "https://picsum.photos/seed/sandal-2/600/700",
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    colors: SLIPPER_COLORS,
    description:
      "Hand-stitched straps meet a cushioned leather footbed. Minimalist design with maximum breathability for warm-weather ease.",
    features: [
      "Hand-stitched leather straps",
      "Cushioned leather footbed",
      "Adjustable buckle closure",
      "Thin flexible outsole",
    ],
    inStock: true,
    featured: false,
    isNew: true,
  },
  {
    id: "8",
    slug: "classic-belt",
    name: "Classic Belt",
    price: 12000,
    category: "Belts",
    images: [
      "https://picsum.photos/seed/belt-classic-1/600/700",
      "https://picsum.photos/seed/belt-classic-2/600/700",
    ],
    sizes: ["S (28–32\")", "M (32–36\")", "L (36–40\")", "XL (40–44\")"],
    colors: BELT_COLORS,
    description:
      "A wardrobe essential. Cut from a single piece of full-grain leather with a polished pin-buckle hardware in antique brass.",
    features: [
      "Full-grain leather",
      "Antique brass pin-buckle",
      "3.5 cm width",
      "Available in Black, Tan, and Dark Brown",
    ],
    inStock: true,
    featured: true,
    isNew: false,
  },
  {
    id: "9",
    slug: "wide-belt",
    name: "Wide Belt",
    price: 16000,
    category: "Belts",
    images: [
      "https://picsum.photos/seed/belt-wide-1/600/700",
      "https://picsum.photos/seed/belt-wide-2/600/700",
    ],
    sizes: ["S (28–32\")", "M (32–36\")", "L (36–40\")", "XL (40–44\")"],
    colors: BELT_COLORS,
    description:
      "A statement wide belt in thick vegetable-tanned leather. Double-prong roller buckle hardware with burnished edges for a bold, confident look.",
    features: [
      "Vegetable-tanned leather",
      "Double-prong roller buckle",
      "5 cm width",
      "Hand-burnished edges",
    ],
    inStock: true,
    featured: false,
    isNew: false,
  },
  {
    id: "10",
    slug: "braided-belt",
    name: "Braided Belt",
    price: 14000,
    salePrice: 11000,
    category: "Belts",
    images: [
      "https://picsum.photos/seed/belt-braided-1/600/700",
      "https://picsum.photos/seed/belt-braided-2/600/700",
    ],
    sizes: ["S (28–32\")", "M (32–36\")", "L (36–40\")", "XL (40–44\")"],
    colors: BELT_COLORS,
    description:
      "Hand-braided leather strips woven into a textured belt. Casual yet refined — the perfect complement to chinos or a relaxed suit.",
    features: [
      "Hand-braided construction",
      "Matte silver-tone buckle",
      "3.5 cm width",
      "Flexible stretch fit",
    ],
    inStock: true,
    featured: false,
    isNew: false,
  },
  {
    id: "11",
    slug: "ankle-boot",
    name: "Ankle Boot",
    price: 62000,
    category: "Boots",
    images: [
      "https://picsum.photos/seed/boot-ankle-1/600/700",
      "https://picsum.photos/seed/boot-ankle-2/600/700",
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    colors: BOOT_COLORS,
    description:
      "A contemporary ankle boot in rugged yet refined leather. Side-zip entry, cushioned collar, and a chunky commando outsole for assured all-terrain confidence.",
    features: [
      "Side-zip entry",
      "Cushioned ankle collar",
      "Commando rubber outsole",
      "Water-resistant leather treatment",
    ],
    inStock: true,
    featured: true,
    isNew: true,
  },
  {
    id: "12",
    slug: "desert-boot",
    name: "Desert Boot",
    price: 48000,
    salePrice: 42000,
    category: "Boots",
    images: [
      "https://picsum.photos/seed/boot-desert-1/600/700",
      "https://picsum.photos/seed/boot-desert-2/600/700",
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    colors: BOOT_COLORS,
    description:
      "The Desert Boot — a heritage silhouette with a modern Cresteps finish. Unlined upper in soft suede leather with a crepe-rubber outsole for effortless everyday wear.",
    features: [
      "Soft suede leather upper",
      "Two-eyelet lace closure",
      "Crepe rubber outsole",
      "Unlined for breathability",
    ],
    inStock: true,
    featured: false,
    isNew: false,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return products;
  return products.filter((p) => p.category === category);
}

export const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
  "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo",
  "Ekiti", "Enugu", "FCT (Abuja)", "Gombe", "Imo", "Jigawa",
  "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun",
  "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

export const SHIPPING_RATE = 3000;
