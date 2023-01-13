import { IUserRequest, IUserUpdate } from './../interfaces/users.interfaces';
import { Request, Response } from 'express';
import createUserService from '../services/users/createUser.service';
import deleteUserService from '../services/users/deleteUser.service';
import listPostsLikedService from '../services/users/listPostsLiked.service';
import listUsersService from '../services/users/listUser.service';
import listUserCommentsService from '../services/users/listUserComments.service';
import listUsersFollowerService from '../services/users/listUsersFollower.service';
import listUsersFollowingService from '../services/users/listUsersFollowing.service';
import updateUserService from '../services/users/updateUser.service';
import listUserPostsService from '../services/users/listUserPosts.service';

const createUserController = async (req: Request, res: Response) => {
  const user = await createUserService(req.body);
  return res.status(201).json(user);
};

const listUsersController = async (req: Request, res: Response) => {
  const queryParams = req.query
  console.log(queryParams)
  const users = await listUsersService(queryParams);
  return res.json(users);
};

const listUserCommentsController = async (req: Request, res: Response) => {
  const userId = req.user.id
  const queryParams = req.query
  const comments = await listUserCommentsService(userId, queryParams);
  return res.json(comments);
};

const listUsersFollowerController = async (req: Request, res: Response) => {
  const userId: string = req.params.id
  const queryParams = req.query
  const followers = await listUsersFollowerService(userId, queryParams);
  return res.json(followers);
};

const listUsersFollowingController = async (req: Request, res: Response) => {
  const userId: string = req.params.id
  const queryParams = req.query
  const following = await listUsersFollowingService(userId, queryParams);
  return res.json(following);
};

const listUserPostsController = async (req: Request, res: Response) => {
  const userId: string = req.params.id
  const queryParams = req.query
  const posts = await listUserPostsService(userId, queryParams);
  return res.json(posts);
};

const listPostsLikedController = async (req: Request, res: Response) => {
  const requesterUserId: string = req.user.id
  const queryParams = req.query
  const posts = await listPostsLikedService(requesterUserId, queryParams);
  return res.json(posts);
};

const updateUserController = async (req: Request, res: Response) => {
  const updateUserData: IUserUpdate = req.body
  const userToUpdateId: string = req.params.id
  const user = await updateUserService(updateUserData, userToUpdateId);
  return res.json(user);
};

const deleteUserController = async (req: Request, res: Response) => {
  await deleteUserService(req.user.id);
  return res.status(204).json({});
};

export {
  createUserController,
  listUsersController,
  listUserCommentsController,
  listUsersFollowerController,
  listUsersFollowingController,
  listUserPostsController,
  listPostsLikedController,
  updateUserController,
  deleteUserController,
};
