import { ArgsType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

@ArgsType()
export class FindUserByIdArg {
  @Field()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
