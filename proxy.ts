import { NextRequest, NextResponse } from "next/server";

const HAS_CLERK = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export async function proxy(req: NextRequest) {
  if (!HAS_CLERK) return NextResponse.next();

  const { clerkMiddleware, createRouteMatcher } = await import("@clerk/nextjs/server");

  const isProtected = createRouteMatcher(["/account(.*)", "/checkout(.*)"]);
  const handler = clerkMiddleware(async (auth, request) => {
    if (isProtected(request)) await auth.protect();
  });

  return handler(req, {} as never);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
