import LicenseeCard from "@/entities/LicenseeCard/LicenseeCard";
import { PageTransitionProvider } from "@/providers/PageTransitionProvider";
import VerificationForm from "@/widgets/VerificationForm/VerificationForm";
import classNames from "classnames";
import BlockIcon from "../../../../public/License/Block.svg";
import DPA from "../../../../public/License/DPA.svg";
import GDPR from "../../../../public/License/GDPR.svg";
import PassportIcon from "../../../../public/License/Passport.svg";
import style from "./page.module.css";
import { db } from "@/db";
import { getAuthSession } from "@/actions/auth";
import { Error } from "@/entities/Error";

export default async function VerificationPage() {
  const session = await getAuthSession();

  if (!session) {
    return <Error statusCode={401} />;
  }

  const user = await db.query.users.findFirst({
    where: (us, { eq, and }) =>
      and(eq(us.id, session.id), eq(us.isVerifiedAuthor, true)),
  });

  return (
    <PageTransitionProvider>
      {!user && (
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
      {user && <div>Вы прошли верификацию!</div>}
    </PageTransitionProvider>
  );
}
