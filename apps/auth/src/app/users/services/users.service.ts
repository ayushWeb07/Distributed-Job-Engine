import { Inject, Injectable } from '@nestjs/common';
import { SelectUserType } from '../../../database/types/user.type';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(): Promise<SelectUserType[]> {
    const existingUsers: SelectUserType[] =
      await this.usersRepository.findAll();
    return existingUsers;
  }
}
