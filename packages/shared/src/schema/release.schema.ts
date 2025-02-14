import { release, track } from "db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { fileSchema } from "./shared.schema";
import { InferSelectModel } from "drizzle-orm";

const authorRightsSchema = z.string().refine((value) => {
  const valNum = Number(value);
  return !isNaN(valNum) && valNum >= 1 && valNum <= 100;
}, "Значение должно быть числом больше или равно 1 и меньше либо равно 100");

const roleSchema = z.object({
  person: z.string(),
  role: z.string(),
});

export const trackRolesSchema = roleSchema.array().refine((value) => {
  const roles = value.map((v) => v.role);
  const hasPerformer = roles.includes("Исполнитель");
  const hasTextAuthor = roles.includes("Автор слов");
  const hasMelodyAuthor = roles.includes("Автор музыки");
  return hasMelodyAuthor && hasTextAuthor && hasPerformer;
});

export type TTrackRoles = z.infer<typeof trackRolesSchema>;

export const releaseRolesSchema = roleSchema.array().refine((value) => {
  const roles = value.map((v) => v.role);
  const hasPerformer = roles.includes("Исполнитель");
  return hasPerformer;
});

export type TReleaseRoles = z.infer<typeof releaseRolesSchema>;

export const optionalFileSchema = fileSchema.optional();

export const releasePreviewSchema = fileSchema.refine((file) => {
  return file.size < 30000000;
});

export const releaseAreaSchema = z.object({
  negate: z.boolean(),
  data: z.string().array(),
});

export type TReleaseArea = z.infer<typeof releaseAreaSchema>;

export const releasePlatformsSchema = z.string().array();

export type TReleasePlatforms = z.infer<typeof releasePlatformsSchema>;

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

const trackInsertBaseSchema = createInsertSchema(track);

const trackSelectBaseSchema = createSelectSchema(track);

export const trackInsertSchema = trackInsertBaseSchema.omit({
  id: true,
  releaseId: true,
});

export type TTrackInsert = z.infer<typeof trackInsertSchema>;

export const trackInsertFormSchema = trackInsertSchema
  .omit({
    index: true,
  })
  .extend({
    title: z.string().min(1),
    language: z.string().min(1),
    author_rights: authorRightsSchema,
    roles: trackRolesSchema,
    track: fileSchema,
    text_sync: optionalFileSchema,
    ringtone: optionalFileSchema,
    video: optionalFileSchema,
    video_shot: optionalFileSchema,
  });

export type TTrackInsertForm = z.infer<typeof trackInsertFormSchema>;

export const trackUpdateSchema = trackInsertSchema
  .partial()
  .extend({ id: z.string(), releaseId: z.string() });

export type TTrackUpdate = z.infer<typeof trackUpdateSchema>;

export const trackUpdateFormSchema = trackInsertFormSchema.extend({
  track: z.union([z.string(), fileSchema]),
  text_sync: z.union([z.string(), optionalFileSchema]),
  ringtone: z.union([z.string(), optionalFileSchema]),
  video: z.union([z.string(), optionalFileSchema]),
  video_shot: z.union([z.string(), optionalFileSchema]),
  trackId: z.string(),
});

export type TTrackUpdateForm = z.infer<typeof trackUpdateFormSchema>;

type qwe = TTrackUpdateForm["trackId"];

const releaseInsertBaseSchema = createInsertSchema(release);

const releaseSelectSchema = createSelectSchema(release);

export const releaseInsertSchema = releaseInsertBaseSchema.omit({
  id: true,
  authorId: true,
  status: true,
  rejectReason: true,
  confirmed: true,
});

export type TReleaseInsert = z.infer<typeof releaseInsertSchema>;

export const releaseUpdateSchema = releaseSelectSchema
  .omit({ authorId: true, status: true, rejectReason: true, confirmed: true })
  .partial()
  .extend({ id: z.string() });

export type TReleaseUpdate = z.infer<typeof releaseUpdateSchema>;

export const releaseInsertFormSchema = releaseInsertSchema.extend({
  title: z.string().min(1),
  preview: releasePreviewSchema,
  area: releaseAreaSchema,
  platforms: releasePlatformsSchema,
  tracks: trackInsertFormSchema.array().min(1),
  roles: releaseRolesSchema,
});

export const releaseUpdateFormSchema = releaseInsertFormSchema
  .partial()
  .extend({
    preview: z.union([z.string(), releasePreviewSchema]),
    tracks: trackUpdateFormSchema.array().min(1),
    id: z.string(),
  });

export type TReleaseUpdateForm = z.infer<typeof releaseUpdateFormSchema>;

export type TReleaseInsertForm = z.infer<typeof releaseInsertFormSchema>;

export type TRelease = InferSelectModel<typeof release>;

export type TTrack = InferSelectModel<typeof track>;
