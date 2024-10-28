import { TAuthUserSchema } from "@/schema/user.schema";
import { SessionOptions } from "iron-session";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const routeTypes = ["guest", "public"] as const;

export type RouteType = (typeof routeTypes)[number];

export const routes: Record<RouteType, string[]> = {
  guest: ["/signin", "/signup", "/confirm", "/recover", "/reset"],
  public: ["/signout"],
};

export const defaultAuthRedirect = "/dashboard";

export type TSessionData = TAuthUserSchema;

// export const sessionOptions: SessionOptions = {
//   // You need to create a secret key at least 32 characters long.
//   password: process.env.AUTH_SECRET!,
//   cookieName: "icecream-auth",
//   cookieOptions: {
//     httpOnly: true,
//     // Secure only works in `https` environments. So if the environment is `https`, it'll return true.
//     secure: process.env.NODE_ENV === "production",
//   },
//   ttl: 60 * 60 * 24,
// };

// export type TSessionData = {
//   user?: TAuthUserSchema;
// };

// export const defaultSessionData: TSessionData = {};

// process.env.AUTH_SECRET!,

export const sessionCookieName = "icecream-auth";

export const sessionCookieOptions: Required<
  Omit<
    ResponseCookie,
    "value" | "partitioned" | "priority" | "expires" | "name" | "maxAge"
  >
> = {
  httpOnly: true,
  sameSite: "lax",
  secure: true,
  domain: process.env.AUTH_DOMAIN!,
  path: "/",
};

export type Required<T = {}> = {
  [K in keyof T]-?: T[K];
};

// export function createSessionOptions(
//   opts?: Partial<SessionOptions>
// ): SessionOptions {
//   if (!opts) return defaultSessionOptions;

//   return { ...defaultSessionOptions, ...opts };
// }
