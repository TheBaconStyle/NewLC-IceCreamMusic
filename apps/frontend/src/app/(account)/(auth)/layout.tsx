import CanvasThree from "@/entities/CanvasThree/CanvasThree";
import style from "./layout.module.css";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={style.main}>
      <div className={style.view}>
        <CanvasThree />
      </div>
      <div className={style.form}>{children}</div>
    </main>
  );
}
