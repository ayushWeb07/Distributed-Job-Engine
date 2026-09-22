import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../../users/repositories/users.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from '../inputs/login-user.input';
import { SelectUserType } from '../../../database/types/user.type';
import bcrypt from 'bcrypt';
import { ILoginServiceResponse } from '../interfaces/login-service-response.interface';
import { IJwtTokenPayload } from '../interfaces/jwt-token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser(
    loginUserInput: LoginUserInput,
  ): Promise<ILoginServiceResponse> {
    // check if a user with this email even exists
    const existingUser: SelectUserType | null =
      await this.usersRepository.findUserByEmail(loginUserInput.email);

    if (!existingUser) {
      throw new UnauthorizedException(`Invalid credentials has been provided`);
    }

    // check if the passwords are correct
    const isPasswordsMatch = await bcrypt.compare(
      loginUserInput.password,
      existingUser.password,
    );

    if (!isPasswordsMatch) {
      throw new UnauthorizedException(`Invalid credentials has been provided`);
    }

    // generate the jwt token
    const payload: IJwtTokenPayload = {
      userId: existingUser.id,
      userEmail: existingUser.email,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      user: existingUser,
      token,
    };
  }
}
