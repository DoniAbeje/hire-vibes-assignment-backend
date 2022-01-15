import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './schema/user.schema';
import { IUserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';

export abstract class IUserService {
  abstract register(registerUserDto: RegisterUserDto): Promise<User>;
  abstract authenticate(
    authenticateUserDto: AuthenticateUserDto,
  ): Promise<User>;
}

@Injectable()
export class UserService implements IUserService {
  static readonly HASH_ROUNDS = 10;
  constructor(private userRepo: IUserRepository) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const user = await this.userRepo.findByUserName(registerUserDto.username);
    const hash = await bcrypt.hash(
      registerUserDto.password,
      UserService.HASH_ROUNDS,
    );
    if (user) {
      throw new HttpException('Duplicate userName', 400);
    }
    registerUserDto = { ...registerUserDto, password: hash };
    return this.userRepo.register(registerUserDto);
  }

  async authenticate(authUserDto: AuthenticateUserDto): Promise<User> {
    const user = await this.userRepo.findByUserName(authUserDto.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    const checkPassword = await bcrypt.compare(
      authUserDto.password,
      user.password,
    );
    if (!checkPassword) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
