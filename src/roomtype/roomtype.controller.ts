import { Controller } from '@nestjs/common';
import { RoomtypeService } from './roomtype.service';

@Controller('roomtype')
export class RoomtypeController {
  constructor(private readonly roomtypeService: RoomtypeService) {}
}
