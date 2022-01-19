import { Test, TestingModule } from '@nestjs/testing';
import { IFilmService } from '../film/film.service';
import { CommentController } from './comment.controller';
import { ICommentRepository } from './comment.repository';
import { CommentService, ICommentService } from './comment.service';

describe('CommentController', () => {
  let controller: CommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        {
          provide: ICommentService,
          useClass: CommentService,
        },
        {
          provide: ICommentRepository,
          useValue: {},
        },
        {
          provide: IFilmService,
          useValue: {},
        },
      ],
    }).compile();
    controller = module.get<CommentController>(CommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
