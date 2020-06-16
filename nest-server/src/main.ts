import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'Accept', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
      }),
  );

  await app.listen(8000);
}
bootstrap();
