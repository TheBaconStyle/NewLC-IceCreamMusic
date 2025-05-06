import { z } from "zod";
import { selectUserSchema } from "./user.schema";
import { fileSchema, stringAsDateSchema } from "./shared.schema";

export const profileSchema = selectUserSchema
  .pick({
    name: true,
    birthDate: true,
    country: true,
    label: true,
    personalSiteUrl: true,
    telegram: true,
    vk: true,
    whatsapp: true,
    viber: true,
    avatar: true,
  })
  .partial();

export type TProfileSchema = z.infer<typeof profileSchema>;

export const profileFormSchema = profileSchema
  .extend({
    avatar: fileSchema,
    birthDate: stringAsDateSchema,
  })
  .partial();

export type TProfileFormSchema = z.infer<typeof profileFormSchema>;
