import { IQueryParams } from './../interfaces/queryParams.interface';
import { listCommentsByPostService } from './../services/comments/listsCommentsByPosts.service';
import { Request, Response } from 'express';
import createCommentsService from '../services/comments/createComments.service';
import deleteCommentService from '../services/comments/deleteComment.service';
import updateCommentService from '../services/comments/updateComment.service';

const createCommentsController = async (req: Request, res: Response) => {
  const post = await createCommentsService(
    req.params.id,
    req.body,
    req.user.id,
  );
  return res.status(201).json(post);
};

const deleteCommentController = async (req: Request, res: Response) => {
  await deleteCommentService(req.params.id, req.user.id);
  return res.status(204).json({});
};

const updateCommentController = async (req: Request, res: Response) => {
  const updatedComment = await updateCommentService(
    req.body,
    req.params.id,
    req.user.id,
  );
  res.json(updatedComment);
};

const listCommentsByPostController = async (req: Request, res: Response) => {
  const postId: string = req.params.id;
  const queryParams: IQueryParams = req.query;
  const comments = await listCommentsByPostService(postId, queryParams);
  return res.status(200).json(comments);
};

export {
  createCommentsController,
  deleteCommentController,
  updateCommentController,
  listCommentsByPostController,
};
