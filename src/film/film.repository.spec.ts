import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Film } from './schema/Film.schema';
import { IFilmRepository, FilmRepository } from './Film.repository';

describe('FilmRepository', () => {
  let repo: IFilmRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmRepository,
        {
          provide: getModelToken(Film.name),
          useValue: {},
        },
      ],
    }).compile();

    repo = module.get<FilmRepository>(FilmRepository);
  });

  it('should define FilmRepository', async () => {
    await expect(repo).toBeDefined();
  });
});
