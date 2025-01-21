"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

type TPageTransitionProvider = { className?: string };

export function PageTransitionProvider({
  children,
  className,
}: Readonly<PropsWithChildren<TPageTransitionProvider>>) {
  const pathname = usePathname();

  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}
