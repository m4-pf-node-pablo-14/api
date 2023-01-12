import AppDataSource from '../../data-source';
import Comment from '../../entities/comments.entities';
import AppError from '../../errors/AppError';

const listUserCommentsService = async (
  tokenId: string,
  userId: string,
): Promise<Comment[]> => {
  if (userId !== tokenId) {
    throw new AppError('only your comments', 403);
  }

  const comments = await AppDataSource.getRepository(Comment).find({
    where: { user: { id: userId } },
  });

  return comments;
};

export default listUserCommentsService;
