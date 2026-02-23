import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { OptionalAuthGuard } from './auth/optional.auth.guard';
import type { JwtPayload } from './auth/auth.types';
import { CurrentUser } from './common/decorators/current-user.decorator';
import { UserDataDto } from './users/dto/userdata.dto';
import { RoomDto } from './room/dto/room.dto';

interface IndexResponse {
  title: string;
  message: string;
  user?: UserDataDto | null;
  rooms?: RoomDto[] | null;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  @UseGuards(OptionalAuthGuard)
  getHello(@CurrentUser() user: JwtPayload): Promise<IndexResponse> {
    return this.appService.getHello(user);
  }
}
