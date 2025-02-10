import EditNewTrack from "@/widgets/ui/UpdateRelize/EditNewTrack/EditNewTrack";
import { Error } from "@/entities/ui/Error";
import { getAuthSession } from "@/actions/auth";
import { db } from "db";
import { sql } from "drizzle-orm";
import { track } from "db/schema";

export default async function NewTrack({
  params,
}: {
  params: Promise<{ releaseId: string }>;
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
    return <Error statusCode={401} />;
  }

  const pageParams = await params;

  const release = await db.query.release.findFirst({
    where: (rel, { eq, and }) =>
      and(eq(rel.id, pageParams.releaseId), eq(rel.authorId, user.id)),
    with: {
      tracks: {
        orderBy: sql`${track.index}`,
      },
    },
  });

  if (!release) {
    return <Error statusCode={404} />;
  }

  return <EditNewTrack releaseId={release.id} />;
}
