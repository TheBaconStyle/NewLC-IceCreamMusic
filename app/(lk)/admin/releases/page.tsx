import { getAuthSession } from "@/actions/auth";
import { db } from "@/db";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminReleasesPage() {
  const session = await getAuthSession();

  const user = await db.query.users.findFirst({
    where: (us, { eq, and }) =>
      and(eq(us.id, session.user!.id), eq(us.isAdmin, true)),
  });

  if (!user) {
    redirect("/dashboard");
  }

  const data = await db.query.release.findMany({
    where: (rel, { eq }) => eq(rel.status, "moderating"),
  });

  return (
    <div>
      <p>
        {data.map((e) => (
          <p key={e.language}>{e.language}</p>
        ))}
      </p>
    </div>
  );
}
