import { release, track } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { fileSchema, stringAsDateSchema } from "./shared.schema";

export const optionalFileSchema = fileSchema.optional();

export const trackInsertSchema = createInsertSchema(track).omit({
  id: true,
  releaseId: true,
});

export type TTrackInsert = z.infer<typeof trackInsertSchema>;

export const trackFormSchema = trackInsertSchema.extend({
  title: z.string().min(1),
  track: fileSchema,
  text_sync: optionalFileSchema,
  ringtone: optionalFileSchema,
  video: optionalFileSchema,
  video_shot: optionalFileSchema,
  instant_gratification: stringAsDateSchema.optional(),
  roles: z
    .object({
      person: z.string(),
      role: z.string(),
    })
    .array()
    .refine((value) => {
      const roles = value.map((v) => v.role);
      const hasPerformer = roles.includes("Исполнитель");
      const hasTextAuthor = roles.includes("Автор слов");
      const hasMelodyAuthor = roles.includes("Автор музыки");
      return hasMelodyAuthor && hasTextAuthor && hasPerformer;
    }),
  language: z.string().min(1),
  author_rights: z.string().refine((value) => {
    const valNum = Number(value);
    return !isNaN(valNum) && valNum >= 1 && valNum <= 100;
  }, "Значение должно быть числом больше или равно 1 и меньше либо равно 100"),
});

export type TTrackForm = z.infer<typeof trackFormSchema>;

export const releaseInsertSchema = createInsertSchema(release).omit({
  id: true,
  authorId: true,
});

export const releasePreviewSchema = fileSchema.refine((file) => {
  return file.size < 30000000;
});

export const areaSchema = z.object({
  negate: z.boolean(),
  data: z.string().array(),
});

export const platformSchema = z.string().array();

export type TValidatedTrackFiles = Record<
  keyof Pick<TTrackInsert, "track">,
  z.infer<typeof fileSchema>
> &
  Partial<
    Record<
      keyof Pick<
        TTrackInsert,
        "ringtone" | "text_sync" | "video" | "video_shot"
      >,
      z.infer<typeof optionalFileSchema>
    >
  >;

export type TReleaseInsert = z.infer<typeof releaseInsertSchema>;

export const releaseFormSchema = releaseInsertSchema
  .omit({
    status: true,
    rejectReason: true,
    confirmed: true,
  })
  .extend({
    title: z.string().min(1),
    preview: releasePreviewSchema,

    area: areaSchema,

    platforms: platformSchema,

    tracks: trackFormSchema.array().min(1),

    releaseDate: stringAsDateSchema,

    startDate: stringAsDateSchema,

    preorderDate: stringAsDateSchema,
  });

export type TReleaseForm = z.infer<typeof releaseFormSchema>;
