import { getFullUrl } from "@/actions/url";
import CanvasThree from "@/entities/CanvasThree/CanvasThree";
import style from "./layout.module.css";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUrl = await getFullUrl();

  return (
    <main className={style.main}>
      <div className={style.view}>
        <CanvasThree />
      </div>
      <div className={style.form}>{children}</div>
    </main>
  );
}
