import { User } from '../schema/User.schema';

export class UserResponse {
  constructor(user: User) {
    return UserResponse.fromModel(user);
  }
  username: string;

  static fromModel(userModel: User): UserResponse {
    const { username } = userModel;
    const response: UserResponse = { username };
    return response;
  }

  static fromModelArray(userModels: User[]): UserResponse[] {
    return userModels.map((u) => UserResponse.fromModel(u));
  }
}
