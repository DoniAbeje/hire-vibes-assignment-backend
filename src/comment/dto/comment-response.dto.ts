import { Comment } from '../schema/Comment.schema';

export class CommentResponse {
  constructor(comment: Comment) {
    return CommentResponse.fromModel(comment);
  }
  
  name: string;
  comment: string;
  filmId: string;

  static fromModel(commentModel: Comment): CommentResponse {
    const { name, comment, filmId } = commentModel;
    const response: CommentResponse = { name, comment, filmId };
    return response;
  }

  static fromModelArray(commentModels: Comment[]): CommentResponse[] {
    return commentModels.map((c) => CommentResponse.fromModel(c));
  }
}
