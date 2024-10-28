import { sessionCookieName } from "@/config/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

const handler = async (_: NextRequest) => {
  const cookiesStore = cookies();

  cookiesStore.delete(sessionCookieName);

  redirect("/signin");
};

export { handler as GET, handler as POST };
