import { Request, Response } from 'express';
import followService from '../services/follow/following.service';
import { followRequest } from '../interfaces/follow.interfaces';
import deleteFollowService from '../services/follow/deleteFollow.service';

const followController = async (req: Request, res: Response) => {
  const data: followRequest = {
    following: req.user.id, //quem ta seguindo
    followers: req.params.id, // quem está sendo seguido
  };

  await followService(data);

  return res.status(201).json({ message: 'successfully following' });
};

const deleteFollowController = async (req: Request, res: Response) => {
  const data: followRequest = {
    following: req.user.id, //quem ta seguindo
    followers: req.params.id, // quem está sendo seguido
  };

  await deleteFollowService(data);

  return res.status(200).json({ message: 'Successfully Unfollow' });
};

export { followController, deleteFollowController };
