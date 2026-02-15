import { Module } from '@nestjs/common';
import { StafflocationService } from './stafflocation.service';
import { StafflocationController } from './stafflocation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffLocationEntity } from './stafflocation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StaffLocationEntity])],
  controllers: [StafflocationController],
  providers: [StafflocationService],
  exports: [StafflocationService],
})
export class StafflocationModule {}
