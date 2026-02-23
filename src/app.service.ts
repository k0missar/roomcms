import { Injectable } from '@nestjs/common';
import { JwtPayload } from './auth/auth.types';
import { UsersService } from './users/users.service';
import { UserDataDto } from './users/dto/userdata.dto';
import { RoomService } from './room/room.service';
import { RoomDto } from './room/dto/room.dto';
import { BookingService } from './booking/booking.service';

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
    private readonly bookingService: BookingService,
  ) {}

  async getHello(user?: JwtPayload): Promise<IndexResponse> {
    let userData: UserDataDto | null = null;

    if (user?.email) {
      userData = await this.usersService.getUserData(user.email);
    }

    const roomData: RoomDto[] = await this.roomService.findAll();

    const [bookings] = await this.bookingService.findAll({
      status: undefined,
    } as any);

    const bookedRoomIds = new Set(
      bookings.map((b) => b.room.id), // или b.roomId, в зависимости от сущности
    );

    const roomsWithFlag = roomData.map((room) => ({
      ...room,
      isBooked: bookedRoomIds.has(room.id),
    }));
    console.log(roomsWithFlag);
    return {
      title: 'Название',
      message: 'Сообщение',
      user: userData,
      rooms: roomsWithFlag,
    };
  }
}
