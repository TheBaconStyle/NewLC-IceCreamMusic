// const getUserByTokenInput = z.object({
//   token: z.string(),
// });

import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller, Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { SessionService } from './session.service';
import { ApiSecurity } from '@nestjs/swagger';
import { AdminGuard } from './admin.guard';

export type qwe = { access_token: string };

export type ewq = { success: boolean };

@Controller('auth')
export class AuthController {
  logger = new Logger(AuthController.name);

  constructor(private readonly sessionService: SessionService) {}

  // @TypedRoute.Get('session')
  // async getUserByToken(
  //   @TypedHeaders() headers: { Authorization: string },
  // ): Promise<z.infer<typeof getUserByTokenOutput>> {
  //   const session = await this.db.query.sessions.findFirst({
  //     where: and(
  //       eq(schema.sessions.sessionToken, token),
  //       gte(schema.sessions.expires, new Date()),
  //     ),
  //     with: {
  //       user: {
  //         columns: {
  //           isAdmin: true,
  //           email: true,
  //           avatar: true,
  //           name: true,
  //           id: true,
  //         },
  //       },
  //     },
  //   });
  //   return {
  //     user: session?.user,
  //   };
  // }
  @ApiSecurity('bearer')
  @TypedRoute.Post('oauth')
  @AdminGuard()
  @UseGuards(AuthGuard)
  OAuthSignin(@TypedBody() body: qwe): ewq {
    this.logger.log(body);
    return { success: true };
  }

  // @TypedRoute.Post('signin')
  // async credentialsSignIn(
  //   @TypedBody() body: { email: string; password: string },
  // ) {}

  // @Mutation({})
  // async createOauthAccount() {}

  // @Mutation({})
  // async emailRecover() {}

  // @Mutation({})
  // async verifyEmailToken() {}

  // @Mutation({
  //   // input: credentialsSignInInput,
  //   // output: z.object({
  //   //   message: z.string(),
  //   //   token: z.string().optional(),
  //   // }),
  // })
  // async emailSignIn(
  //   @Input('email') email: string,
  //   @Input('password') password: string,
  // ) {
  //   const user = await this.db.query.users.findFirst({
  //     where: eq(schema.users.email, email),
  //   });

  //   if (!user || !user.password) {
  //     return {
  //       message: 'Неверные данные для входа',
  //     };
  //   }

  //   // const passwordVerified = await compare(password, user.password);

  //   // const token = await generateToken()
  // }

  // @Mutation({
  //   // input: z.object({
  //   //   authToken: z.string(),
  //   //   emailToken: z.string(),
  //   // }),
  //   // output: z.object({}),
  // })
  // async emailSignUp() {}

  // async recoverPassowrd() {}
}
