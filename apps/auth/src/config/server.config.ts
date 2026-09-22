import { registerAs } from '@nestjs/config';

export default registerAs('server', () => ({
  serverPort: parseInt(process.env.SERVER_PORT ?? '8080', 10),
  authJwtSecret: process.env.AUTH_JWT_SECRET ?? '',
  authJwtExpires: parseInt(process.env.AUTH_JWT_EXPIRES ?? '3600', 10),
}));
