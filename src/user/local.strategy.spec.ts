import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LocalStrategy } from './local.strategy';
import { User } from './schema/user.schema';
import { IUserRepository } from './user.repository';
import { IUserService, UserService } from './user.service';

describe('UserRepository', () => {
  let localStrategy: LocalStrategy;
  let userService: IUserService;
  const user: User = { username: 'john', password: 'password' } as const;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: IUserService,
          useClass: UserService,
        },
        {
          provide: IUserRepository,
          useValue: {},
        },
      ],
    }).compile();

    localStrategy = module.get<LocalStrategy>(LocalStrategy);
    userService = module.get<IUserService>(IUserService);
  });

  it('should return user for authenticated user', async () => {
    const { username, password } = user;
    jest.spyOn(userService, 'authenticate').mockResolvedValue(user);
    await expect(localStrategy.validate(username, password)).resolves.toBe(
      user,
    );
  });

  it('should throw UnauthorizedException for unauthenticated user', async () => {
    const { username, password } = user;
    jest.spyOn(userService, 'authenticate').mockResolvedValue(null);
    await expect(localStrategy.validate(username, password)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
