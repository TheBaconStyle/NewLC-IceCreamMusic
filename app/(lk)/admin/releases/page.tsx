import { isAdminUser } from "@/actions/users";
import { db } from "@/db";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminReleasesPage() {
  const isAdmin = await isAdminUser();

  if (!isAdmin) {
    return redirect("/dashboard");
  }

  const data = await db.query.release.findMany({
    where: (rel, { eq }) => eq(rel.status, "moderating"),
  });

  return (
    <div>
      <div>
        {data.map((e) => (
          <div key={e.id}>{e.language}</div>
        ))}
      </div>
    </div>
  );
}
