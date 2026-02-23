import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from './booking.entity';
import { RoomEntity } from '../room/room.entity';
import { UsersEntity } from '../users/users.entity';
import { BookingGateway } from './booking.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([BookingEntity, RoomEntity, UsersEntity])],
  controllers: [BookingController],
  providers: [BookingService, BookingGateway],
  exports: [BookingService],
})
export class BookingModule {}
