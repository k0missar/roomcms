import { Injectable } from '@nestjs/common';
import { JwtPayload } from './auth/auth.types';

interface IndexResponse {
  title: string;
  message: string;
  user?: JwtPayload;
}

@Injectable()
export class AppService {
  getHello(user?: JwtPayload): IndexResponse {
    console.log(user);
    return { title: 'Название', message: 'Сообщение', user };
  }
}
