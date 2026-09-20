import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from '../models/user.model';
import { UsersService } from '../services/users.service';
import { CreateUserInput } from '../inputs/create-user.input';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserModel])
  async findAllUsers(): Promise<UserModel[]> {
    return await this.usersService.findAll();
  }

  @Mutation(() => UserModel)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {}
}
