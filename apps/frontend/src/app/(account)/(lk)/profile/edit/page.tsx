import { getAuthSession } from "@/actions/auth";
import { db } from "db";
import { ProfileEdit } from "@/widgets/ui/ProfileEdit/ProfileEdit";
import { Error } from "@/entities/ui/Error";

export const dynamic = "force-dynamic";

export default async function EditProfilePage() {
  const session = await getAuthSession();

  if (!session) {
    return <Error statusCode={401} />;
  }

  const userData = await db.query.users.findFirst({
    where: (us, { eq }) => eq(us.id, session.id),
    columns: {
      birthDate: true,
      name: true,
      country: true,
      telegram: true,
      whatsapp: true,
      vk: true,
      viber: true,
      label: true,
      personalSiteUrl: true,
    },
  });

  return <ProfileEdit {...userData} />;
}
