import Post from '../entities/posts.entities';

export interface IPostRequest {
  img?: string;
  description?: string;
}

export interface IPost {
  id: string;
  img?: string;
  description?: string;
  createdAt: Date;
  updateAt: Date;
}

export interface INewPost extends Post {
  likesCount: number;
  commentsCount: number;
}
