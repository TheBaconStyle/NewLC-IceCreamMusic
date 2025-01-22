import { TReleaseInsertForm } from "@/schema/release.schema";
import { Control } from "react-hook-form";

export type TReleaseFieldGroup = {
  control: Control<TReleaseInsertForm>;
};
