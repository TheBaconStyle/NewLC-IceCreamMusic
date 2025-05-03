import { TReleaseInsertForm } from "@/shared/schema/release.schema";
import { Control } from "react-hook-form";

export type TReleaseFieldGroup = {
  control: Control<TReleaseInsertForm>;
};
