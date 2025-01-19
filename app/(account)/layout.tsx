import { rubik } from "@/fonts";
import { NotificationProvider } from "@/providers/NotificationProvider";
import Script from "next/script";
import { PropsWithChildren, Suspense } from "react";
import "./globals.css";
import Loading from "./loading";
import "./static.css";

export const metadata = {
  title: "ICECREAMMUSIC",
  description:
    "Ведущий музыкальный сервис дистрибуции музыки для артистов любого жанра и уровня.",
};

export default async function RootLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <Script src="https://yookassa.ru/payouts-data/3.1.0/widget.js" />
      <body className={rubik.className}>
        <NotificationProvider>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </NotificationProvider>
      </body>
    </html>
  );
}
