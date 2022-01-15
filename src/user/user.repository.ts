import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from './dto/register-user.dto';
import { User, UserDocument } from './schema/user.schema';

export abstract class IUserRepository {
  abstract register(registerUserDto: RegisterUserDto): Promise<User>;
  abstract findByUserName(userName: String): Promise<User>;
}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  register(registerUserDto: RegisterUserDto): Promise<User> {
    return this.userModel.create(registerUserDto);
  }

  async findByUserName(userName: String): Promise<User> {
    return this.userModel.findOne({ userName });
  }
}
