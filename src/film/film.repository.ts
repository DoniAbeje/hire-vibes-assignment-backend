import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFilmDto } from './dto/create-film.dto';
import { Film, FilmDocument } from './schema/film.schema';

export abstract class IFilmRepository {
  abstract fetchAll(): Promise<Film[]>;
  abstract create(createFilmDto: CreateFilmDto): Promise<Film>;
  abstract findBySlug(slug: string);
}

@Injectable()
export class FilmRepository implements IFilmRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  fetchAll(): Promise<Film[]> {
    return this.filmModel.find().exec();
  }

  create(createFilmDto: CreateFilmDto): Promise<Film> {
    return this.filmModel.create(createFilmDto);
  }

  findBySlug(slug: string) {
    return this.filmModel.findOne({ slug });
  }
}
