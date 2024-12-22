import IHowItWorks from "@/helpers/site/HowItWorks/HowItWorks.interface";
import style from "./HowItWorksItem.module.css";

export const HowItWorksItem = ({
  altIcon,
  description,
  icon,
  title,
}: IHowItWorks) => {
  return (
    <div className={style.item}>
      <img
        className={style.icon}
        src={icon}
        alt={altIcon}
        width={30}
        height={30}
      />
      <h3 className={style.title}>{title}</h3>
      <p className={style.description}>{description}</p>
    </div>
  );
};
