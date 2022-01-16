import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './schema/user.schema';
import { UserController } from './user.controller';
import { IUserRepository, UserRepository } from './user.repository';
import { IUserService, UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: JwtService, useValue: {} },
        {
          provide: IUserService,
          useClass: UserService,
        },
        {
          provide: IUserRepository,
          useClass: UserRepository,
        },
        {
          provide: getModelToken(User.name),
          useValue: {},
        },
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should define UserController', async () => {
    await expect(controller).toBeDefined();
  });
});
