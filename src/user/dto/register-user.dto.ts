import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  readonly username: string;

  @MinLength(8)
  readonly password: string;
}
