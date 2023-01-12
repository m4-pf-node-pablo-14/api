import { IPostRequest } from '../interfaces/posts.interfaces';
import * as yup from 'yup';
import { SchemaOf } from 'yup';

const postRequestSerializer: SchemaOf<IPostRequest> = yup.object().shape({
  img: yup.string().nullable(),
  description: yup.string().nullable(),
});

export { postRequestSerializer };
