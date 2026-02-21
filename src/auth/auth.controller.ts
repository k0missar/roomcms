import {
  Controller,
  Body,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from '../users/dto/login.dto';
import type { JwtPayload } from './auth.types';
import { Request as ExpressRequest } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto.email, loginDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(
    @Request() req: ExpressRequest & { user: JwtPayload },
  ): JwtPayload {
    return req.user;
  }
}
