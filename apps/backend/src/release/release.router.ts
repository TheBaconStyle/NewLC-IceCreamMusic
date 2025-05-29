import { Router } from 'nestjs-trpc';

@Router({ alias: 'release' })
export class ReleaseRouter {
  async approveRelease() {}

  async rejectRelease() {}
}
