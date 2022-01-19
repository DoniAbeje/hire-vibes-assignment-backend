import { Film } from '../schema/Film.schema';
import { FilmResponse } from './film-response.dto';

describe('FilmResponse', () => {
  describe('constructor', () => {
    it('should return correct FilmResponse instance', () => {
      const film: Film = {
        _id: '61e809d883bc9fd7ef95ee65',
        name: 'The Shawshank Redemption (1994)',
        description:
          'Andy Dufresne, a successful banker, is arrested for the murders of his wife and her lover, and is sentenced to life imprisonment at the Shawshank prison. He becomes the most unconventional prisoner.',
        releaseDate: new Date('Sep 17 1994'),
        rating: 4,
        ticketPrice: 10.99,
        country: 'USA',
        genre: Array('Drama'),
        photo:
          'https://images-na.ssl-images-amazon.com/images/P/B000P0J0EW.01._SX200_SCLZZZZZZZ_.jpg',
        slug: 'the-shawshank-redemption-1994',
      } as const;

      const filmResponse: FilmResponse = {
        id: '61e809d883bc9fd7ef95ee65',
        name: 'The Shawshank Redemption (1994)',
        description:
          'Andy Dufresne, a successful banker, is arrested for the murders of his wife and her lover, and is sentenced to life imprisonment at the Shawshank prison. He becomes the most unconventional prisoner.',
        releaseDate: new Date('Sep 17 1994'),
        rating: 4,
        ticketPrice: 10.99,
        country: 'USA',
        genre: Array('Drama'),
        photo:
          'https://images-na.ssl-images-amazon.com/images/P/B000P0J0EW.01._SX200_SCLZZZZZZZ_.jpg',
        slug: 'the-shawshank-redemption-1994',
      };

      expect(new FilmResponse(film)).toStrictEqual<FilmResponse>(filmResponse);
    });
  });

  describe('fromModel', () => {
    it('should return correct FilmResponse instance', () => {
      const film: Film = {
        _id: '61e809d883bc9fd7ef95ee65',
        name: 'The Shawshank Redemption (1994)',
        description:
          'Andy Dufresne, a successful banker, is arrested for the murders of his wife and her lover, and is sentenced to life imprisonment at the Shawshank prison.',
        releaseDate: new Date('Sep 17 1994'),
        rating: 4,
        ticketPrice: 10.99,
        country: 'USA',
        genre: Array('Drama'),
        photo:
          'https://images-na.ssl-images-amazon.com/images/P/B000P0J0EW.01._SX200_SCLZZZZZZZ_.jpg',
        slug: 'the-shawshank-redemption-1994',
      } as const;

      const filmResponse: FilmResponse = {
        id: '61e809d883bc9fd7ef95ee65',
        name: 'The Shawshank Redemption (1994)',
        description:
          'Andy Dufresne, a successful banker, is arrested for the murders of his wife and her lover, and is sentenced to life imprisonment at the Shawshank prison.',
        releaseDate: new Date('Sep 17 1994'),
        rating: 4,
        ticketPrice: 10.99,
        country: 'USA',
        genre: Array('Drama'),
        photo:
          'https://images-na.ssl-images-amazon.com/images/P/B000P0J0EW.01._SX200_SCLZZZZZZZ_.jpg',
        slug: 'the-shawshank-redemption-1994',
      };

      expect(FilmResponse.fromModel(film)).toStrictEqual<FilmResponse>(
        filmResponse,
      );
    });
  });

  describe('fromModelArray', () => {
    it('should return correct FilmResponse array', () => {
      const film1: Film = {
        _id: '61e809d883bc9fd7ef95ee65',
        name: 'The Shawshank Redemption (1994)',
        description:
          'Andy Dufresne, a successful banker, is arrested for the murders of his wife and her lover, and is sentenced to life imprisonment at the Shawshank prison. He becomes the most unconventional prisoner.',
        releaseDate: new Date('Sep 17 1994'),
        rating: 4,
        ticketPrice: 10.99,
        country: 'USA',
        genre: Array('Drama'),
        photo:
          'https://images-na.ssl-images-amazon.com/images/P/B000P0J0EW.01._SX200_SCLZZZZZZZ_.jpg',
        slug: 'the-shawshank-redemption-1994',
      } as const;

      const film2: Film = {
        _id: '61e809d883bc9fd7ef9545ee',
        name: 'Spider-Man: No Way Home',
        description:
          "With Spider-Man's identity now revealed, our friendly neighborhood web-slinger is unmasked and no longer able to separate his normal life as Peter Parker from the high stakes of being a superhero. ",
        releaseDate: new Date('Dec 17 2021'),
        rating: 5,
        ticketPrice: 199,
        country: 'USA',
        genre: Array('Action'),
        photo:
          'https://www.themarysue.com/wp-content/uploads/2019/02/spider-man-civil-war.jpg',
        slug: 'spider-man-no-way-home',
      } as const;

      const filmResponse1: FilmResponse = {
        id: '61e809d883bc9fd7ef95ee65',
        name: 'The Shawshank Redemption (1994)',
        description:
          'Andy Dufresne, a successful banker, is arrested for the murders of his wife and her lover, and is sentenced to life imprisonment at the Shawshank prison. He becomes the most unconventional prisoner.',
        releaseDate: new Date('Sep 17 1994'),
        rating: 4,
        ticketPrice: 10.99,
        country: 'USA',
        genre: Array('Drama'),
        photo:
          'https://images-na.ssl-images-amazon.com/images/P/B000P0J0EW.01._SX200_SCLZZZZZZZ_.jpg',
        slug: 'the-shawshank-redemption-1994',
      };

      const filmResponse2: FilmResponse = {
        id: '61e809d883bc9fd7ef9545ee',
        name: 'Spider-Man: No Way Home',
        description:
          "With Spider-Man's identity now revealed, our friendly neighborhood web-slinger is unmasked and no longer able to separate his normal life as Peter Parker from the high stakes of being a superhero. ",
        releaseDate: new Date('Dec 17 2021'),
        rating: 5,
        ticketPrice: 199,
        country: 'USA',
        genre: Array('Action'),
        photo:
          'https://www.themarysue.com/wp-content/uploads/2019/02/spider-man-civil-war.jpg',
        slug: 'spider-man-no-way-home',
      };

      expect(FilmResponse.fromModelArray([film1, film2])).toStrictEqual<
        FilmResponse[]
      >([filmResponse1, filmResponse2]);
    });
  });
});
