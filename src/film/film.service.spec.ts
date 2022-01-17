import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateFilmDto } from './dto/create-film.dto';
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
    slug: 'the-shawshank-redemption-1994',
  } as const;
  const createFilmDto: CreateFilmDto = { ...film, slug: undefined };

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

  describe('fetchAll', () => {
    it('should return all films', async () => {
      const allFilms = [film];
      jest.spyOn(repo, 'fetchAll').mockResolvedValue(allFilms);
      await expect(service.fetchAll()).resolves.toBe(allFilms);
    });
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

  describe('create', () => {
    it('should return the newly created film', async () => {
      jest.spyOn(service, 'generateSlug').mockResolvedValue(film.slug);
      jest.spyOn(repo, 'create').mockResolvedValue(film);

      await expect(service.create(createFilmDto)).resolves.toBe(film);
    });
  });

  describe('generateSlug', () => {
    it('should return slug without random number concatenated', async () => {
      jest.spyOn(repo, 'findBySlug').mockResolvedValue(null);
      await expect(service.generateSlug(film.name)).resolves.toBe(film.slug);
    });

    it('should return slug with random number concatenated', async () => {
      jest.spyOn(repo, 'findBySlug').mockResolvedValue(film);
      const now = 1234;
      jest.spyOn(Date, 'now').mockReturnValue(now);
      await expect(service.generateSlug(film.name)).resolves.toBe(
        `${film.slug}-${now}`,
      );
    });
  });
});
