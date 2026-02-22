import {
  Controller,
  Body,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from '../users/dto/login.dto';
import type { JwtPayload } from './auth.types';
import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: ExpressResponse,
  ) {
    const { access_token } = await this.authService.signIn(
      loginDto.email,
      loginDto.password,
    );

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: false, // в продакшене true + https
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
    });

    return { statusCode: 200, success: true };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: ExpressResponse) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    return { statusCode: 200, success: true };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req: ExpressRequest & { user: JwtPayload }): JwtPayload {
    return req.user;
  }
}
