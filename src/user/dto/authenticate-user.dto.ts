import { IsString, MinLength } from 'class-validator';

export class AuthenticateUserDto {
  @IsString()
  readonly userName: string;

  @IsString()
  readonly password: string;
}
