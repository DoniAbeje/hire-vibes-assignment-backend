import { Test, TestingModule } from '@nestjs/testing';
import { FilmController } from './film.controller';
import { IFilmRepository } from './film.repository';
import { FilmService, IFilmService } from './film.service';

describe('FilmController', () => {
  let controller: FilmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmController],
      providers: [
        {
          provide: IFilmService,
          useClass: FilmService,
        },
        {
          provide: IFilmRepository,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<FilmController>(FilmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
