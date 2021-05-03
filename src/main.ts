import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('테스트')
    .setDescription('테스트용 문서입니다.')
    .setVersion('1.0')
    .addTag('auth', '인증 관련 API')
    .addTag('user', '사용자 관련 API')
    .addTag('post', '포스트 관련 API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // /api 경로로 연동

  await app.listen(3000);
}
bootstrap();
