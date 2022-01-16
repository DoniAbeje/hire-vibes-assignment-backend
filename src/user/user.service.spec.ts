import { HttpException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './schema/user.schema';
import { IUserRepository, UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let repo: IUserRepository;
  const user: User = { username: 'john', password: 'password' } as const;
  const registerUserDto: RegisterUserDto = {
    username: 'john',
    password: 'password',
  } as const;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: IUserRepository,
          useClass: UserRepository,
        },
        {
          provide: getModelToken(User.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<IUserRepository>(IUserRepository);
  });

  describe('register', () => {
    it('should throw HttpException for duplicate username', async () => {
      jest.spyOn(repo, 'findByUserName').mockResolvedValue(user);

      const exception = new HttpException('Duplicate userName', 400);
      await expect(service.register(registerUserDto)).rejects.toThrow(
        exception,
      );
    });

    it('should register user successfully', async () => {
      jest.spyOn(repo, 'findByUserName').mockResolvedValue(null);
      jest.spyOn(repo, 'register').mockResolvedValue(user);

      await expect(service.register(registerUserDto)).resolves.toBe(user);
    });
  });

  describe('authenticate', () => {
    it('should return null for non existing user', async () => {
      jest.spyOn(repo, 'findByUserName').mockResolvedValue(null);
      const { username, password } = user;
      await expect(
        service.authenticate(username, password),
      ).resolves.toBeNull();
    });
  });
});
