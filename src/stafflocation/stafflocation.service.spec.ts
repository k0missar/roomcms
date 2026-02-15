import { Test, TestingModule } from '@nestjs/testing';
import { StafflocationService } from './stafflocation.service';

describe('StafflocationService', () => {
  let service: StafflocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StafflocationService],
    }).compile();

    service = module.get<StafflocationService>(StafflocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
