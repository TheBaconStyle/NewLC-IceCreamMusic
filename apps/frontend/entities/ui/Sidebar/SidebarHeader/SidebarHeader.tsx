"use client";

import Logo from "@/shared/ui/Logo/Logo";
import MyTitle from "@/shared/ui/MyTitle/MyTitle";
import MyText from "@/shared/ui/MyText/MyText";

const SidebarHeader = () => {
  return (
    <div className={"row gap5"}>
      <Logo />
      <div className={"col"}>
        <MyTitle className={"styleValue"} Tag="h4">
          IceCreamMusic
        </MyTitle>
        <MyText className={"styleTitle"}>Сервис для лучших</MyText>
      </div>
    </div>
  );
};
export default SidebarHeader;
