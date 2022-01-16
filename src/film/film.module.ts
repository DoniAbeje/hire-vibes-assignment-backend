import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmRepository, IFilmRepository } from './film.repository';
import { FilmService, IFilmService } from './film.service';
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
    {
      provide: IFilmService,
      useClass: FilmService,
    },
  ],
})
export class FilmModule {}
