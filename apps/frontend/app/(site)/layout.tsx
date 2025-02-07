"use client";

import "./globals.css";

import { ThemeContextSiteProvider } from "../../context/ThemeContextSite";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeContextSiteProvider>{children}</ThemeContextSiteProvider>
    </html>
  );
}
