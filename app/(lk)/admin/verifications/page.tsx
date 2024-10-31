import { isAdminUser } from "@/actions/users";
import { db } from "@/db";
import { PageTransitionProvider } from "@/providers/PageTransitionProvider";
import Admin_Verification_Card from "@/widgets/Admin_Verification_Card/Admin_Verification_Card";
import MultiTable from "@/widgets/MultiTable/MultiTable";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminVerificationPage() {
  const isAdmin = await isAdminUser();

  if (!isAdmin) {
    return redirect("/dashboard");
  }

  const data = await db.query.verification.findMany();

  return (
    <PageTransitionProvider>
      <div>Верификация</div>
      {data.map((e) => (
        <Admin_Verification_Card key={e.id} data={e} />
      ))}
      <MultiTable />
    </PageTransitionProvider>
  );
}
