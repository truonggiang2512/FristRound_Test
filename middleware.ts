import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { logger } from "@/lib/utils/logger"

export function middleware(request: NextRequest) {
  // Log all requests
  logger.info(`${request.method} ${request.url}`, {
    userAgent: request.headers.get("user-agent"),
    ip: request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown",
  })

  // CORS headers for API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const response = NextResponse.next()

    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")

    // Handle preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 200, headers: response.headers })
    }

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
