import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmModule } from '../film/film.module';
import { CommentRepository, ICommentRepository } from './comment.repository';
import { CommentService, ICommentService } from './comment.service';
import { Comment, CommentSchema } from './schema/Comment.schema';
import { CommentController } from './comment.controller';

@Module({
  imports: [
    FilmModule,
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  providers: [
    {
      provide: ICommentService,
      useClass: CommentService,
    },
    {
      provide: ICommentRepository,
      useClass: CommentRepository,
    },
  ],
  controllers: [CommentController],
})
export class CommentModule {}
