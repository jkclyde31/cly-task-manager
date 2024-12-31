// middleware.ts
import { NextResponse } from "next/server"
import { auth } from "@/auth"  // Make sure you have this auth.ts/js file set up

export default auth((req) => {
  // If the user is not authenticated or doesn't have required role
  if (!req.auth) {
    // Redirect to login page
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Optional: Check for admin role
  if (!req.auth?.user?.role || req.auth.user.role !== "admin") {
    // Redirect to unauthorized page
    return NextResponse.redirect(new URL("/unauthorized", req.url))
  }

  return NextResponse.next()
})

// Using more specific matcher patterns for Next.js 14
export const config = {
  matcher: [
    // Match all paths under /admin and /add
    "/admin/:path*",
    "/add/:path*",
    // Optional: Exclude specific paths
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ]
}
