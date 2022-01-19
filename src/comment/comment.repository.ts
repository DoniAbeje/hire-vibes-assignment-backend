import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddCommentDto } from './dto/add-comment.dto';
import { Comment, CommentDocument } from './schema/comment.schema';

export abstract class ICommentRepository {
  abstract create(addCommentDto: AddCommentDto): Promise<Comment>;
  abstract findByFilmId(filmId: string): Promise<Comment[]>;
}

@Injectable()
export class CommentRepository implements ICommentRepository {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  create(addCommentDto: AddCommentDto): Promise<Comment> {
    return this.commentModel.create(addCommentDto);
  }

  findByFilmId(filmId: string): Promise<Comment[]> {
    return this.commentModel.find({ filmId }).exec();
  }
}
