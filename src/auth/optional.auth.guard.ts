import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import type { JwtPayload } from './auth.types';

type RequestWithUser = Request & { user?: JwtPayload };

@Injectable()
export class OptionalAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    let token: string | undefined;

    // 1) Пробуем достать токен из Authorization: Bearer ...
    const authHeader = request.headers.authorization;
    if (typeof authHeader === 'string') {
      const [type, value] = authHeader.split(' ');
      if (type === 'Bearer' && value) {
        token = value;
      }
    }

    // 2) Если в заголовке нет — пробуем взять из cookie
    if (!token && typeof request.cookies?.access_token === 'string') {
      token = request.cookies.access_token;
    }

    // 3) Если токена нет вообще — гость, просто пропускаем
    if (!token) {
      return true;
    }

    // 4) Пытаемся провалидировать токен
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
      request.user = payload;
    } catch {
      // Невалидный токен → считаем гостем, ничего не кидаем
    }

    return true;
  }
}
