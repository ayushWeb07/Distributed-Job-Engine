import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE_PROVIDER_TOKEN } from '../../../database/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../../database/schemas';
import {
  InsertUserType,
  SelectUserType,
} from '../../../database/types/user.type';
import { users } from '../../../database/schemas';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersRepository {
  constructor(
    @Inject(DRIZZLE_PROVIDER_TOKEN)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async createUser(insertUserType: InsertUserType): Promise<void> {
    // insert into the db
    await this.db.insert(users).values(insertUserType);
  }

  async findAllUsers(): Promise<SelectUserType[]> {
    // fetch the users from the db
    const existingUsers: SelectUserType[] = await this.db.select().from(users);
    return existingUsers;
  }

  async findUserById(id: string): Promise<SelectUserType | null> {
    // fetch the user from the db
    const [fetchedUser] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id));

    if (!fetchedUser) return null;

    return fetchedUser;
  }

  async findUserByEmail(email: string): Promise<SelectUserType | null> {
    // fetch the user from the db
    const [fetchedUser] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (!fetchedUser) return null;

    return fetchedUser;
  }

  async deleteUserById(id: string): Promise<void> {
    // delete the user from the db
    await this.db.delete(users).where(eq(users.id, id));
  }
}
