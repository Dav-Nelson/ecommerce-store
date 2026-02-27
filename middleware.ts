import { auth } from "./src/auth";

export default auth((req) => {
  // Middleware runs on every request
  // We can protect routes here later, e.g.:
  // if (req.nextUrl.pathname.startsWith("/admin")) {
  //   const session = req.auth;
  //   if (!session?.user) return Response.redirect(new URL("/auth/signin", req.url));
  // }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],  // Run on all pages except static/API
};