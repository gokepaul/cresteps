export type Category = "Shoes" | "Slippers" | "Belts" | "Boots";

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  salePrice?: number;
  category: Category;
  images: string[];
  sizes: string[];
  description: string;
  features: string[];
  inStock: boolean;
  featured: boolean;
  isNew?: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
  size: string;
};

export type ShippingInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
};

export type Order = {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: "pending" | "paid" | "shipped" | "delivered";
  shippingInfo: ShippingInfo;
  reference: string;
  createdAt: string;
};
