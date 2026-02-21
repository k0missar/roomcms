import { Injectable } from '@nestjs/common';

interface IndexResponse {
  title: string;
  message: string;
}

@Injectable()
export class AppService {
  getHello(): IndexResponse {
    return { title: 'Название', message: 'Сообщение' };
  }
}
