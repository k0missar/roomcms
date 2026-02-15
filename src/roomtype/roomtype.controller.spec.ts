import { Test, TestingModule } from '@nestjs/testing';
import { RoomtypeController } from './roomtype.controller';
import { RoomtypeService } from './roomtype.service';

describe('RoomtypeController', () => {
  let controller: RoomtypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomtypeController],
      providers: [RoomtypeService],
    }).compile();

    controller = module.get<RoomtypeController>(RoomtypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
