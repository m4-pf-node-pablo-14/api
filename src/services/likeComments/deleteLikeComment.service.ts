import AppDataSource from "../../data-source"
import CommentToLikes from "../../entities/commentToLikes.entities"
import AppError from "../../errors/AppError"

export const deleteLikeCommentService = async (likeToDeleteId: string, requesterUserId: string) => {

    const likeCommentsRepository = AppDataSource.getRepository(CommentToLikes)

    const likeToDelete = await likeCommentsRepository.createQueryBuilder("likes").innerJoinAndSelect('likes.user', 'user').where('likes.id = :likeId', {likeId: likeToDeleteId}).getOne()

    if(!likeToDelete){
        throw new AppError('like not found', 404)
    }

    if(likeToDelete.user.id !== requesterUserId){
        throw new AppError('user does not have permission', 401)
    }

    await likeCommentsRepository.remove(likeToDelete)
}