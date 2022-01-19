import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from '../user/jwt.guard';
import { CreateFilmDto } from './dto/create-film.dto';
import { FilmResponse } from './dto/film-response.dto';
import { IFilmService } from './film.service';

@Controller('film')
export class FilmController {
  constructor(private filmService: IFilmService) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Post('/')
  async create(@Body() createFilmDto: CreateFilmDto) {
    const film = await this.filmService.create(createFilmDto);
    return new FilmResponse(film);
  }

  @Get('/')
  async fetchAll() {
    const films = await this.filmService.fetchAll();
    return FilmResponse.fromModelArray(films);
  }

  @Get('/:slug')
  async fetchBySlug(@Param('slug') slug) {
    const film = await this.filmService.fetchBySlug(slug);
    return new FilmResponse(film);
  }
}
