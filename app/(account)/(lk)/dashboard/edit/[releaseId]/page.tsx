import { getAuthSession } from "@/actions/auth";
import { db } from "@/db";
import { track } from "@/db/schema";
import { Error } from "@/entities/Error";
import { PageTransitionProvider } from "@/providers/PageTransitionProvider";
import UpdateRelease from "@/widgets/UpdateRelize/UpdateRelize";
import { sql } from "drizzle-orm";

export default async function ReleaseDraftPage({
  params,
}: {
  params: { releaseId: string };
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
      and(eq(rel.id, params.releaseId), eq(rel.authorId, user.id)),
    with: {
      tracks: {
        orderBy: sql`${track.index}`,
      },
    },
  });

  if (!release) {
    return <Error statusCode={404} />;
  }

  return (
    <PageTransitionProvider>
      <UpdateRelease release={release as any} />
      <pre>{JSON.stringify(release, null, 4)}</pre>
    </PageTransitionProvider>
  );
}
