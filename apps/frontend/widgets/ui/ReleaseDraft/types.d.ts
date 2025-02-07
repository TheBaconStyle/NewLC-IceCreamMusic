import { TReleaseInsertForm } from "@/shared/model/schema/release.schema";
import { Control } from "react-hook-form";

export type TReleaseFieldGroup = {
  control: Control<TReleaseInsertForm>;
};
