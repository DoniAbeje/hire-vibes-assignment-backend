import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { IFilmRepository } from '../film/film.repository';
import { FilmService, IFilmService } from '../film/film.service';
import { CommentRepository, ICommentRepository } from './comment.repository';
import { CommentService, ICommentService } from './comment.service';
import { Comment } from './schema/Comment.schema';

describe('CommentService', () => {
  let service: ICommentService;

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
          useValue: FilmService,
        },
        {
          provide: IFilmRepository,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ICommentService>(ICommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
