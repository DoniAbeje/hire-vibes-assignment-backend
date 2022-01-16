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
      const user: User = { username: 'john', password: 'password' };
      const dto: RegisterUserDto = { username: 'john', password: 'password' };
      jest.spyOn(repo, 'findByUserName').mockResolvedValue(user);

      const exception = new HttpException('Duplicate userName', 400);
      await expect(service.register(dto)).rejects.toThrow(exception);
    });
  });
});
