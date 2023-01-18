import { IPost, IResponseCreateLike, IResponseCreateLikeComment } from './../interfaces/posts.interfaces';
import { IPostRequest } from '../interfaces/posts.interfaces';
import * as yup from 'yup';
import { SchemaOf } from 'yup';

const postRequestSerializer: SchemaOf<IPostRequest> = yup.object().shape({
  img: yup.string().nullable(),
  description: yup.string().nullable(),
});

const postSerializar: SchemaOf<IPost> = yup.object().shape({
  user: yup.object().shape({
    username: yup.string().required(),
    id: yup.string().required(),
  }),
  updateAt: yup.date().required(),
  createdAt: yup.date().required(),
  description: yup.string().nullable(),
  img: yup.string().nullable(),
  id: yup.string().required(),
});

const responseCreateLikePostSerializer: SchemaOf<IResponseCreateLike> = yup
  .object()
  .shape({
    id: yup.string().required(),
    createdAt: yup.date().required(),
    user: yup.object().shape({
      username: yup.string(),
      id: yup.string().uuid(),
    }),
    post: yup.object().shape({
      description: yup.string().nullable(),
      img: yup.string().nullable(),
      id: yup.string().required(),
    })
  });

const responseCreateLikeCommentSerializer: SchemaOf<IResponseCreateLikeComment> = yup
  .object()
  .shape({
    id: yup.string().required(),
    createdAt: yup.date().required(),
    user: yup.object().shape({
      username: yup.string(),
      id: yup.string().uuid(),
    }),
    comment: yup.object().shape({
      text: yup.string().nullable(),
      id: yup.string().required(),
    }),
  });

export {
  postRequestSerializer,
  postSerializar,
  responseCreateLikePostSerializer,
  responseCreateLikeCommentSerializer
};
