import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users/users.entity';
import { RoomtypeModule } from './roomtype/roomtype.module';
import { RoomModule } from './room/room.module';
import { BookingModule } from './booking/booking.module';
import { ReviewsModule } from './reviews/reviews.module';
import { StafflocationModule } from './stafflocation/stafflocation.module';
import { AuthModule } from './auth/auth.module';
import { JwtGlobalModule } from './jwt.global.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '217.114.9.124',
      port: 63211,
      username: 'devuser',
      password: 'devpass',
      database: 'devdb',
      synchronize: true,
      autoLoadEntities: true,
      entities: [UsersEntity],
    }),
    UsersModule,
    RoomtypeModule,
    RoomModule,
    BookingModule,
    ReviewsModule,
    StafflocationModule,
    AuthModule,
    JwtGlobalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
