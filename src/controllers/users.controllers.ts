import { Request, Response } from 'express';
import createUserService from '../services/users/createUser.service';
import deleteUserService from '../services/users/deleteUser.service';
import listPostsLikedService from '../services/users/listPostsLiked.service';
import listUsersService from '../services/users/listUsers.service';
import listUserCommentsService from '../services/users/listUserComments.service';
import listUserPostsService from '../services/users/listUserPosts.service';
import listUsersFollowerService from '../services/users/listUsersFollower.service';
import listUsersFollowingService from '../services/users/listUsersFollowing.service';
import updateUserService from '../services/users/updateUser.service';

const createUserController = async (req: Request, res: Response) => {
  const user = await createUserService(req.body);
  return res.status(201).json(user);
};

const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService(req.query);
  return res.json(users);
};

const listUserCommentsController = async (req: Request, res: Response) => {
  const comments = await listUserCommentsService(req.user.id, req.query);
  return res.json(comments);
};

const listUsersFollowerController = async (req: Request, res: Response) => {
  const followers = await listUsersFollowerService(req.user.id, req.query);
  return res.json(followers);
};

const listUsersFollowingController = async (req: Request, res: Response) => {
  const following = await listUsersFollowingService(req.user.id, req.query);
  return res.json(following);
};

const listUserPostsController = async (req: Request, res: Response) => {
  const posts = await listUserPostsService(req.user.id, req.query);
  return res.json(posts);
};

const listPostsLikedController = async (req: Request, res: Response) => {
  const posts = await listPostsLikedService(req.user.id, req.query);
  return res.json(posts);
};

const updateUserController = async (req: Request, res: Response) => {
  const user = await updateUserService(req.body, req.user.id);
  return res.json(user);
};

const deleteUserController = async (req: Request, res: Response) => {
  await deleteUserService(req.params.id, req);
  
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
