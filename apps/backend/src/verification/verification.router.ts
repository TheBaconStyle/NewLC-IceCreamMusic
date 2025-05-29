import { Router } from 'nestjs-trpc';

@Router({ alias: 'verification' })
export class VerificationRouter {
  async registerVerificationTicket() {}

  async acceptVerificationTicket() {}

  async rejectVerificationTicket() {}
}
