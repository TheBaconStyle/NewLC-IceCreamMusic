import { NextRequest, NextResponse } from "next/server";
import {
  defaultAdminRedirect,
  defaultAuthRedirect,
  routes,
  sessionCookieName,
} from "@/shared/config/auth";
import { verifyJWT } from "@/shared/utils/token";

export const middleware = async function (request: NextRequest) {
  const { nextUrl } = request;

  request.headers.set("x-url", nextUrl.href);

  let isAuthenticated = false;

  let isAdmin = false;

  const encryptedToken = request.cookies.get(sessionCookieName) ?? null;

  if (encryptedToken) {
    const session = await verifyJWT(encryptedToken.value).catch(() => null);

    isAuthenticated = !!session;

    isAdmin = !!session?.isAdmin;
  }

  const pathname = nextUrl.pathname;

  const isGuestRoute = routes.guest.some((r) => pathname.includes(r));

  const isPublicRoute = routes.public.some((r) => pathname.includes(r));

  if (isAuthenticated && isGuestRoute) {
    const defaultRedirectUrl = nextUrl.clone();

    defaultRedirectUrl.pathname = defaultAuthRedirect;

    if (isAdmin) {
      defaultRedirectUrl.pathname = defaultAdminRedirect;
    }

    return NextResponse.redirect(defaultRedirectUrl, {
      headers: request.headers,
    });
  }

  if (!isGuestRoute && !isPublicRoute && !isAuthenticated) {
    const signInUrl = nextUrl.clone();

    signInUrl.pathname = "/signin";

    return NextResponse.redirect(signInUrl, { headers: request.headers });
  }

  return NextResponse.next({ request });
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|models|assets).*)"],
};
