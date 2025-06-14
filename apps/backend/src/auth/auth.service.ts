import { Inject, Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt-ts';
import type { DB } from 'db';

@Injectable()
export class AuthService {
  constructor(@Inject('DB_TAG') private readonly db: DB) {}

  async hashPassword(password: string) {
    const passwordSalt = await genSalt(Number(process.env.SALT_ROUNDS!));

    const hashedPassword = await hash(password, passwordSalt);

    return hashedPassword;
  }
}
