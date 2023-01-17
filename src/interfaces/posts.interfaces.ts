import Post from '../entities/posts.entities';
import { IUserResponse } from './users.interfaces';

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
  user: {
    id: string;
    username: string;
  };
}

export interface INewPost extends Post {
  likesCount: number;
  commentsCount: number;
}


export interface IResponseCreateLike {
  user: IUserResponse;
  post: IPost;
  id: string;
  createdAt: string;
}