import Comment from '../entities/comments.entities';

export interface ICommentRequest {
  text: string;
}

export interface INewComment extends Comment {
  likesCount: number;
}
