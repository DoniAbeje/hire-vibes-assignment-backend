import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from '../user/jwt.guard';
import { ICommentService } from './comment.service';
import { AddCommentDto } from './dto/add-comment.dto';
import { CommentResponse } from './dto/comment-response.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: ICommentService) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Post('/')
  async add(@Body() addCommentDto: AddCommentDto) {
    const comment = await this.commentService.add(addCommentDto);
    return new CommentResponse(comment);
  }

  @Get('film/:filmId')
  async fetchByFilmId(@Param('filmId') filmId) {
    const comments = await this.commentService.fetchByFilmId(filmId);
    return CommentResponse.fromModelArray(comments);
  }
}
