/* eslint-disable prettier/prettier */

import { Logger, Module, OnModuleInit } from '@nestjs/common';
import * as dbSchema from 'db/schema';
import { DrizzlePGModule } from '@knaadh/nestjs-drizzle-pg';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzlePGModule.registerAsync({
      tag: 'DB_TAG',
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        const user = config.getOrThrow<string>('DB_USER');
        const password = config.getOrThrow<string>('DB_PASSWORD');
        const host = config.getOrThrow<string>('DB_HOST');
        const port = config.getOrThrow<string>('DB_PORT');
        const dbName = config.getOrThrow<string>('DB_NAME');

        return {
          pg: {
            connection: 'client',
            config: {
              connectionString: `postgres://${user}:${password}@${host}:${port}/${dbName}`,
            },
          },
          config: {
            schema: { ...dbSchema },
          },
        };
      },
    }),
  ],
})
export class AppModule implements OnModuleInit {
  logger = new Logger(AppModule.name);

  onModuleInit() {
    this.logger.log(`Server started on http://localhost:5000`);
  }
}
