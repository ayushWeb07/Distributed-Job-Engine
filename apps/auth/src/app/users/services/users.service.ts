import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { SelectUserType } from '../../../database/types/user.type';
import { UsersRepository } from '../repositories/users.repository';
import { CreateUserInput } from '../inputs/create-user.input';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserInput: CreateUserInput): Promise<void> {
    // check if a customer with this email already exists
    const existingUser: SelectUserType | null =
      await this.usersRepository.findUserByEmail(createUserInput.email);

    if (existingUser) {
      throw new ConflictException(
        `User with email '${existingUser.email}' already exists`,
      );
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);

    // call the create user repository
    await this.usersRepository.createUser({
      ...createUserInput,
      password: hashedPassword,
    });
  }

  async findAllUsers(): Promise<SelectUserType[]> {
    // call the find all users repository
    const existingUsers: SelectUserType[] =
      await this.usersRepository.findAllUsers();
    return existingUsers;
  }

  async findUserById() {}
  async deleteUserById() {}
}
