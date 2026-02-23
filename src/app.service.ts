import { Injectable } from '@nestjs/common';
import { JwtPayload } from './auth/auth.types';
import { UsersService } from './users/users.service';
import { UserDataDto } from './users/dto/userdata.dto';
import { RoomService } from './room/room.service';
import { RoomDto } from './room/dto/room.dto';
import { BookingService } from './booking/booking.service';
import { BookingEntity } from './booking/booking.entity';

interface RoomWithBookingFlags extends RoomDto {
  isBooked: boolean; // есть активная бронь
  isBookedByCurrentUser: boolean; // бронь именно этого пользователя
  bookingId?: string | null; // id его брони (если есть)
}

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

    const [bookings, total]: [BookingEntity[], number] =
      await this.bookingService.findAll({} as any);

    const roomsWithFlag: RoomWithBookingFlags[] = roomData.map((room) => {
      // брони по этой комнате
      const roomBookings: BookingEntity[] = bookings.filter(
        (b) => b.room.id === room.id, // если у сущности поле roomId, используй b.roomId
      );

      // бронь именно текущего пользователя (если он есть)
      const bookedByCurrentUser: BookingEntity | undefined =
        user != null
          ? roomBookings.find((b) => b.user.id === user.userId) // или b.userId
          : undefined;

      return {
        ...room,
        isBooked: roomBookings.length > 0,
        isBookedByCurrentUser: bookedByCurrentUser != null,
        bookingId: bookedByCurrentUser ? bookedByCurrentUser.id : null,
      };
    });

    return {
      title: 'Room CMS',
      message: 'Добро пожаловать в Room CMS',
      user: userData,
      rooms: roomsWithFlag,
    };
  }
}
