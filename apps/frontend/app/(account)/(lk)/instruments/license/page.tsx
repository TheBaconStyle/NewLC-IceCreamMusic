import { getAuthSession } from "@/actions/auth";
import { db } from "@/db";
import { Error } from "@/entities/ui/Error";
import LicenseeCard from "@/entities/ui/LicenseeCard/LicenseeCard";
import { PageTransitionProvider } from "@/providers/PageTransitionProvider";
import MyText from "@/shared/ui/MyText/MyText";
import MyTitle from "@/shared/ui/MyTitle/MyTitle";
import VerificationForm from "@/widgets/ui/VerificationForm/VerificationForm";
import classNames from "classnames";
import PassportIcon from "../../../../../public/License/Passport.svg";
import style from "./page.module.css";

export const dynamic = "force-dynamic";

export default async function VerificationPage() {
  const session = await getAuthSession();

  if (!session) {
    return <Error statusCode={401} />;
  }

  const user = await db.query.users.findFirst({
    where: (us, { eq, and }) =>
      and(eq(us.id, session.id), eq(us.isVerifiedAuthor, true)),
  });

  const ticketOnModeration = await db.query.verification.findFirst({
    where: (ver, { eq, and }) =>
      and(eq(ver.userId, session.id), eq(ver.status, "moderating")),
  });

  return (
    <PageTransitionProvider>
      {!user && !ticketOnModeration && (
        <>
          <LicenseeCard
            view="big"
            icon={
              <PassportIcon
                style={{ width: "30%", height: "112px" }}
                className={classNames(style.big, style.iconL)}
              />
            }
            title="Почему нам нужны паспортные данные?"
            desc="Когда вы вместе с нами выпускаете свою музыку, мы должны быть уверены, что работаем с правильным человеком. Ваши паспортные данные - это своеобразный идентификатор, который помогает нам установить вашу личность и удостовериться, что вы действительно тот человек, кем себя представляете. Запрос паспортных данных - это стандартная практика в нашей отрасли, которая помогает предотвратить мошенничество и защитить наших пользователей, включая вас. Мы хотим убедиться, что музыка представляется законно и в соответствии с правилами."
          />

          <VerificationForm />
        </>
      )}

      {!user && ticketOnModeration && (
        <div className={"col gap20"}>
          <MyTitle Tag={"h3"}>Ваш тикет находится на модерации</MyTitle>
          <MyText>
            Ваш тикет находится на модерации. Мы понимаем, что в ожидании
            решения от команды модераторов может возникнуть волнение и
            беспокойство. Ваш запрос проходит тщательную проверку, и мы
            прилагаем все усилия, чтобы обработать его как можно быстрее. Каждый
            тикет рассматривается с учетом всех деталей, предоставленных вами,
            чтобы обеспечить справедливый и обоснованный ответ.
          </MyText>
          <MyText>
            Во время модерации ваша информация остается в безопасности, и мы
            рекомендуем не дублировать запрос, чтобы не создать лишнюю нагрузку
            на систему. Если у вас возникнут дополнительные вопросы или
            потребуется уточнение, мы всегда готовы помочь через наши
            официальные каналы связи.{" "}
          </MyText>
          <MyText>
            Благодарим вас за терпение и понимание в этот период. Мы ценим ваше
            участие и уверены, что все необходимые шаги для разрешения вашей
            ситуации будут предприняты. Как только процесс модерации завершится,
            вы получите уведомление о дальнейших действиях. Ваше удовлетворение
            нашим сервисом — наш главный приоритет, и мы работаем над тем, чтобы
            каждый ваш опыт был положительным и комфортным.
          </MyText>
        </div>
      )}

      {user && <div>Вы прошли верификацию!</div>}
    </PageTransitionProvider>
  );
}
