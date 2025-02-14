"use client";

import Logo from "@/shared/Logo/Logo";
import MyTitle from "@/shared/MyTitle/MyTitle";
import MyText from "@/shared/MyText/MyText";

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
