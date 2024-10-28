import { getAuthSession } from "@/actions/auth";
import { db } from "@/db";
import { Error } from "@/entities/Error";
import { PageTransitionProvider } from "@/providers/PageTransitionProvider";
import MyText from "@/shared/MyText/MyText";
import RelizeItem from "@/widgets/RelizeItem/RelizeItem";

export default async function MainPage() {
  const session = await getAuthSession();

  if (!session) {
    return <Error statusCode={401} />;
  }

  const releasesData = await db.query.release.findMany({
    where: (release, { eq }) => eq(release.authorId, session.id),
  });

  return (
    <PageTransitionProvider>
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

      {releasesData.length === 0 && (
        <div className="wrap">
          <MyText>
            Приветсвуем вас на площадке ICECREAMMUSIC. <br />
            <br />
            ICECREAMMUSIC – это российский музыкальный лейбл и дистрибьютор,
            который активно работает на рынке страны. Лейбл был основан в 2017
            году и быстро завоевал популярность благодаря сотрудничеству с
            известными российскими музыкантами и продюсерами.
            <br />
            <br />
            ICECREAMMUSIC занимается выпуском и продвижением музыки различных
            жанров, включая поп, хип-хоп, электронную музыку и другие
            направления. Среди артистов лейбла можно найти таких исполнителей,
            как Mayotak, Miyagi & Andy Panda, Loqiemean, Клава Кока и многие
            другие.
            <br />
            <br />
            Лейбл также активно развивает свою деятельность в цифровом
            пространстве, сотрудничая с музыкальными платформами и стриминговыми
            сервисами для распространения своего контента.
          </MyText>
        </div>
      )}
    </PageTransitionProvider>
  );
}
