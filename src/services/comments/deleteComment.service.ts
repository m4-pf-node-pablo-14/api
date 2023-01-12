import AppDataSource from "../../data-source"
import Comment from "../../entities/comments.entities"
import AppError from "../../errors/AppError"

export const deleteCommentService = async (commentToDeleteId: string, requesterUserId: string) => {

    const commentsRepository = AppDataSource.getRepository(Comment)

    const commentToDelete = await commentsRepository.createQueryBuilder('comments').innerJoinAndSelect('comments.user', 'user').where('comments.id = :commentId', {commentId: commentToDeleteId}).getOne()

    if(!commentToDelete){
        throw new AppError('comment not found', 404)
    }

    if(commentToDelete.user.id !== requesterUserId){
        throw new AppError('user does not have permission', 401)
    }

    await commentsRepository.remove(commentToDelete)
}