import { Test, TestingModule } from '@nestjs/testing';
import { StafflocationController } from './stafflocation.controller';
import { StafflocationService } from './stafflocation.service';

describe('StafflocationController', () => {
  let controller: StafflocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StafflocationController],
      providers: [StafflocationService],
    }).compile();

    controller = module.get<StafflocationController>(StafflocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
