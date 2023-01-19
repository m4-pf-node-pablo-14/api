import { Request, Response } from 'express';
import followService from '../services/follow/following.service';
import deleteFollowService from '../services/follow/deleteFollow.service';

const followController = async (req: Request, res: Response) => {
  await followService(req.user.id, req.params.id);
  return res.status(201).json({ message: 'successfully following' });
};

const deleteFollowController = async (req: Request, res: Response) => {
  await deleteFollowService(req.params.id);
  return res.status(204).json({});
};

export { followController, deleteFollowController };
