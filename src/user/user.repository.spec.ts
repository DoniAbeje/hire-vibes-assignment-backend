import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './schema/user.schema';
import { IUserRepository, UserRepository } from './user.repository';

describe('UserRepository', () => {
  let repo: IUserRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getModelToken(User.name),
          useClass: MockUserModel,
        },
      ],
    }).compile();

    repo = module.get<UserRepository>(UserRepository);
  });

  it('should define UserRepository', async () => {
    await expect(repo).toBeDefined();
  });
});

class MockUserModel {
  async create(): Promise<User> {
    return null;
  }

  findOne(): Promise<User> {
    return null;
  }
}
