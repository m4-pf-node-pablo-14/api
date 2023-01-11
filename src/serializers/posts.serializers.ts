import { IPostRequest } from './../interfaces/posts/index';
import * as yup from 'yup';
import { SchemaOf } from 'yup';

export const postRequestSerializer: SchemaOf<IPostRequest> = yup.object().shape({
    img: yup.string().nullable(),
    description: yup.string().nullable()
});
