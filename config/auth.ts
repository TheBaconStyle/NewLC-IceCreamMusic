import { TAuthUserSchema } from "@/schema/user.schema";
import { SessionOptions } from "iron-session";

export const routeTypes = ["guest", "public"] as const;

export type RouteType = (typeof routeTypes)[number];

export const routes: Record<RouteType, string[]> = {
  guest: ["/signin", "/signup", "/confirm", "/recover", "/reset"],
  public: ["/signout"],
};

export const defaultAuthRedirect = "/dashboard";

export type TSessionData =
  | (Partial<TAuthUserSchema> & {
      isLoggedIn: false;
    })
  | (TAuthUserSchema & { isLoggedIn: true });

export const sessionOptions: SessionOptions = {
  // You need to create a secret key at least 32 characters long.
  password: process.env.AUTH_SECRET!,
  cookieName: "icecream-auth",
  cookieOptions: {
    httpOnly: true,
    // Secure only works in `https` environments. So if the environment is `https`, it'll return true.
    secure: process.env.NODE_ENV === "production",
  },
  ttl: 60 * 60 * 24,
};

// export type TSessionData = {
//   user?: TAuthUserSchema;
// };

// export const defaultSessionData: TSessionData = {};

// export const defaultSessionOptions: SessionOptions = {
//   password: process.env.AUTH_SECRET!,
//   cookieName: "icecream-auth",
//   cookieOptions: {
//     httpOnly: true,
//     sameSite: "lax",
//     secure: true,
//     maxAge: 60 * 60 * 24 * 1000,
//     domain: process.env.AUTH_DOMAIN,
//   },
// };

// export function createSessionOptions(
//   opts?: Partial<SessionOptions>
// ): SessionOptions {
//   if (!opts) return defaultSessionOptions;

//   return { ...defaultSessionOptions, ...opts };
// }
