import { TypedParam, TypedRoute } from '@nestia/core';
import { Controller, Logger } from '@nestjs/common';

@Controller()
export class AppController {
  logger = new Logger(AppController.name);

  @TypedRoute.Get('/:id')
  getHello(@TypedParam('id') id: number): string {
    this.logger.log(id);
    return 'Hello World';
  }
}
