import { updateCommentService } from './../services/comments/updateComment.service';
import { ICommentRequest } from './../interfaces/comments.interface';
import { IUserUpdate } from './../interfaces/users.interfaces';
import { Request, Response } from 'express';
import createCommentsService from '../services/comments/createComments.service';
import { deleteCommentService } from '../services/comments/deleteComment.service';

const createCommentsController = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const post = await createCommentsService(postId, req.body, req.user.id);
  return res.status(201).json(post);
};

const deleteCommentController = async (req: Request, res: Response) => {
  const commentToDeleteId: string = req.params.id
  const requesterUserId: string = req.user.id
  await deleteCommentService(commentToDeleteId, requesterUserId)
  return res.status(204).json()
}

const  updateCommentController = async (req: Request, res: Response) => {
  const commentData: ICommentRequest = req.body
  const commentToUpdateId: string = req.params.id
  const requesterUserId: string = req.user.id
  const updatedComment = await updateCommentService(commentData, commentToUpdateId, requesterUserId)
  res.status(200).json(updatedComment)
}

export { createCommentsController, deleteCommentController, updateCommentController };
