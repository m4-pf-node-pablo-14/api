import { IComment, ICommentRequest } from './../interfaces/comments.interface';
import * as yup from 'yup';
import { SchemaOf } from 'yup';

const commentRequestSerializer: SchemaOf<ICommentRequest> = yup.object().shape({
  text: yup.string().required(),
});

const commentSerializer: SchemaOf<IComment> = yup.object().shape({
  post: yup.object().shape({
    id: yup.string().required(),
    description: yup.string().nullable(),
    img: yup.string().nullable()
  }),
  user: yup.object().shape({
    id: yup.string().required(),
    username: yup.string().required()
  }),
  updatedAt: yup.date().required(),
  createdAt: yup.date().required(),
  text: yup.string().required(),
  id: yup.string().required(),
})

export { commentRequestSerializer, commentSerializer };
