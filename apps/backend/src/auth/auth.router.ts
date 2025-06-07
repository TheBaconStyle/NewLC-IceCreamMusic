import { Inject, Logger } from '@nestjs/common';
import * as schema from 'db/schema';
import { and, eq, gte } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import z from 'zod';

const getUserByTokenInput = z.object({
  token: z.string(),
});

const getUserByTokenOutput = z.object({
  user: z
    .object({
      avatar: z.string().nullable(),
      isAdmin: z.boolean(),
      email: z.string(),
      id: z.string(),
      name: z.string(),
    })
    .optional(),
});

const credentialsSignInInput = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const credentialsSignUpInput = z.object({
  email: z.string().email(),
  password: z.string(),
});

@Router({ alias: 'auth' })
export class AuthRouter {
  logger = new Logger(AuthRouter.name);

  constructor(
    @Inject('DB_TAG') private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  @Query({
    // input: getUserByTokenInput,
    // output: getUserByTokenOutput,
  })
  async getUserByToken(
    @Input('token') token: string,
  ): Promise<z.infer<typeof getUserByTokenOutput>> {
    const session = await this.db.query.sessions.findFirst({
      where: and(
        eq(schema.sessions.sessionToken, token),
        gte(schema.sessions.expires, new Date()),
      ),
      with: {
        user: {
          columns: {
            isAdmin: true,
            email: true,
            avatar: true,
            name: true,
            id: true,
          },
        },
      },
    });
    return {
      user: session?.user,
    };
  }

  @Mutation({})
  async OAuthSignin() {}

  @Mutation({})
  async createOauthAccount() {}

  @Mutation({})
  async emailRecover() {}

  @Mutation({})
  async verifyEmailToken() {}

  @Mutation({
    // input: credentialsSignInInput,
    // output: z.object({
    //   message: z.string(),
    //   token: z.string().optional(),
    // }),
  })
  async emailSignIn(
    @Input('email') email: string,
    @Input('password') password: string,
  ) {
    const user = await this.db.query.users.findFirst({
      where: eq(schema.users.email, email),
    });

    if (!user || !!!user.password) {
      return {
        message: 'Неверные данные для входа',
      };
    }

    // const passwordVerified = await compare(password, user.password);

    // const token = await generateToken()
  }

  @Mutation({
    // input: z.object({
    //   authToken: z.string(),
    //   emailToken: z.string(),
    // }),
    // output: z.object({}),
  })
  async emailSignUp() {}

  async recoverPassowrd() {}
}
