import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getPathname } from "./actions/url";
import {
  defaultAdminRedirect,
  defaultAuthRedirect,
  routes,
  sessionCookieName,
} from "./config/auth";
import { verifyJWT } from "./utils/token";

export const middleware = async function (request: NextRequest) {
  const { nextUrl } = request;

  request.headers.set("x-url", nextUrl.href);
  request.headers.set("x-ip", request.ip!);

  const cookiesStore = cookies();

  let isAuthenticated = false;

  let isAdmin = false;

  const encryptedToken = cookiesStore.get(sessionCookieName) ?? null;

  if (encryptedToken) {
    const session = await verifyJWT(encryptedToken.value).catch(() => null);

    isAuthenticated = !!session;

    isAdmin = !!session?.isAdmin;
  }

  const pathname = await getPathname();

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
