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

@Controller('comment')
export class CommentController {
  constructor(private commentService: ICommentService) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Post('/')
  async add(@Body() addCommentDto: AddCommentDto) {
    return await this.commentService.add(addCommentDto);
  }

  @Get('film/:filmId')
  async fetchByFilmId(@Param('filmId') filmId) {
    await this.commentService.fetchByFilmId(filmId);
  }
}
