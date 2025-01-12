import { getAuthSession } from "@/actions/auth";
import { PageTransitionProvider } from "@/providers/PageTransitionProvider";
import { Error } from "@/entities/Error";
import { db } from "@/db";

export default async function ReleaseDraftPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getAuthSession();

  if (!session) {
    return <Error statusCode={401} />;
  }

  const user = await db.query.users.findFirst({
    where: (us, { eq, and }) =>
      and(eq(us.id, session.id), eq(us.isVerifiedAuthor, true)),
  });

  if (!user) {
    return <Error statusCode={404} />;
  }

  const release = await db.query.release.findFirst({
    where: (rel, { eq, and }) =>
      and(eq(rel.id, params.id), eq(rel.authorId, user.id)),
    with: { tracks: true },
  });

  if (!release) {
    return <Error statusCode={404} />;
  }

  return (
    <PageTransitionProvider>
      <pre>{JSON.stringify(release, null, 4)}</pre>
    </PageTransitionProvider>
  );
}
