import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { IFilmRepository } from '../film/film.repository';
import { FilmService, IFilmService } from '../film/film.service';
import { Film } from '../film/schema/film.schema';
import { CommentRepository, ICommentRepository } from './comment.repository';
import { CommentService, ICommentService } from './comment.service';
import { AddCommentDto } from './dto/add-comment.dto';
import { Comment } from './schema/Comment.schema';

describe('CommentService', () => {
  let service: ICommentService;
  let filmService: IFilmService;
  let repo: ICommentRepository;
  const addCommentDto: AddCommentDto = {
    name: 'John',
    comment: 'comment',
    filmId: '',
  } as const;
  const comment: Comment = {
    name: 'John',
    comment: 'Nice movie!!',
    filmId: '',
  } as const;
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ICommentService,
          useClass: CommentService,
        },
        {
          provide: ICommentRepository,
          useClass: CommentRepository,
        },
        {
          provide: getModelToken(Comment.name),
          useValue: {},
        },
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

    service = module.get<ICommentService>(ICommentService);
    filmService = module.get<IFilmService>(IFilmService);
    repo = module.get<ICommentRepository>(ICommentRepository);
  });

  describe('add', () => {
    it('should throw NotFoundException if film does not exist', async () => {
      jest
        .spyOn(filmService, 'fetchById')
        .mockRejectedValue(new NotFoundException());
      await expect(service.add(addCommentDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return the newly added comment', async () => {
      jest.spyOn(filmService, 'fetchById').mockResolvedValue(film);
      jest.spyOn(repo, 'create').mockResolvedValue(comment);
      await expect(service.add(addCommentDto)).resolves.toBe(comment);
    });
  });
});
