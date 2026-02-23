import { Injectable } from '@nestjs/common';
import { JwtPayload } from './auth/auth.types';
import { UsersService } from './users/users.service';
import { UserDataDto } from './users/dto/userdata.dto';
import { RoomService } from './room/room.service';
import { RoomDto } from './room/dto/room.dto';

interface IndexResponse {
  title: string;
  message: string;
  user?: UserDataDto | null;
  rooms?: RoomDto[] | null;
}

@Injectable()
export class AppService {
  constructor(
    private readonly usersService: UsersService,
    private readonly roomService: RoomService,
  ) {}

  async getHello(user?: JwtPayload): Promise<IndexResponse> {
    let userData: UserDataDto | null = null;

    if (user?.email) {
      userData = await this.usersService.getUserData(user.email);
    }

    const roomData: RoomDto[] = await this.roomService.findAll();
    console.log(roomData);

    return {
      title: 'Название',
      message: 'Сообщение',
      user: userData,
      rooms: roomData,
    };
  }
}
