import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddCommentDto } from './dto/add-comment.dto';
import { Comment, CommentDocument } from './schema/Comment.schema';

export abstract class ICommentRepository {
  abstract create(addCommentDto: AddCommentDto): Promise<Comment>;
}

@Injectable()
export class CommentRepository implements ICommentRepository {
  constructor(
    @InjectModel(Comment.name) private CommentModel: Model<CommentDocument>,
  ) {}

  create(addCommentDto: AddCommentDto): Promise<Comment> {
    return this.CommentModel.create(addCommentDto);
  }
}
