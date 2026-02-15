import { Module } from '@nestjs/common';
import { StafflocationService } from './stafflocation.service';
import { StafflocationController } from './stafflocation.controller';

@Module({
  controllers: [StafflocationController],
  providers: [StafflocationService],
})
export class StafflocationModule {}
