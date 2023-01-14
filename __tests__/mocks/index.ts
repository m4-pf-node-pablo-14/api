import { ICommentRequest } from '../../src/interfaces/comments.interface';

import { IPostRequest } from '../../src/interfaces/posts.interfaces';
import {
  IUserLogin,
  IUserRequest,
} from '../../src/interfaces/users.interfaces';

const mockedUserRequest: IUserRequest = {
  name: 'vinicius',
  last_name: 'quirino',
  password: '12345678Vv.',
  email: 'vinicius123@hotmail.com',
  username: 'vini123',
  bio: 'Dev Senior',
  address: {
    city: 'Santa Quitéria',
    district: 'Rua Jerusalém',
    number: '72',
    state: 'CE',
    zipCode: '62280000',
  },
};

const mockedUserRequestTwo: IUserRequest = {
  name: 'Lucas',
  last_name: 'Bueno',
  password: '12345678Vv.',
  email: 'Lucas@hotmail.com',
  username: 'Lucas123',
  bio: 'Dev Senior',
  address: {
    city: 'Florianopolis',
    district: 'Vila Doideira',
    number: '72',
    state: 'SC',
    zipCode: '17340487',
  },
};

const mockedLoginRequest: IUserLogin = {
  email: 'vinicius123@hotmail.com',
  password: '12345678Vv.',
};

const mockedLoginRequestTwo: IUserLogin = {
  email: 'Lucas@hotmail.com',
  password: '12345678Vv.',
};

const mockedPostRequest: IPostRequest = {
  img: 'kausdgas54dsf6s',
  description: 'postado',
};

const mockedPostUpdateRequest: IPostRequest = {
  description: 'Olá,Mundo!',
};

const mockedCommentRequest: ICommentRequest = {
  text: 'lindo',
};

export {
  mockedUserRequest,
  mockedUserRequestTwo,
  mockedLoginRequest,
  mockedLoginRequestTwo,
  mockedPostRequest,
  mockedPostUpdateRequest,
  mockedCommentRequest,
};
