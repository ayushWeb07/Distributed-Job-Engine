import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE_PROVIDER_TOKEN } from '../../../database/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../../database/schemas';
import { CreateUserInput } from '../inputs/create-user.input';
import { SelectUserType } from '../../../database/types/user.type';
import { users } from '../../../database/schemas';

@Injectable()
export class UsersRepository {
  constructor(
    @Inject(DRIZZLE_PROVIDER_TOKEN)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async findAll(): Promise<SelectUserType[]> {
    const existingUsers: SelectUserType[] = await this.db.select().from(users);
    return existingUsers;
  }
}
