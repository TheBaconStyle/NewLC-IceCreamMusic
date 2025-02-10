import { isAdminUser } from "@/actions/users";
import StatisticBlock from "@/entities/ui/AdminEntities/StatisticBlock/StatisticBlock";
import { PageTransitionProvider } from "@/providers/PageTransitionProvider";
import { redirect } from "next/navigation";
import style from "./page.module.css";

export const dynamic = "force-dynamic";

export default async function adminDashboardPage() {
  const isAdmin = await isAdminUser();

  if (!isAdmin) {
    return redirect("/dashboard");
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
