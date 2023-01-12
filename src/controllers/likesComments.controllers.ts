import { IUserUpdate } from './../interfaces/users.interfaces';
import { deleteLikeCommentService } from './../services/likeComments/deleteLikeComment.service';
import { createLikeCommentService } from './../services/likeComments/createLikeComment.service';
import { Request, Response } from 'express';

export const createLikeCommentController = async (req: Request, res: Response) => {
    const commentId: string = req.params.id
    const requesterUserId: string = req.user.id
    const like = await createLikeCommentService(commentId, requesterUserId)
    return res.status(201).json(like)
}

export const deleteLikeCommentController = async (req: Request, res: Response) => {
    const likeToDeleteId: string = req.params.id
    const requesterUserId: string = req.user.id
    await deleteLikeCommentService(likeToDeleteId, requesterUserId)
    return res.status(204).json()
}