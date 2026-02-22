import { Injectable } from '@nestjs/common';
import { JwtPayload } from './auth/auth.types';
import { UsersService } from './users/users.service';
import { UserDataDto } from './users/dto/userdata.dto';

interface IndexResponse {
  title: string;
  message: string;
  user?: UserDataDto | null;
}

@Injectable()
export class AppService {
  constructor(private readonly usersService: UsersService) {}

  async getHello(user?: JwtPayload): Promise<IndexResponse> {
    let userData: UserDataDto | null = null;

    if (user?.email) {
      userData = await this.usersService.getUserData(user.email);
    }

    return { title: 'Название', message: 'Сообщение', user: userData };
  }
}
