import { Film } from '../schema/Film.schema';

export class FilmResponse {
  constructor(film: Film) {
    return FilmResponse.fromModel(film);
  }
  id: string;
  name: string;
  description: string;
  releaseDate: Date;
  rating: number;
  ticketPrice: number;
  country: string;
  genre: string[];
  photo: string;
  slug: string;

  static fromModel(filmModel: Film): FilmResponse {
    const {
      _id: id,
      name,
      description,
      releaseDate,
      rating,
      ticketPrice,
      country,
      genre,
      photo,
      slug,
    } = filmModel;
    const response: FilmResponse = {
      id,
      name,
      description,
      releaseDate,
      rating,
      ticketPrice,
      country,
      genre,
      photo,
      slug,
    };
    return response;
  }

  static fromModelArray(filmModels: Film[]): FilmResponse[] {
    return filmModels.map((f) => FilmResponse.fromModel(f));
  }
}
