import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  auth: t.router({
    getUserByToken: publicProcedure.input(z.object({
      token: z.string(),
    })).output(z.object({
      user: z
        .object({
          avatar: z.string().nullable(),
          isAdmin: z.boolean(),
          email: z.string(),
          id: z.string(),
          name: z.string(),
        })
        .optional(),
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    OAuthSignin: publicProcedure.mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    createOauthAccount: publicProcedure.mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    emailRecover: publicProcedure.mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    verifyEmailToken: publicProcedure.mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    emailSignIn: publicProcedure.input(z.object({
      authToken: z.string(),
      emailToken: z.string(),
    })).output(z.object({})).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    emailSignUp: publicProcedure.input(z.object({
      authToken: z.string(),
      emailToken: z.string(),
    })).output(z.object({})).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
  })
});
export type AppRouter = typeof appRouter;

