import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { IFilmRepository } from './film.repository';
import { Film } from './schema/film.schema';
import * as makeSlug from 'slug';

export abstract class IFilmService {
  abstract fetchBySlug(slug: string): Promise<Film>;
  abstract fetchAll(): Promise<Film[]>;
  abstract create(createFilmDto: CreateFilmDto): Promise<Film>;
}

@Injectable()
export class FilmService implements IFilmService {
  private readonly logger = new Logger(FilmService.name);
  constructor(private filmRepository: IFilmRepository) {}

  fetchAll(): Promise<Film[]> {
    return this.filmRepository.fetchAll();
  }

  async fetchBySlug(slug: string): Promise<Film> {
    const film = await this.filmRepository.findBySlug(slug);
    if (!film) {
      throw new NotFoundException();
    }
    return film;
  }
  async create(createFilmDto: CreateFilmDto): Promise<Film> {
    const slug = await this.generateSlug(createFilmDto.name);
    createFilmDto = { ...createFilmDto, slug };
    const film = await this.filmRepository.create(createFilmDto);
    this.logger.log(`New film created ${film}`);
    return film;
  }

  async generateSlug(text: string) {
    let slug = makeSlug(text);
    const film = await this.filmRepository.findBySlug(slug);
    if (film) {
      return `${slug}-${Date.now()}`;
    }
    return slug;
  }
}
