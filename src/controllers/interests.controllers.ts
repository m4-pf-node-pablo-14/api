<<<<<<< HEAD
import { removeInterestsToPostService } from './../services/posts/removeInterestsToPost.service';
import { listInterestsService } from './../services/interests/listInterests.service';
=======
>>>>>>> 9f8ac5fce2d6e219fd530b6c41375dd0c101da12
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
  return res.status(200).json(interests);
};

export {
  createInterestController,
  deleteInterestController,
  listInterestsController,
};
