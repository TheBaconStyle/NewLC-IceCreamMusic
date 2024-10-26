import { getAuthSession } from "@/actions/auth";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  const session = await getAuthSession();

  session.destroy();

  const callbackUrl = req.nextUrl.clone();

  callbackUrl.pathname = "/signin";

  return NextResponse.redirect(callbackUrl);
};

export { handler as GET, handler as POST };
