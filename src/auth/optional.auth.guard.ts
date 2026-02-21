import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import type { JwtPayload } from './auth.types';

@Injectable()
export class OptionalAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      // гость, просто пропускаем дальше без user
      return true;
    }

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      return true; // тоже считаем гостем
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
      (request as Request & { user?: JwtPayload }).user = payload;
    } catch {
      // невалидный токен → считаем гостем
    }

    return true;
  }
}