import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthResolver } from './resolvers/auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IServerConfig } from '../../config/interfaces/server_config.interface';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,

    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // get the server config
        const serverConfig = configService.get<IServerConfig>('server');

        if (!serverConfig) {
          throw new Error('Server configuration must be setup');
        }

        return {
          secret: serverConfig.authJwtSecret,
          signOptions: {
            expiresIn: `${serverConfig.authJwtExpires}s`,
          },
        };
      },
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
})
export class AuthModule {}
