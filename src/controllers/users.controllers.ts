import { Request, Response } from 'express';
import createUserService from '../services/users/createUser.service';
import deleteUserService from '../services/users/deleteUser.service';
import listPostsLikesService from '../services/users/listPostsLikes.service';
import listPostUserService from '../services/users/listPostUser.service';
import listUserService from '../services/users/listUser.service';
import listUserCommentsService from '../services/users/listUserComments.service';
import listUserFollowersService from '../services/users/listUserFollowers.service';
import listUserFollowingService from '../services/users/listUserFollowing.service';
import listUsersWithSameFollowerService from '../services/users/listUsersWithSameFollower.service';
import updateUserService from '../services/users/updateUser.service';

const createUserController = async (req: Request, res: Response) => {
  const user = await createUserService(req.body);
  return res.status(201).json(user);
};

const listUserController = async (req: Request, res: Response) => {
  const users = await listUserService();
  return res.json(users);
};

const listUserCommentsController = async (req: Request, res: Response) => {
  const comments = await listUserCommentsService(req.user.id);
  return res.json(comments);
};
const listUserFollowersController = async (req: Request, res: Response) => {
  const followers = await listUserFollowersService(req.user.id);
  return res.json(followers);
};

const listUserFollowingController = async (req: Request, res: Response) => {
  const following = await listUserFollowingService(req.user.id);
  return res.json(following);
};
const listPostUserController = async (req: Request, res: Response) => {
  const posts = await listPostUserService(req.user.id);
  return res.json(posts);
};

const listUsersWithSameFollowerController = async (
  req: Request,
  res: Response,
) => {
  const users = await listUsersWithSameFollowerService(req.user.id);
  return res.json(users);
};

const listPostsLikesController = async (req: Request, res: Response) => {
  const posts = await listPostsLikesService(req.user.id);
  return res.json(posts);
};

const updateUserController = async (req: Request, res: Response) => {
  const user = await updateUserService(req.body, req.user.id);
  return res.json(user);
};

const deleteUserController = async (req: Request, res: Response) => {
  await deleteUserService(req.user.id);
  return res.status(204).json({});
};

export {
  createUserController,
  listUserController,
  listUserCommentsController,
  listUserFollowersController,
  listUserFollowingController,
  listPostUserController,
  listUsersWithSameFollowerController,
  listPostsLikesController,
  updateUserController,
  deleteUserController,
};
