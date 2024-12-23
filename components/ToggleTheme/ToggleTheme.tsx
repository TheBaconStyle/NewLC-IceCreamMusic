import { useContext } from "react";
import { ThemeContextSite } from "../../context/ThemeContextSite";
import style from "./ToggleTheme.module.css";

export const ToggleTheme = () => {
  const { theme, setTheme } = useContext(ThemeContextSite);
  return (
    <button
      className={style.switch}
      onClick={() => {
        if (theme === "dark") {
          setTheme("light");
        } else {
          setTheme("dark");
        }
      }}
    >
      <img
        src={
          theme === "light"
            ? "/site_assets/theme/sun.png"
            : "/site_assets/theme/moon.png"
        }
        width={20}
        height={20}
        className={theme === "dark" ? style.dark : style.light}
        alt="ThemeIcon"
      />
    </button>
  );
};
