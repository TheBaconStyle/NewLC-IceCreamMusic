import { Module } from '@nestjs/common';
import { ReleaseRouter } from './release.router';

@Module({
  providers: [ReleaseRouter],
})
export class ReleaseModule {}
