import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/** Эндпоинт приложения */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
