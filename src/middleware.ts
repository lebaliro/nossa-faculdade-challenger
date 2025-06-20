import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

const protectedPaths = [
  "/admin",
  "/courses/create",
  "/courses/update"
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path))
  if (!isProtected) {
    return NextResponse.next()
  }

  const token = await getToken({ req: request })
  if (!token) {
    const loginUrl = new URL("/auth/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/courses/create",
    "/courses/update/:path*"
  ]
}
