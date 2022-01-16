import { Injectable, Logger } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { IFilmRepository } from './film.repository';
import { Film } from './schema/film.schema';

export abstract class IFilmService {
  abstract create(createFilmDto: CreateFilmDto): Promise<Film>;
}

@Injectable()
export class FilmService implements IFilmService {
  private readonly logger = new Logger(FilmService.name);
  constructor(private filmRepository: IFilmRepository) {}

  async create(createFilmDto: CreateFilmDto): Promise<Film> {
    const film = await this.filmRepository.create(createFilmDto);
    this.logger.log(`New film created ${film}`);
    return film;
  }
}
