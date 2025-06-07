import { Module } from '@nestjs/common';
import { AuthRouter } from './auth.router.js';
@Module({
  providers: [AuthRouter],
})
export class AuthModule {}
