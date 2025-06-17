import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    console.log("Middleware executado para:", req.nextUrl.pathname)
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        if (pathname.startsWith("/auth")) {
          return true
        }

        if (pathname.startsWith("/admin")) {
          return !!token
        }

        return true
      },
    },
  },
)

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
