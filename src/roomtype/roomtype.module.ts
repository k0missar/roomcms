import { Module } from '@nestjs/common';
import { RoomtypeService } from './roomtype.service';
import { RoomtypeController } from './roomtype.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomTypeEntity } from './roomtype.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomTypeEntity])],
  controllers: [RoomtypeController],
  providers: [RoomtypeService],
  exports: [RoomtypeService],
})
export class RoomtypeModule {}
