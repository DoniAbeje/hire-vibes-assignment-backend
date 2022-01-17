import { Injectable, NotFoundException } from '@nestjs/common';
import { IFilmService } from '../film/film.service';
import { ICommentRepository } from './comment.repository';
import { AddCommentDto } from './dto/add-comment.dto';
import { Comment } from './schema/Comment.schema';

export abstract class ICommentService {
  abstract add(addCommentDto: AddCommentDto): Promise<Comment>;
  abstract fetchByFilmId(filmId: string): Promise<Comment[]>;
}

@Injectable()
export class CommentService implements ICommentService {
  constructor(
    private commentRepository: ICommentRepository,
    private filmService: IFilmService,
  ) {}

  async add(addCommentDto: AddCommentDto): Promise<Comment> {
    // check if film exists
    await this.filmService.fetchById(addCommentDto.filmId);
    return this.commentRepository.create(addCommentDto);
  }

  async fetchByFilmId(filmId: string): Promise<Comment[]> {
    await this.filmService.fetchById(filmId);
    return this.commentRepository.findByFilmId(filmId);
  }
}
