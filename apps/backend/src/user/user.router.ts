import { Router } from 'nestjs-trpc';

@Router({ alias: 'user' })
export class UserRouter {
  async getUserByVerificationTicket() {}

  async getUserByRelease() {}

  async getUserById() {}
}
