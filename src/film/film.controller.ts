import { Body, Controller, Post } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { IFilmService } from './film.service';

@Controller('film')
export class FilmController {
  constructor(private filmService: IFilmService) {}

  @Post('/')
  async create(@Body() createFilmDto: CreateFilmDto) {
    return await this.filmService.create(createFilmDto);
  }
}
