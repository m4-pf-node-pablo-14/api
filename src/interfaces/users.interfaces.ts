export interface IUserRequest {
  name: string;
  last_name: string;
  password: string;
  email: string;
  username: string;
  bio: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  name?: string;
  last_name?: string;
  password?: string;
  email?: string;
  username?: string;
  bio?: string;
}

export interface IUserResponse {
  id: string;
  name: string;
  last_name: string;
  password: string;
  email: string;
  username: string;
  bio: string;
}