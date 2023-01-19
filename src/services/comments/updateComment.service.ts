import {
  IComment,
  ICommentRequest,
} from './../../interfaces/comments.interface';
import AppDataSource from '../../data-source';
import AppError from '../../errors/AppError';
import Comment from '../../entities/comments.entities';
import { commentSerializer } from '../../serializers/comments.serializers';
import { Repository } from 'typeorm';

const updateCommentService = async (
  commentData: ICommentRequest,
  commentToUpdateId: string,
  requesterUserId: string,
): Promise<IComment> => {
  const commentsRepository: Repository<Comment> =
    AppDataSource.getRepository(Comment);

  const commentToUpdate: Comment = await commentsRepository
    .createQueryBuilder('comments')
    .innerJoinAndSelect('comments.user', 'user')
    .innerJoinAndSelect('comments.post', 'post')
    .where('comments.id = :commentId', { commentId: commentToUpdateId })
    .select(['comments', 'user.id', 'user.username', 'post'])
    .getOne();

  if (commentToUpdate.user.id !== requesterUserId) {
    throw new AppError('user does not have permission', 403);
  }

  const updatedComment: Comment = await commentsRepository.save({
    ...commentToUpdate,
    ...commentData,
  });

  return await commentSerializer.validate(updatedComment, {
    stripUnknown: true,
  });
};

export default updateCommentService;
