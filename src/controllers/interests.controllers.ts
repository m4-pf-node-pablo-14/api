import { Request, Response } from 'express';
import createInterestService from '../services/interests/createInterest.service';
import deleteInterestService from '../services/interests/deleteInterest.service';
import listInterestsService from '../services/interests/listInterests.service';

const createInterestController = async (req: Request, res: Response) => {
  const interest = await createInterestService(req.body);
  return res.status(201).json(interest);
};

const deleteInterestController = async (req: Request, res: Response) => {
  await deleteInterestService(req.params.id);
  return res.status(204).json({});
};

const listInterestsController = async (req: Request, res: Response) => {
  const interests = await listInterestsService(req.query);
  return res.json(interests);
};

export {
  createInterestController,
  deleteInterestController,
  listInterestsController,
};
