import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IUserLogin,
  IUserRequest,
  IUserResponse,
  IUserUpdate,
} from "../interfaces/users.interfaces";

const userSerializer: SchemaOf<IUserRequest> = yup.object().shape({
  bio: yup.string().notRequired(),
  email: yup.string().email().required(),
  last_name: yup.string().required(),
  name: yup.string().required(),
  password: yup.string().required(),
  username: yup.string().required(),
  isAdm: yup.boolean().notRequired(),
  address: yup.object().shape({
    city: yup.string().required(),
    district: yup.string().required(),
    number: yup.string().required(),
    state: yup.string().max(2).required(),
    zipCode: yup.string().max(8).required(),
  }),
});

const userLoginSerializer: SchemaOf<IUserLogin> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const userUpdateSerializer: SchemaOf<IUserUpdate> = yup
  .object()
  .shape({
    bio: yup.string(),
    email: yup.string().email(),
    last_name: yup.string(),
    name: yup.string(),
    password: yup.string(),
    username: yup.string(),
    address: yup.object().shape({
      district: yup.string().notRequired(),
      zipCode: yup.string().max(8).notRequired(),
      number: yup.string().notRequired(),
      city: yup.string().notRequired(),
      state: yup.string().max(2).notRequired(),
    }),
  })
  .noUnknown(true)
  .nullable();

const userResponserSerializer: SchemaOf<IUserResponse> = yup.object().shape({
  address: yup.object().shape({
    id: yup.string(),
    city: yup.string(),
    district: yup.string(),
    number: yup.string(),
    state: yup.string().max(2),
    zipCode: yup.string().max(8),
  }),
  bio: yup.string().nullable(),
  last_name: yup.string(),
  name: yup.string(),
  username: yup.string(),
  email: yup.string().email(),
  id: yup.string().uuid(),
});

const listUsersSerializer: yup.ArraySchema<SchemaOf<IUserResponse>> =
  yup.array(userResponserSerializer);

export {
  userSerializer,
  userLoginSerializer,
  userUpdateSerializer,
  userResponserSerializer,
  listUsersSerializer,
};
