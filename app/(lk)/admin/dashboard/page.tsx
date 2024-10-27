import StatisticBlock from "@/entities/AdminEntities/StatisticBlock/StatisticBlock";
import { PageTransitionProvider } from "@/providers/PageTransitionProvider";
import style from "./page.module.css";
import { getAuthSession } from "@/actions/auth";
import { db } from "@/db";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function adminDashboardPage() {
  const session = await getAuthSession();

  const user = await db.query.users.findFirst({
    where: (us, { eq, and }) =>
      and(eq(us.id, session.user!.id), eq(us.isAdmin, true)),
  });

  if (!user) {
    redirect("/dashboard");
  }

  return (
    <PageTransitionProvider>
      <div>Админ панель</div>
      <div className={style.rowStatistic}>
        <StatisticBlock Meaning={32} Difference={30} />
        <StatisticBlock Meaning={-32} Difference={-30} />{" "}
        <StatisticBlock Meaning={32} Difference={30} />
        <StatisticBlock Meaning={-32} Difference={-30} />
      </div>
    </PageTransitionProvider>
  );
}
