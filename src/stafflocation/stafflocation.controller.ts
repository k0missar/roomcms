import { Controller } from '@nestjs/common';
import { StafflocationService } from './stafflocation.service';

@Controller('stafflocation')
export class StafflocationController {
  constructor(private readonly stafflocationService: StafflocationService) {}
}
