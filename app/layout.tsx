import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CartDrawer from "@/components/CartDrawer";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Cresteps — Premium Leather Footwear",
  description:
    "Shop premium handcrafted leather footwear, boots, slippers, and belts made in Nigeria. Free shipping on orders above ₦50,000.",
};

async function MaybeClerkProvider({ children }: { children: React.ReactNode }) {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!key) return <>{children}</>;

  const { ClerkProvider } = await import("@clerk/nextjs");
  return (
    <ClerkProvider
      afterSignOutUrl="/"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      {children}
    </ClerkProvider>
  );
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MaybeClerkProvider>
      <html
        lang="en"
        className={`${playfair.variable} ${inter.variable}`}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <body className="min-h-screen flex flex-col bg-offwhite text-nearblack antialiased">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <CartDrawer />
        </body>
      </html>
    </MaybeClerkProvider>
  );
}
