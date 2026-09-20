import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  drizzleUri: process.env.DRIZZLE_URI ?? '',
}));
