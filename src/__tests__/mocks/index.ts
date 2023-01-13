import { ICommentRequest } from "../../interfaces/comments.interface";
import { IPostRequest } from "../../interfaces/posts.interfaces";
import { IUserLogin, IUserRequest } from "../../interfaces/users.interfaces";

export const mockedUserRequest: IUserRequest = {
  name: "vinicius",
  last_name: "quirino",
  password: "12345678Vv.",
  email: "vinicius123@hotmail.com",
  username: "vini123",
  bio: "Dev Senior",
  address: {
    city: "Santa Quitéria",
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
    city: "Florianopolis",
    district: "Vila Doideira",
    number: "72",
    state: "SC",
    zipCode: "17340487",
  },
};

export const ErrorMockedUserRequestTwo: Omit<IUserRequest, "last_name"> = {
  name: "Lucas",
  password: "12345678Vv.",
  email: "Lucas@hotmail.com",
  username: "Lucas123",
  bio: "Dev Senior",
  address: {
    city: "Florianopolis",
    district: "Vila Doideira",
    number: "72",
    state: "SC",
    zipCode: "17340487",
  },
};

export const mockedLoginRequest: IUserLogin = {
  email: "vinicius123@hotmail.com",
  password: "12345678Vv.",
};

export const ErrorMockedLoginRequest: IUserLogin = {
  email: "vinicius@hotmail.com",
  password: "12345678Vv.",
};

export const newPostCreated: IPostRequest = {
  img: "https://img.freepik.com/fotos-gratis/praia-tropical_74190-188.jpg?w=900&t=st=1673629540~exp=1673630140~hmac=819788b872002748d8b66b63ff8250376c321454fb496254632bf8d0b7ac3855",
  description: "This is a new post",
};
export const newPostUpdated: IPostRequest = {
  img: "https://img.freepik.com/fotos-gratis/praia-tropical_74190-188.jpg?w=900&t=st=1673629540~exp=1673630140~hmac=819788b872002748d8b66b63ff8250376c321454fb496254632bf8d0b7ac3855",
  description: "This is a new post updated",
};
export const newComentPostCreated: ICommentRequest = {
  text: "this is a new coment post",
};
export const newComentPostUpdated: ICommentRequest = {
  text: "this is a new coment post updated",
};
