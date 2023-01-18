import { IQueryParams } from './../interfaces/queryParams.interface';
import { IInterestRequets } from './../interfaces/interests.interfaces';
import { Request, Response } from 'express';
import createInterestService from '../services/interests/createInterest.service';
import deleteInterestService from '../services/interests/deleteInterest.service';
import listInterestsService from '../services/interests/listInterests.service';

const createInterestController = async (req: Request, res: Response) => {
  const interestData: IInterestRequets = req.body;
  const interest = await createInterestService(interestData);
  return res.status(201).json(interest);
};

const deleteInterestController = async (req: Request, res: Response) => {
  const interestId: string = req.params.id;
  await deleteInterestService(interestId);
  return res.status(204).json({});
};

const listInterestsController = async (req: Request, res: Response) => {
  const queryParams: IQueryParams = req.query;
  const interests = await listInterestsService(queryParams);
  return res.json(interests);
};

export {
  createInterestController,
  deleteInterestController,
  listInterestsController,
};
