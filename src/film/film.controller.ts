import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from '../user/jwt.guard';
import { CreateFilmDto } from './dto/create-film.dto';
import { IFilmService } from './film.service';

@Controller('film')
export class FilmController {
  constructor(private filmService: IFilmService) {}
  
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Post('/')
  async create(@Body() createFilmDto: CreateFilmDto) {
    return await this.filmService.create(createFilmDto);
  }

  @Get('/')
  async fetchAll(){
    return await this.filmService.fetchAll();
  }
}
