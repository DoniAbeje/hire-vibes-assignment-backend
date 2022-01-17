import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { FilmRepository, IFilmRepository } from './film.repository';
import { FilmService } from './film.service';
import { Film } from './schema/film.schema';

describe('FilmService', () => {
  let service: FilmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmService,
        {
          provide: IFilmRepository,
          useClass: FilmRepository,
        },
        {
          provide: getModelToken(Film.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<FilmService>(FilmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
