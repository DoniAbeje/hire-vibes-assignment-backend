import { Comment } from '../schema/Comment.schema';
import { CommentResponse } from './comment-response.dto';

describe('CommentResponse', () => {
  describe('constructor', () => {
    it('should return correct CommentResponse instance', () => {
      const comment: Comment = {
        _id: '61e809d883bc9fd7ef95ee65',
        name: 'John',
        comment: 'Nice movie!!',
        filmId: '61e809d883bc9fd7ef95ee65',
      } as const;

      const commentResponse: CommentResponse = {
        id: '61e809d883bc9fd7ef95ee65',
        name: 'John',
        comment: 'Nice movie!!',
        filmId: '61e809d883bc9fd7ef95ee65',
      };

      expect(new CommentResponse(comment)).toStrictEqual<CommentResponse>(
        commentResponse,
      );
    });
  });

  describe('fromModel', () => {
    it('should return correct CommentResponse instance', () => {
      const comment: Comment = {
        _id: '61e809d883bc9fd7ef95ee65',
        name: 'John',
        comment: 'Nice movie!!',
        filmId: '61e809d883bc9fd7ef95ee65',
      } as const;

      const commentResponse: CommentResponse = {
        id: '61e809d883bc9fd7ef95ee65',
        name: 'John',
        comment: 'Nice movie!!',
        filmId: '61e809d883bc9fd7ef95ee65',
      };

      expect(CommentResponse.fromModel(comment)).toStrictEqual<CommentResponse>(
        commentResponse,
      );
    });
  });

  describe('fromModelArray', () => {
    it('should return correct CommentResponse array', () => {
      const comment1: Comment = {
        _id: '61e809d883bc9fd7ef95ee65',
        name: 'John',
        comment: 'Nice movie!!',
        filmId: '61e809d883bc9fd7ef95ee65',
      } as const;

      const comment2: Comment = {
        _id: '61e809d883bc9fd7ef9545ee',
        name: 'John',
        comment: 'Nice movie!!',
        filmId: '61e809d883bc9fd7ef954533',
      } as const;

      const commentResponse1: CommentResponse = {
        id: '61e809d883bc9fd7ef95ee65',
        name: 'John',
        comment: 'Nice movie!!',
        filmId: '61e809d883bc9fd7ef95ee65',
      };

      const commentResponse2: CommentResponse = {
        id: '61e809d883bc9fd7ef9545ee',
        name: 'John',
        comment: 'Nice movie!!',
        filmId: '61e809d883bc9fd7ef954533',
      };

      expect(
        CommentResponse.fromModelArray([comment1, comment2]),
      ).toStrictEqual<CommentResponse[]>([commentResponse1, commentResponse2]);
    });
  });
});
