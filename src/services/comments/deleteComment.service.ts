import AppDataSource from '../../data-source';
import Comment from '../../entities/comments.entities';
import AppError from '../../errors/AppError';

const deleteCommentService = async (
  commentToDeleteId: string,
  requesterUserId: string,
): Promise<void> => {
  const commentsRepository = AppDataSource.getRepository(Comment);

  const commentToDelete = await commentsRepository.findOne({
    where: { id: commentToDeleteId },
    relations: { user: true, post: { user: true } },
  });

  if (!commentToDelete) {
    throw new AppError('comment not found', 404);
  }

  if (commentToDelete.user.id !== requesterUserId) {
    if (!(commentToDelete.post.user.id === requesterUserId)) {
      throw new AppError('user does not have permission', 401);
    }
  }

  await commentsRepository.remove(commentToDelete);
};

export default deleteCommentService;
