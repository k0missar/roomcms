import { Controller, Get, Render, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { OptionalAuthGuard } from './auth/optional.auth.guard';
import { JwtPayload } from './auth/auth.types';

type RequestWithUser = Request & { user?: any };

interface IndexResponse {
  title: string;
  message: string;
  user?: JwtPayload;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  @UseGuards(OptionalAuthGuard)
  getHello(@Req() req: RequestWithUser): IndexResponse {
    return this.appService.getHello(req.user);
  }
}
