/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { IServerConfig } from './config/interfaces/server_config.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // use api prefix
  app.setGlobalPrefix('api');

  // register the validation filters
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // load the config service and the port
  const configService = app.get(ConfigService);
  const serverConfig = configService.get<IServerConfig>('server');

  const port = serverConfig.serverPort;
  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
