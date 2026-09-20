import { Module } from '@nestjs/common';
import { DRIZZLE_PROVIDER_TOKEN, drizzleProvider } from './drizzle.provider';

@Module({
  providers: [drizzleProvider],
  exports: [DRIZZLE_PROVIDER_TOKEN],
})
export class DrizzleModule {}
