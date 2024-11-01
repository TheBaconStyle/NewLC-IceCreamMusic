import { sessionCookieName } from "@/config/auth";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  const res = NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_DOMAIN}/signin`,
    { headers: req.headers }
  );

  res.cookies.set(sessionCookieName, "");

  return res;
};

export { handler as GET, handler as POST };
