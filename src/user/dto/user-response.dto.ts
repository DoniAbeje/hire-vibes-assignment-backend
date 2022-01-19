import { User } from '../schema/User.schema';

export class UserResponse {
  constructor(user: User) {
    return UserResponse.fromModel(user);
  }
  id: string;
  username: string;

  static fromModel(userModel: User): UserResponse {
    const { _id: id, username } = userModel;
    const response: UserResponse = { id, username };
    return response;
  }

  static fromModelArray(userModels: User[]): UserResponse[] {
    return userModels.map((u) => UserResponse.fromModel(u));
  }
}
