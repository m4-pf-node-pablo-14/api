import { IPost, IResponseCreateLike } from "./../interfaces/posts.interfaces";
import { IPostRequest } from "../interfaces/posts.interfaces";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { userResponserSerializer } from "./user.serializes";

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

const responseCreateLikePostSerializer: SchemaOf<any> = yup.object().shape({
  user: yup.object().shape({
    last_name: yup.string(),
    name: yup.string(),
    username: yup.string(),
    email: yup.string().email(),
    id: yup.string().uuid(),
  }),
  post: yup.object().shape({
    description: yup.string().nullable(),
    img: yup.string().nullable(),
    id: yup.string().required(),
  }),
  id: yup.string().required(),
  createdAt: yup.date().required(),
});

export { postRequestSerializer, postSerializar, responseCreateLikePostSerializer };
