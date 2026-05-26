import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-offwhite flex">
      {/* Brand panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-nearblack flex-col justify-between px-14 py-16">
        <Link href="/" className="text-2xl font-bold tracking-widest text-white" style={{ fontFamily: "var(--font-serif)" }}>
          CRESTEPS
        </Link>
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gold mb-4">
            ✦ Handcrafted in Nigeria
          </p>
          <h2
            className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-5"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Your Account,<br />Your Craft.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed max-w-sm">
            Sign in to track your orders, manage your wishlist, and access exclusive member offers.
          </p>
        </div>
        <p className="text-xs text-gray-600">
          © 2024 Cresteps. Home of Quality Shoes.
        </p>
      </div>

      {/* Clerk panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link href="/" className="flex justify-center mb-8 lg:hidden">
            <span className="text-2xl font-bold tracking-widest text-nearblack" style={{ fontFamily: "var(--font-serif)" }}>
              CRESTEPS
            </span>
          </Link>

          <SignIn
            appearance={{
              variables: {
                colorPrimary: "#7B1010",
                colorBackground: "#FAFAF8",
                colorInputBackground: "#FFFFFF",
                colorText: "#1A1A1A",
                colorTextSecondary: "#595959",
                borderRadius: "0.75rem",
                fontFamily: "inherit",
              },
              elements: {
                rootBox: "w-full",
                card: "shadow-none border border-gray-100 rounded-2xl p-6 sm:p-8 bg-white",
                headerTitle: "font-bold text-nearblack",
                headerSubtitle: "text-muted",
                formButtonPrimary:
                  "bg-maroon hover:bg-nearblack transition-colors font-bold tracking-widest uppercase text-sm py-3.5",
                footerActionLink: "text-maroon hover:text-maroon-dark font-semibold",
                identityPreviewText: "text-nearblack",
                formFieldLabel: "text-muted font-semibold uppercase text-xs tracking-wider",
                formFieldInput: "border-gray-200 focus:border-maroon rounded-xl text-sm",
                dividerText: "text-muted",
                socialButtonsBlockButton:
                  "border-gray-200 hover:border-maroon hover:text-maroon transition-colors rounded-xl",
                socialButtonsBlockButtonText: "text-nearblack font-semibold text-sm",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
