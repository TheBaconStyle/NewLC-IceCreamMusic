import classNames from "classnames";
import NewsCard from "./NewsCard/NewsCard";
import style from "./NewsList.module.css";
import INewsList from "./NewsList.props";

const NewsList = ({ className, ...props }: INewsList) => {
  //   Тут получил данные, и дальше обернуть в деталку
  return (
    <div className={classNames(style.news, className)} {...props}>
      <NewsCard
        dateCreate={
          new Date(
            "Thu Oct 31 2024 20:53:55 GMT+0200 (Восточная Европа, стандартное время)"
          )
        }
        title={"Расширение сотрудничества с Twitch"}
        anons={
          "Площадка Twitch запускает уникальную программу для диджеев. \n Программа стартует в июле текущего 2024 года. В ее рамках диджеи смогут использовать в своих живых сетах миллионы популярных треков без риска удаления. \n Система будет опознавать треки, которые играют в трансляциях и их правообладателей через систему от Audible Magic, для которой ZVONKO digital доставляет контент. \n Если диджей использует вашу музыку в своей трансляции из каталога доставленного на Audible Magic, вы получите авторские отчисления от программы Twitch."
        }
      />
    </div>
  );
};
export default NewsList;
