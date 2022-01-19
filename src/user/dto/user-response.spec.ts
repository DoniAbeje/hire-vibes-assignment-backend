import { User } from '../schema/User.schema';
import { UserResponse } from './user-response.dto';

describe('UserResponse', () => {
  describe('constructor', () => {
    it('should return correct UserResponse instance', () => {
      const user: User = {
        _id: '61e809d883bc9fd7ef95ee65',
        username: 'john',
        password: 'password',
      } as const;

      const userResponse: UserResponse = {
        id: '61e809d883bc9fd7ef95ee65',
        username: 'john',
      };

      expect(new UserResponse(user)).toStrictEqual<UserResponse>(userResponse);
    });
  });

  describe('fromModel', () => {
    it('should return correct UserResponse instance', () => {
      const user: User = {
        _id: '61e809d883bc9fd7ef95ee65',
        username: 'john',
        password: 'password',
      } as const;

      const userResponse: UserResponse = {
        id: '61e809d883bc9fd7ef95ee65',
        username: 'john',
      };

      expect(UserResponse.fromModel(user)).toStrictEqual<UserResponse>(
        userResponse,
      );
    });
  });

  describe('fromModelArray', () => {
    it('should return correct UserResponse array', () => {
      const user1: User = {
        _id: '61e809d883bc9fd7ef95ee65',
        username: 'John',
        password: 'password',
      } as const;

      const user2: User = {
        _id: '61e809d883bc9fd7ef9545ee',
        username: 'Michael',
        password: 'second-password',
      } as const;

      const userResponse1: UserResponse = {
        id: '61e809d883bc9fd7ef95ee65',
        username: 'John',
      };

      const userResponse2: UserResponse = {
        id: '61e809d883bc9fd7ef9545ee',
        username: 'Michael',
      };

      expect(UserResponse.fromModelArray([user1, user2])).toStrictEqual<
        UserResponse[]
      >([userResponse1, userResponse2]);
    });
  });
});
