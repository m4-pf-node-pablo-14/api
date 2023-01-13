import { IComment, ICommentRequest } from './../../interfaces/comments.interface';
import AppDataSource from '../../data-source';
import AppError from '../../errors/AppError';
import Comment from '../../entities/comments.entities';
import { commentSerializer } from '../../serializers/comments.serializers';

const updateCommentService = async (
  commentData: ICommentRequest,
  commentToUpdateId: string,
  requesterUserId: string,
): Promise<IComment> => {
  const commentsRepository = AppDataSource.getRepository(Comment);

  const commentToUpdate = await commentsRepository
    .createQueryBuilder('comments')
    .innerJoinAndSelect('comments.user', 'user')
    .innerJoinAndSelect('comments.post', 'post')
    .where('comments.id = :commentId', { commentId: commentToUpdateId })
    .select(['comments', 'user.id', 'user.username', 'post'])
    .getOne();

  if (!commentToUpdate) {
    throw new AppError('comment not found', 404);
  }

  if (commentToUpdate.user.id !== requesterUserId) {
    throw new AppError('user does not have permission', 401);
  }

  const updatedComment = await commentsRepository.save({
    ...commentToUpdate,
    ...commentData,
  });

  const validatedUpdatedComment = await commentSerializer.validate(updatedComment, {
    stripUnknown: true
  })

  return validatedUpdatedComment;
};

export default updateCommentService;
