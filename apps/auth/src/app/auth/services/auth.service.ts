import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../users/repositories/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async login() {}
}
