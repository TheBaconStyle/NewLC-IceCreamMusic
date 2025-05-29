import { Router } from 'nestjs-trpc';

@Router({ alias: 'finance' })
export class FinanceRouter {
  async makeOrder() {}
}
