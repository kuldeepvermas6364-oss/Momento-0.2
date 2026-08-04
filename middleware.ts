import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/login", "/signup", "/forgot-password"];
const AUTH_ROUTES = ["/login", "/signup", "/forgot-password"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isPublicRoute = PUBLIC_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + "/")
  );
  const isAuthRoute = AUTH_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + "/")
  );

  // Check for Firebase auth cookie (session persistence)
  // Firebase stores auth state in localStorage by default, but for SSR
  // we check for the presence of any auth-related cookie.
  // The client-side AuthContext handles the actual redirect for
  // unauthenticated users on protected pages.
  const hasAuthCookie = request.cookies.has("momento_auth") ||
    request.cookies.has("__session") ||
    request.cookies.has("firebase:authUser");

  // Allow public routes through
  if (isPublicRoute) {
    // If authenticated and on auth page, redirect to home
    if (hasAuthCookie && isAuthRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // For protected routes, let the client-side AuthContext handle redirect
  // Middleware can't verify Firebase ID tokens without Admin SDK
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
