import IBannerIntresting from "@/shared/helpers/site/BannerIntresting/BannerIntresting.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export default interface IBannerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  fromColor?: string;
  toColor?: string;
  info: IBannerIntresting;
}
