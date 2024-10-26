import { getAuthSession } from "@/actions/auth";
import { db } from "@/db";
import { ProfileEdit } from "@/widgets/ProfileEdit/ProfileEdit";

export default async function EditProfilePage() {
  const session = await getAuthSession();

  const userData = await db.query.users.findFirst({
    where: (us, { eq }) => eq(us.id, session.user!.id),
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
