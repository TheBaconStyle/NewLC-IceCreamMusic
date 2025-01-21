import { release, track } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { fileSchema, stringAsDateSchema } from "./shared.schema";
import { InferSelectModel } from "drizzle-orm";

export const optionalFileSchema = fileSchema.optional();

export const trackInsertSchema = createInsertSchema(track).omit({
  id: true,
  releaseId: true,
});

export type TTrackInsert = z.infer<typeof trackInsertSchema>;

const authorRightsSchema = z.string().refine((value) => {
  const valNum = Number(value);
  return !isNaN(valNum) && valNum >= 1 && valNum <= 100;
}, "Значение должно быть числом больше или равно 1 и меньше либо равно 100");

const roleSchema = z.object({
  person: z.string(),
  role: z.string(),
});

const trackRolesSchema = roleSchema.array().refine((value) => {
  const roles = value.map((v) => v.role);
  const hasPerformer = roles.includes("Исполнитель");
  const hasTextAuthor = roles.includes("Автор слов");
  const hasMelodyAuthor = roles.includes("Автор музыки");
  return hasMelodyAuthor && hasTextAuthor && hasPerformer;
});

const releaseRolesSchema = roleSchema.array().refine((value) => {
  const roles = value.map((v) => v.role);
  const hasPerformer = roles.includes("Исполнитель");
  return hasPerformer;
});

export const trackFormSchema = trackInsertSchema
  .omit({
    index: true,
  })
  .extend({
    title: z.string().min(1),
    track: fileSchema,
    text_sync: optionalFileSchema,
    ringtone: optionalFileSchema,
    video: optionalFileSchema,
    video_shot: optionalFileSchema,
    instant_gratification: stringAsDateSchema.optional(),
    roles: trackRolesSchema,
    language: z.string().min(1),
    author_rights: authorRightsSchema,
  });

export type TTrackForm = z.infer<typeof trackFormSchema>;

export const trackUpdateSchema = trackInsertSchema
  .partial()
  .extend({ id: z.string(), releaseId: z.string() });

export type TTrackUpdate = z.infer<typeof trackUpdateSchema>;

export const releaseInsertSchema = createInsertSchema(release).omit({
  id: true,
  authorId: true,
});

export type TReleaseInsert = z.infer<typeof releaseInsertSchema>;

export const releaseUpdateSchema = releaseInsertSchema
  .partial()
  .extend({ id: z.string() });

export type TReleaseUpdate = z.infer<typeof releaseUpdateSchema>;

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

    roles: releaseRolesSchema,
  });

export type TReleaseForm = z.infer<typeof releaseFormSchema>;

export type TRelease = InferSelectModel<typeof release>;
export type TTrack = InferSelectModel<typeof track>;
