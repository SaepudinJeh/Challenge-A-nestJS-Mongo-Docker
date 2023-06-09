import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as compression from 'compression';
import helmet from 'helmet';
import { join } from 'path';
import * as express from 'express';
// import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(compression());
  app.use(helmet());
  app.enableCors();
  // app.use(csurf());

  // Generate swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Auth service')
    .setDescription('The Auth service API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);

  app.use('/images', express.static(join(__dirname, '..', 'images')));

  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
