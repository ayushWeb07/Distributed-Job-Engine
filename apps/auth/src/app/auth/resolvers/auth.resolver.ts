import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';
import { UserModel } from '../../users/models/user.model';
import { AuthService } from '../services/auth.service';
import { LoginUserInput } from '../inputs/login-user.input';
import type { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { IServerConfig } from '../../../config/interfaces/server_config.interface';
import { ILoginServiceResponseInterface } from '../interfaces/login-service-response.interface';

@Resolver(() => UserModel)
export class AuthResolver {
  private serverConfig: IServerConfig;

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
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
    const { user, token }: ILoginServiceResponseInterface =
      await this.authService.loginUser(loginUserInput);

    // set the token in the cookie
    context.res.cookie('token', token, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      maxAge: this.serverConfig.authJwtExpires * 1000,
    });

    return user;
  }
}
