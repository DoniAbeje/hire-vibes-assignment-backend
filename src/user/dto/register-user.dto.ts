import { IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  readonly userName: string;

  @MinLength(8)
  readonly password: string;
}
