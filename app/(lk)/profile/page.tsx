import { getAuthSession } from "@/actions/auth";
import { db } from "@/db";
import { Error } from "@/entities/Error";
import MyText from "@/shared/MyText/MyText";
import MyTitle from "@/shared/MyTitle/MyTitle";
import RelizeItem from "@/widgets/RelizeItem/RelizeItem";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import style from "./page.module.css";
import dateFormatter from "@/utils/dateFormatter";

export default async function ProfilePage() {
  const session = await getAuthSession();

  if (!session) {
    return <Error statusCode={401} />;
  }

  const userData = await db.query.users.findFirst({
    where: (us, { eq }) => eq(us.id, session.id),
    with: {
      releases: { limit: 3, orderBy: (rel, { desc }) => desc(rel.startDate) },
    },
  });

  if (!userData) {
    return <Error statusCode={404} />;
  }

  return (
    <div className={style.profile}>
      <div className={classNames("row", "gap50")}>
        <div className={classNames("col", "gap30")}>
          <Image
            src={
              userData?.avatar
                ? `${process.env.NEXT_PUBLIC_S3_URL!}/avatars/${userData!.id}.${
                    userData!.avatar
                  }`
                : "/assets/noAvatar.png"
            }
            alt={"Avatar"}
            width={250}
            height={250}
            className="rounded"
            unoptimized
          />
          <Link href={"/profile/edit/"} className="linkButton">
            Редактировать
          </Link>
        </div>
        <div>
          <MyTitle Tag={"h2"} className="fs36">
            {userData?.name}
          </MyTitle>
          <MyText className="fs20">
            {userData?.isAdmin ? "Администратор" : "Пользователь"}
          </MyText>

          <div>
            <MyTitle Tag={"h3"} className="mt30">
              Мои соцсети
            </MyTitle>
            <ul className={classNames("mt10", "ml20", "col", "gap5")}>
              {userData.telegram && <li>{userData.telegram}</li>}
              {userData.vk && <li>{userData.vk}</li>}
              {userData.whatsapp && <li>{userData.whatsapp}</li>}
              {userData.viber && <li>{userData.viber}</li>}
            </ul>
          </div>
          <div>
            <MyTitle Tag={"h3"} className="mt30">
              Дополнительная информация
            </MyTitle>
            <div className={classNames("col", "gap5", "mt10")}>
              {userData.birthDate && (
                <MyText>
                  Дата рождения: {dateFormatter(userData.birthDate)}
                </MyText>
              )}
              {userData.country && <MyText>Страна: {userData.country}</MyText>}
              {userData.label && <MyText>Лейбл: {userData.label}</MyText>}
              {userData.personalSiteUrl && (
                <MyText>Личный сайт: {userData.personalSiteUrl}</MyText>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={classNames(style.myRelizes, "w100")}>
        <MyTitle Tag={"h3"} className="mb20">
          Мои релизы
        </MyTitle>
        <div className="col gap20">
          {userData?.releases.map((release) => {
            return (
              <RelizeItem
                key={release.id}
                srcPreview={`${process.env.NEXT_PUBLIC_S3_URL}/previews/${release.id}.${release.preview}`}
                relizeName={release.title}
                upc={release.upc}
                labelName={release.labelName}
                genre={release.genre}
                artistsName={release.performer}
                typeRelize={release.type}
                status={release.status}
                moderatorComment={release.rejectReason}
                dateCreate={release.preorderDate}
                dateRelize={release.releaseDate}
                dateStart={release.startDate}
                id={release.id}
                confirmed={release.confirmed}
                showConfirmed={true}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
