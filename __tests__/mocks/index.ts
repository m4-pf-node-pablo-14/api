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

const mockedUserRequestDelete: IUserRequest = {
  name: 'Lucas',
  last_name: 'Oliveira',
  password: '12345678Vv.',
  email: 'LucasO@hotmail.com',
  username: 'lucasO',
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

const mockedLoginRequestDelete: IUserLogin = {
  email: 'LucasO@hotmail.com',
  password: '12345678Vv.',
};

const mockedPostRequest: IPostRequest = {
  description: 'Olá,Mundo!',
};

const mockedPostUpdateRequest: IPostRequest = {
  description: 'Hi',
};

export {
  mockedUserRequest,
  mockedUserRequestTwo,
  mockedUserRequestDelete,
  mockedLoginRequest,
  mockedLoginRequestTwo,
  mockedLoginRequestDelete,
  mockedPostRequest,
  mockedPostUpdateRequest,
};
