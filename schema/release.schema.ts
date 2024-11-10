import { release, track } from "@/db/schema";
import { number, z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { fileSchema, stringAsDateSchema } from "./shared.schema";

export const trackInsertSchema = createInsertSchema(track).omit({
  id: true,
  releaseId: true,
});

export type TTrackInsert = z.infer<typeof trackInsertSchema>;

export const trackFormSchema = trackInsertSchema.extend({
  title: z.string().min(1),
  track: fileSchema,
  text_sync: fileSchema.optional(),
  ringtone: fileSchema.optional(),
  video: fileSchema.optional(),
  video_shot: fileSchema.optional(),
  instant_gratification: stringAsDateSchema.optional(),
  roles: z
    .object({
      person: z.string(),
      role: z.string(),
    })
    .array(),
  author_rights: z.string().refine((value) => {
    const valNum = Number(value);
    return !isNaN(valNum) && valNum >= 1 && valNum <= 100;
  }, "Значение должно быть числом больше или равно 1 и меньше либо равно 100"),
});

export type TTrackForm = z.infer<typeof trackFormSchema>;

export const releaseInsertSchema = createInsertSchema(release);

export type TReleaseInsert = z.infer<typeof releaseInsertSchema>;

export const releaseFormSchema = releaseInsertSchema
  .omit({
    id: true,
    authorId: true,
    status: true,
    rejectReason: true,
    confirmed: true,
  })
  .extend({
    title: z.string().min(1),
    preview: z.any().refine((file: File) => {
      return file instanceof File && file.size < 30000000;
    }),

    area: z.object({
      negate: z.boolean(),
      data: z.string().array(),
    }),

    platforms: z.string().array(),

    tracks: trackFormSchema.array().min(1),

    releaseDate: stringAsDateSchema,

    startDate: stringAsDateSchema,

    preorderDate: stringAsDateSchema,
  });

export type TReleaseForm = z.infer<typeof releaseFormSchema>;

// export const releaseClientSchema = releaseFormSchema.transform(
//   ({ startDate, releaseDate, preorderDate, ...data }) => ({
//     startDate: startDate.toISOString(),
//     releaseDate: releaseDate.toISOString(),
//     preorderDate: preorderDate.toISOString(),
//     ...data,
//   })
// );

// export const releaseServerSchema = releaseFormSchema
//   .extend({
//     startDate: z.string(),
//     releaseDate: z.string(),
//     preorderDate: z.string(),
//   })
//   .transform(({ startDate, releaseDate, preorderDate, ...data }) => ({
//     startDate: new Date(startDate),
//     releaseDate: new Date(releaseDate),
//     preorderDate: new Date(preorderDate),
//     ...data,
//   }));

// export type TReleaseServerSchema = z.infer<typeof releaseServerSchema>;

// export const selectReleaseSchema = createSelectSchema(release);

// export type TReleaseSelect = z.infer<typeof selectReleaseSchema>;
