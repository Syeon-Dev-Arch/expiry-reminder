import { NextResponse } from "next/server";

export function proxy(request) {
  const path = request.nextUrl.pathname;

  const publicPaths = path === "/login" || path === "/signup";
  const token = request.cookies.get("token")?.value || "";

  if (publicPaths && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  if (!publicPaths && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/login", "/signup", "/dashboard"],
};
