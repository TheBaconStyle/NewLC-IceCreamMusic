import { sessionCookieName } from "@/config/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  const cookiesStore = cookies();

  cookiesStore.delete(sessionCookieName);

  const callbackUrl = req.nextUrl.clone();

  callbackUrl.pathname = "/signin";

  return NextResponse.redirect(callbackUrl);
};

export { handler as GET, handler as POST };
