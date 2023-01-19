import Post from '../entities/posts.entities';

export interface IPostRequest {
  img?: string;
  description?: string;
}

export interface IPost extends IPostRequest {
  id: string;
  createdAt: Date;
  updatedAt: Date;
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
  user: {
    id: string;
    username: string;
  };
  post: {
    description?: string;
    img?: string;
    id: string;
  };
  id: string;
  createdAt: Date;
}

export interface IResponseCreateLikeComment {
  user: {
    id: string;
    username: string;
  };
  comment: {
    text: string;
    id: string;
  };
  id: string;
  createdAt: Date;
}
