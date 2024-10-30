import { isAdminUser } from "@/actions/users";
import { db } from "@/db";
import style from "./page.module.css";
import RelizeItem from "@/widgets/RelizeItem/RelizeItem";
import Link from "next/link";
import { redirect } from "next/navigation";
import ReleaseCategory from "./ReleaseCategory";

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
      <ReleaseCategory />
      {data.map((e) => (
        <Link
          className={style.link}
          key={e.id}
          href={`/admin/releases/${e.id}`}
        >
          <RelizeItem
            srcPreview={`${process.env.NEXT_PUBLIC_S3_URL}/previews/${e.id}.${e.preview}`}
            relizeName={e.title}
            upc={e.upc}
            labelName={e.labelName}
            genre={e.genre}
            artistsName={e.performer}
            typeRelize={e.type}
            status={e.status}
            moderatorComment={e.rejectReason}
            dateCreate={e.preorderDate}
            dateRelize={e.releaseDate}
            dateStart={e.startDate}
            id={e.id}
            confirmed={e.confirmed}
            showConfirmed={false}
          />
        </Link>
      ))}
    </div>
  );
}
