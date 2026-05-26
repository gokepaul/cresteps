"use client";

import { useAuth, UserButton, SignInButton } from "@clerk/nextjs";

export default function NavbarAuthSection({ atTop }: { atTop: boolean }) {
  const { isSignedIn } = useAuth();

  return isSignedIn ? (
    <UserButton />
  ) : (
    <SignInButton mode="modal">
      <button
        className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
          atTop ? "text-white hover:bg-white/10" : "text-nearblack hover:bg-gray-100"
        }`}
        aria-label="Sign in"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-[18px] h-[18px]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      </button>
    </SignInButton>
  );
}
