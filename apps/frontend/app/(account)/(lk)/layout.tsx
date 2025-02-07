import { getAuthSession } from "@/actions/auth";
import { isAdminUser } from "@/actions/users";
import BreadCrumbs from "@/entities/ui/BreadCrumbs/BreadCrumbs";
import { Error } from "@/entities/ui/Error";
import Header from "@/entities/ui/Header/Header";
import Sidebar from "@/entities/ui/Sidebar/Sidebar";
import { open } from "@/fonts";
import { SidebarContextProvider } from "@/providers/SidebarContext";
import AppThemeProvider from "@/providers/ThemeContext";
import classNames from "classnames";
import { cookies } from "next/headers";
import { PropsWithChildren } from "react";
import style from "./layout.module.css";
import { AudioPlayerProvider } from "@/providers/AudioPlayerContext";
import { AudioPlayer } from "@/widgets/ui/AudioPlayer/AudioPlayer";

export default async function CabinetLayout({ children }: PropsWithChildren) {
  const theme = cookies().get("__theme__")?.value || "system";

  const session = await getAuthSession();

  if (!session) {
    return <Error statusCode={401} />;
  }

  const isAdmin = await isAdminUser();

  return (
    <AppThemeProvider attribute="data-theme" defaultTheme={theme}>
      <SidebarContextProvider>
        <AudioPlayerProvider>
          <main className={classNames(style.main, open.className)}>
            <div className={style.row}>
              <Sidebar isAdmin={isAdmin} />
              <div className={style.col}>
                <Header
                  userid={session!.id}
                  username={session!.name}
                  avatar={session!.avatar}
                />
                <div className={style.content}>
                  <BreadCrumbs home="Панель управления" />
                  {children}
                </div>
              </div>
            </div>
          </main>
        </AudioPlayerProvider>
      </SidebarContextProvider>
    </AppThemeProvider>
  );
}
