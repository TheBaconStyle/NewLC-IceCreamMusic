import { isAdminUser } from "@/actions/users";
import { db } from "@/db";
import WalletEntitie from "@/entities/WalletEntitie/WalletEntitie";
import MyButton from "@/shared/MyButton/MyButton";
import MyInput from "@/shared/MyInput/MyInput";
import { redirect } from "next/navigation";
import { use } from "react";

export default async function AdminWalletPage() {
  const isAdmin = await isAdminUser();

  if (!isAdmin) {
    return redirect("/dashboard");
  }

  const data = await db.query.users.findMany();

  return (
    <div>
      <div className="row mb20">
        <MyInput className="mb0" label={"Поиск"} type={"text"} inpLk />
        <MyButton text={"Поиск"} view={"secondary"} />
      </div>
      <div className="col gap10">
        {data.map((user) => (
          <WalletEntitie
            key={user.id}
            id={user.id}
            avatar={user.avatar}
            name={user.name}
            telegram={user.telegram}
            whatsapp={user.whatsapp}
            viber={user.viber}
            vk={user.viber}
          />
        ))}
      </div>
    </div>
  );
}
