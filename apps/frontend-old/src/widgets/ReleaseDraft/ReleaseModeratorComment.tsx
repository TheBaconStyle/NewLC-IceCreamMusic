import { TReleaseInsertForm } from "shared/schema/release.schema";
import MyTextArea from "@/shared/MyTextArea/MyTextArea";
import { useFormContext } from "react-hook-form";

export function ReleaseModeratorComment() {
  const { watch, setValue } = useFormContext<TReleaseInsertForm>();
  const moderatorComment = watch("moderatorComment");
  return (
    <div className="wrap mb20">
      <MyTextArea
        value={moderatorComment ?? ""}
        label="Сообщение для модератора"
        onChange={(e) => setValue("moderatorComment", e.target.value)}
      />
    </div>
  );
}
