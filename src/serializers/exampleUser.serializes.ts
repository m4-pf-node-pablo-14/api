import * as yup from 'yup';
import { SchemaOf } from 'yup';
import { IUserRequest, IUserResponse } from '../interfaces/examples.interfaces';

const userSerializer: SchemaOf<IUserRequest> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const userResponserSerializer: SchemaOf<IUserResponse> = yup.object().shape({
  id: yup.string().uuid(),
  email: yup.string().email(),
  password: yup.string(),
});

const listUserSerializer: yup.ArraySchema<SchemaOf<IUserResponse>> = yup.array(
  userResponserSerializer,
);

export { userSerializer, userResponserSerializer, listUserSerializer };
