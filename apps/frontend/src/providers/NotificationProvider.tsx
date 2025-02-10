"use client";

import { SnackbarProvider } from "notistack";
import { PropsWithChildren } from "react";

export function NotificationProvider({ children }: PropsWithChildren) {
  return (
    <SnackbarProvider
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {children}
    </SnackbarProvider>
  );
}
