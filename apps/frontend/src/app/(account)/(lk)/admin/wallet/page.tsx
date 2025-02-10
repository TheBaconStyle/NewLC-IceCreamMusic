import { isAdminUser } from "@/actions/users";
import { db } from "db";
import WalletEntitie from "@/entities/ui/WalletEntitie/WalletEntitie";
import { redirect } from "next/navigation";
import { WalletSearch } from "./WalletSearch";
import { release, users } from "db/schema";
import { eq } from "drizzle-orm";

export default async function AdminWalletPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const isAdmin = await isAdminUser();

  if (!isAdmin) {
    return redirect("/dashboard");
  }

  const data = await db
    .selectDistinctOn([users.id], {
      id: users.id,
      avatar: users.avatar,
      name: users.name,
      telegram: users.telegram,
      whatsapp: users.whatsapp,
      viber: users.viber,
      email: users.email,
    })
    .from(users)
    .innerJoin(release, eq(users.id, release.authorId))
    .where(eq(release.upc, searchParams.search));

  return (
    <div>
      <WalletSearch />
      <div className="col gap10">
        {data.map((ud) => (
          <WalletEntitie
            key={ud.id}
            id={ud.id}
            avatar={ud.avatar}
            name={ud.name}
            telegram={ud.telegram}
            whatsapp={ud.whatsapp}
            viber={ud.viber}
            vk={ud.viber}
            email={ud.email}
          />
        ))}
      </div>
    </div>
  );
}
