import { Controller, Get, Logger } from '@nestjs/common';

@Controller('api/v1')
export class AppController {
  private logger = new Logger(AppController.name);
  constructor() {}

  @Get()
  getHello(): string {}
}
