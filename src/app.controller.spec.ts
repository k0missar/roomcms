import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';

// если AppService зависит от UsersService, его надо замокать:
class MockUsersService {
  getUserData() {
    return null;
  }
}

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        { provide: UsersService, useClass: MockUsersService }, // <-- если нужен
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return index data', async () => {
      const result = await appController.getHello(undefined as any);

      expect(result).toEqual({
        title: 'Название',
        message: 'Сообщение',
        user: null, // или undefined, в зависимости от реализации AppService
      });
    });
  });
});
