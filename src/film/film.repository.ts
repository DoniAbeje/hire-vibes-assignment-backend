import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFilmDto } from './dto/create-film.dto';
import { Film, FilmDocument } from './schema/film.schema';

export abstract class IFilmRepository {
  abstract create(createFilmDto: CreateFilmDto): Promise<Film>;
}

@Injectable()
export class FilmRepository implements IFilmRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  create(createFilmDto: CreateFilmDto): Promise<Film> {
    return this.filmModel.create(createFilmDto);
  }
}