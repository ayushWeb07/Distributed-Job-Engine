import { Args, Mutation, Resolver, Context, Query } from '@nestjs/graphql';
import { UserModel } from '../../users/models/user.model';
import { AuthService } from '../services/auth.service';
import { LoginUserInput } from '../inputs/login-user.input';
import type { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { IServerConfig } from '../../../config/interfaces/server_config.interface';
import { ILoginServiceResponse } from '../interfaces/login-service-response.interface';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '../guards/gql-jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { IJwtTokenPayload } from '../interfaces/jwt-token-payload.interface';
import { UsersService } from '../../users/services/users.service';

@Resolver(() => UserModel)
export class AuthResolver {
  private serverConfig: IServerConfig;

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {
    // get the server config
    const serverConfig = this.configService.get<IServerConfig>('server');

    if (!serverConfig) {
      throw new Error('Server configuration must be setup');
    }

    this.serverConfig = serverConfig;
  }

  @Mutation(() => UserModel)
  async loginUser(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context: { res: Response },
  ): Promise<UserModel> {
    // call the login auth service
    const { user, token }: ILoginServiceResponse =
      await this.authService.loginUser(loginUserInput);

    // set the token in the cookie
    context.res.cookie('token', token, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      maxAge: this.serverConfig.authJwtExpires * 1000,
    });

    return user;
  }

  @Query(() => UserModel)
  @UseGuards(GqlJwtAuthGuard)
  async getProfile(
    @CurrentUser() currentUser: IJwtTokenPayload,
  ): Promise<UserModel> {
    // call the find user by id service
    return await this.usersService.findUserById({
      id: currentUser.userId,
    });
  }
}
