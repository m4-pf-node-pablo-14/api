export interface IReqUser {
  id: string;
  isAdm: boolean;
}

interface IAddress {
  district: string;
  zipCode: string;
  number: string;
  city: string;
  state: string;
}

interface IAddressUpdate {
  district?: string;
  zipCode?: string;
  number?: string;
  city?: string;
  state?: string;
}

export interface IUserRequest {
  name: string;
  last_name: string;
  password: string;
  email: string;
  username: string;
  bio?: string;
  isAdm?: boolean;
  address: IAddress;
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
  address?: IAddressUpdate;
}

export interface IUserResponse {
  id: string;
  name: string;
  last_name: string;
  email: string;
  username: string;
  bio: string;
}

export interface INewUser extends IUserResponse {
  followersCount: number;
  followingCount: number;
  postsCount: number;
}
