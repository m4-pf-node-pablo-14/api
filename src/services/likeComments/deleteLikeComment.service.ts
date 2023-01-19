import { Repository } from 'typeorm';
import AppDataSource from '../../data-source';
import CommentToLikes from '../../entities/commentToLikes.entities';
import AppError from '../../errors/AppError';

const deleteLikeCommentService = async (
  likeToDeleteId: string,
  requesterUserId: string,
): Promise<void> => {
  const likeCommentsRepository: Repository<CommentToLikes> =
    AppDataSource.getRepository(CommentToLikes);

  const likeToDelete: CommentToLikes = await likeCommentsRepository
    .createQueryBuilder('likes')
    .innerJoinAndSelect('likes.user', 'user')
    .where('likes.id = :likeId', { likeId: likeToDeleteId })
    .getOne();

  if (!likeToDelete) {
    throw new AppError('comment is not allowed', 403);
  }

  if (likeToDelete.user.id !== requesterUserId) {
    throw new AppError('user does not have permission', 403);
  }

  await likeCommentsRepository.remove(likeToDelete);
};

export default deleteLikeCommentService;
