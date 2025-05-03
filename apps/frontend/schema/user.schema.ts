import { users } from "@/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const insertUserSchema = createInsertSchema(users);

export const selectUserSchema = createSelectSchema(users);

export const authUserSchema = selectUserSchema.pick({
  id: true,
  avatar: true,
  name: true,
  isAdmin: true,
});

export type TInsertUserSchema = z.infer<typeof insertUserSchema>;

export type TSelectUserSchema = z.infer<typeof selectUserSchema>;

export type TAuthUserSchema = z.infer<typeof authUserSchema>;
