import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import { IJwtTokenPayload } from '../interfaces/jwt-token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          let token = null;

          if (req.cookies) {
            token = req.cookies['token'];
          }

          return token;
        },
      ]),
      secretOrKey: configService.getOrThrow<string>('AUTH_JWT_SECRET'),
    });
  }

  async validate(payload: IJwtTokenPayload): Promise<IJwtTokenPayload> {
    return payload;
  }
}
