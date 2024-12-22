"use client";
import style from "./CardStore.module.css";
import IStore from "../../../data/site/Stores/Stores.interface";
import { motion } from "framer-motion";
import { useContext } from "react";
import { ThemeContextSite } from "../../../context/ThemeContextSite";
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
