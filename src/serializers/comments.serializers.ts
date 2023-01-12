import { ICommentRequest } from './../interfaces/comments.interface';
import * as yup from 'yup';
import { SchemaOf } from 'yup';

const commentRequestSerializer: SchemaOf<ICommentRequest> = yup.object().shape({
  text: yup.string().required(),
});

export { commentRequestSerializer };
