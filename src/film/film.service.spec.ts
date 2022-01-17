import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { FilmRepository, IFilmRepository } from './film.repository';
import { FilmService } from './film.service';
import { Film } from './schema/film.schema';

describe('FilmService', () => {
  let service: FilmService;
  let repo: IFilmRepository;
  const film: Film = {
    name: 'The Shawshank Redemption (1994)',
    description:
      'Andy Dufresne, a successful banker, is arrested for the murders of his wife and her lover, and is sentenced to life imprisonment at the Shawshank prison. He becomes the most unconventional prisoner.',
    releaseDate: new Date('Sep 17 1994'),
    rating: 4,
    ticketPrice: 10.99,
    country: 'USA',
    genre: Array('Drama'),
    photo:
      'https://images-na.ssl-images-amazon.com/images/P/B000P0J0EW.01._SX200_SCLZZZZZZZ_.jpg',
    slug: 'The-Shawshank-Redemption',
  } as const;

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
    repo = module.get<IFilmRepository>(IFilmRepository);
  });

  describe('fetchBySlug', () => {
    it('should throw NotFoundException for non existing film with the given slug', async () => {
      jest.spyOn(repo, 'findBySlug').mockResolvedValue(null);
      await expect(service.fetchBySlug('non-existing-slug')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return film instance for existing film with the given slug', async () => {
      jest.spyOn(repo, 'findBySlug').mockResolvedValue(film);
      await expect(service.fetchBySlug(film.slug)).resolves.toBe(film);
    });
  });
});
