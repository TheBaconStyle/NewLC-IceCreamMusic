"use client";
import style from "./CardStore.module.css";

import { motion } from "framer-motion";
import { useContext } from "react";
import { ThemeContextSite } from "@/providers/ThemeContextSite";
import IStore from "@/shared/helpers/site/Stores/Stores.interface";
export const CardStore = ({ image, alt, alternativeImage }: IStore) => {
  const { theme } = useContext(ThemeContextSite);

  return (
    <motion.div className={style.card}>
      <img
        className={style.image}
        alt={alt}
        src={theme == "dark" ? image : alternativeImage}
        width={225}
        height={80}
      />
    </motion.div>
  );
};
