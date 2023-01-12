import { IUserLogin, IUserRequest } from "../../interfaces/users.interfaces";

export const mockedUserRequest: IUserRequest = {
  name: "vinicius",
  last_name: "quirino",
  password: "12345678Vv.",
  email: "vinicius123@hotmail.com",
  username: "vini123",
  bio: "Dev Senior",
  address: {
    city: "Barra B",
    district: "Rua Jerusalém",
    number: "72",
    state: "CE",
    zipCode: "62280000",
  },
};

export const mockedUserRequestTwo: IUserRequest = {
  name: "Lucas",
  last_name: "Bueno",
  password: "12345678Vv.",
  email: "Lucas@hotmail.com",
  username: "Lucas123",
  bio: "Dev Senior",
  address: {
    city: "Barra B",
    district: "Rua Jerusalém",
    number: "72",
    state: "CE",
    zipCode: "62280000",
  },
};

export const mockedLoginRequest: IUserLogin = {
  email: "vinicius123@hotmail.com",
  password: "12345678Vv.",
};
