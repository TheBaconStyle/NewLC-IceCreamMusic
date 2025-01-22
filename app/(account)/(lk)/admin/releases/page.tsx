import { isAdminUser } from "@/actions/users";
import { db } from "@/db";
import style from "./page.module.css";
import ReleaseItem from "@/widgets/RelizeItem/RelizeItem";
import Link from "next/link";
import { redirect } from "next/navigation";
import ModerationFilter from "../ModerationFilter";

export const dynamic = "force-dynamic";

export default async function AdminReleasesPage({
  searchParams,
}: {
  searchParams: { status: string };
}) {
  const isAdmin = await isAdminUser();

  if (!isAdmin) {
    return redirect("/dashboard");
  }

  const data = await db.query.release.findMany({
    where: (rel, { eq }) => eq(rel.status, searchParams.status as any),

    with: { tracks: true },
  });

  return (
    <div>
      <ModerationFilter />
      {data.map((e) => (
        <Link
          className={style.link}
          key={e.id}
          href={`/admin/releases/${e.id}`}
        >
          <ReleaseItem release={e} />
        </Link>
      ))}
    </div>
  );
}
