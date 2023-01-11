import AppDataSource from '../../data-source';
import AppError from '../../errors/AppError';

const listUserCommentsService = async (tokenId: string, userId: string) => {
  const commentRepository = AppDataSource.getRepository(Comment);
  const commentQueryBuilder = commentRepository.createQueryBuilder('comments');

  if (userId !== tokenId) {
    throw new AppError('only your comments', 403);
  }

  const comments = await commentQueryBuilder
    .where('user = :userId', { userId })
    .getMany();

  return comments;
};

export default listUserCommentsService;
