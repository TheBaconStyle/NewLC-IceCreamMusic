import { getAuthSession } from "@/actions/auth";
import { db } from "db";
import { PageTransitionProvider } from "@/providers/PageTransitionProvider";
import SendRelease from "@/widgets/ui/SendRelize/SendRelease";
import Link from "next/link";
import { Error } from "@/entities/ui/Error";

export default async function CatalogPage() {
  const session = await getAuthSession();

  if (!session) {
    return <Error statusCode={401} />;
  }

  const user = await db.query.users.findFirst({
    where: (us, { eq, and }) =>
      and(eq(us.id, session.id), eq(us.isVerifiedAuthor, true)),
  });

  return (
    <PageTransitionProvider>
      <div>
        {user && <SendRelease />}
        {!user && (
          <div>
            Для того, чтобы начать работать с релизами необходимо пройти{" "}
            <Link href="/instruments/license">верификацию</Link>
          </div>
        )}
      </div>
    </PageTransitionProvider>
  );
}
