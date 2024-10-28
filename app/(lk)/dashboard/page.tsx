import { getAuthSession } from "@/actions/auth";
import { db } from "@/db";
import { PageTransitionProvider } from "@/providers/PageTransitionProvider";
import MyText from "@/shared/MyText/MyText";
import RelizeItem from "@/widgets/RelizeItem/RelizeItem";
import { resolve } from "path";

export default async function MainPage() {
  const session = await getAuthSession();

  // if (!session || !session.user) {
  //   return <Error statusCode={404} />;
  // }

  const releasesData = await db.query.release.findMany({
    where: (release, { eq }) => eq(release.authorId, session.user!.id),
  });

  return (
    <PageTransitionProvider>
      <div className="col gap20">
        {releasesData.map((release) => {
          return (
            <RelizeItem
              key={release.id}
              srcPreview="/assets/avatar.jpg"
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
            />
          );
        })}
      </div>

      {releasesData.length === 0 && (
        <div className="wrap">
          <MyText>
            Приветсвуем вас на площадке ICECREAMMUSIC. <br />
            <br />
            ICECREAMMUSIC – это российский музыкальный сервис дистрибуции,
            который активно работает на рынке страны. Мы были основаны в 2017
            году и быстро завоевал популярность благодаря сотрудничеству с
            известными российскими музыкантами и продюсерами.
            <br />
            <br />
            ICECREAMMUSIC занимается выпуском и продвижением музыки различных
            жанров, включая поп, хип-хоп, электронную музыку и другие
            направления.
            <br />
            <br />
            Мы также активно развиваем свою деятельность в цифровом
            пространстве, сотрудничая с музыкальными платформами и стриминговыми
            сервисами для распространения вашего контента.
          </MyText>
        </div>
      )}
    </PageTransitionProvider>
  );
}
