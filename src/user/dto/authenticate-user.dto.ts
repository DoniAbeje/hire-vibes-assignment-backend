import { IsString, MinLength } from 'class-validator';

export class AuthenticateUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
