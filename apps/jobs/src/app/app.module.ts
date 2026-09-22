import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import envsValidationSchema from '../../../auth/src/config/validations/envs.validation';
import serverConfig from '../../../auth/src/config/server.config';
import databaseConfig from '../../../auth/src/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envsValidationSchema,
      load: [serverConfig, databaseConfig],
      envFilePath: 'apps/jobs/.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
