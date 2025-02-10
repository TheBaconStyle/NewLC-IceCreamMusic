import { isAdminUser } from "@/actions/users";
import { db } from "db";
import style from "./page.module.css";
import ReleaseItem from "@/widgets/ui/RelizeItem/RelizeItem";
import Link from "next/link";
import { redirect } from "next/navigation";
import ModerationFilter from "../ModerationFilter";
import classNames from "classnames";

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
      <div className="col gap20">
        {data.map((e) => (
          <div key={e.id} className="col gap10 relative">
            <Link
              className={classNames("linkButton wfit absolute", {
                [style.position3]: isAdmin,
                [style.position2]: e.confirmed,
              })}
              href={`/admin/releases/${e.id}`}
            >
              Подробнее
            </Link>
            <div>
              <ReleaseItem
                release={e}
                s3_url={process.env.NEXT_PUBLIC_S3_URL!}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
