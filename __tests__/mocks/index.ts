import { ICommentRequest } from '../../src/interfaces/comments.interface';
import { IPostRequest } from '../../src/interfaces/posts.interfaces';
import {
  IUserLogin,
  IUserRequest,
  IUserUpdate,
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

const mockedUserRequestAdm: IUserRequest = {
  name: 'Lucas',
  last_name: 'Soares',
  password: '12345678Vv.',
  email: 'lucas@mail.com',
  username: 'lucas',
  bio: 'Dev Senior',
  isAdm: true,
  address: {
    city: 'Santa Quitéria',
    district: 'Rua Jerusalém',
    number: '72',
    state: 'CE',
    zipCode: '62280000',
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

const mockedLoginRequestAdm: IUserLogin = {
  email: 'lucas@mail.com',
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

const mockedCommentUpdateRequest: ICommentRequest = {
  text: 'Parabéns!',
};

const mockedUpdateUserRequest: IUserUpdate = {
  bio: 'Hello',
  address: {
    city: 'Lucas City',
    state: 'LS',
  },
};

const mockedUpdateAdmUserRequest = {
  bio: 'Hello',
  isAdm: true,
  address: {
    city: 'Lucas City',
    state: 'LS',
  },
};

export {
  mockedUserRequest,
  mockedUserRequestTwo,
  mockedUserRequestAdm,
  mockedLoginRequest,
  mockedLoginRequestTwo,
  mockedLoginRequestAdm,
  mockedPostRequest,
  mockedPostUpdateRequest,
  mockedCommentRequest,
  mockedCommentUpdateRequest,
  mockedUpdateUserRequest,
  mockedUpdateAdmUserRequest,
};
