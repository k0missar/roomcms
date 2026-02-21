import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

interface IndexResponse {
  title: string;
  message: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello(): IndexResponse {
    return this.appService.getHello();
  }
}
