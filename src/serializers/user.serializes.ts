import * as yup from 'yup';
import { SchemaOf } from 'yup';
import {
  IUserLogin,
  IUserRequest,
  IUserResponse,
  IUserUpdate,
} from '../interfaces/users.interfaces';

const userSerializer: SchemaOf<IUserRequest> = yup.object().shape({
  bio: yup.string().required(),
  email: yup.string().email().required(),
  last_name: yup.string().required(),
  name: yup.string().required(),
  password: yup.string().required(),
  username: yup.string().required(),
});

const userLoginSerializer: SchemaOf<IUserLogin> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const userUpdateSerializer: SchemaOf<IUserUpdate> = yup.object().shape({
  bio: yup.string(),
  email: yup.string().email(),
  last_name: yup.string(),
  name: yup.string(),
  password: yup.string(),
  username: yup.string(),
});

const userResponserSerializer: SchemaOf<IUserResponse> = yup.object().shape({
  id: yup.string().uuid(),
  bio: yup.string(),
  email: yup.string().email(),
  last_name: yup.string(),
  name: yup.string(),
  password: yup.string(),
  username: yup.string(),
});

const listUserSerializer: yup.ArraySchema<SchemaOf<IUserResponse>> = yup.array(
  userResponserSerializer,
);

export {
  userSerializer,
  userLoginSerializer,
  userUpdateSerializer,
  userResponserSerializer,
  listUserSerializer,
};