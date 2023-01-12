import { ICommentRequest } from './../../interfaces/comments.interface';
import AppDataSource from "../../data-source"
import AppError from '../../errors/AppError';
import Comment from '../../entities/comments.entities';

export const updateCommentService = async(commentData: ICommentRequest,commentToUpdateId: string, requesterUserId: string): Promise<Comment> => {

    const commentsRepository = AppDataSource.getRepository(Comment)
    
    const commentToUpdate = await commentsRepository.createQueryBuilder('comments').innerJoinAndSelect('comments.user', 'user').where('comments.id = :commentId', {commentId: commentToUpdateId}).select(['comments', 'user.id', 'user.username']).getOne()

    if(!commentToUpdate){
        throw new AppError('comment not found', 404)
    }

    if(commentToUpdate.user.id !== requesterUserId){
        throw new AppError('user does not have permission', 401)
    }

    const updatedComment = await commentsRepository.save({...commentToUpdate, ...commentData})

    return updatedComment
}