import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmRepository, IFilmRepository } from './film.repository';
import { Film, FilmSchema } from './schema/film.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  providers: [
    {
      provide: IFilmRepository,
      useClass: FilmRepository,
    },
  ],
})
export class FilmModule {}
