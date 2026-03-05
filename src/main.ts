import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParserOrig from 'cookie-parser';
import type { RequestHandler } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const cookieParser: () => RequestHandler = cookieParserOrig;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('pug');
  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
