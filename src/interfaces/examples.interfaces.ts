export interface IMessageRequest {
  message: string;
}

export interface IMessageUpdateRequest {
  message: string;
}

export interface IMessageResponse {
  id: string;
  message: string;
}

export interface IUserRequest {
  email: string;
  password: string;
}

export interface IUserResponse {
  id: string;
  email: string;
  password: string;
}
