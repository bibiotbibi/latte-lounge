import { NextResponse } from 'next/server'

// Middleware function - currently allows all requests through
// Items page is publicly accessible, no authentication required
export function middleware(request) {
  // Allow all requests to pass through
  // You can add custom logic here if needed in the future
  return NextResponse.next()
}

// Configure which paths this middleware runs on
export const config = {
  // Currently no paths are protected, but you can add them here if needed
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}