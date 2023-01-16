import AppDataSource from '../../data-source';
import Comment from '../../entities/comments.entities';
import AppError from '../../errors/AppError';
import { IReqUser } from '../../interfaces/users.interfaces';

const deleteCommentService = async (
  commentToDeleteId: string,
  reqUser: IReqUser,
): Promise<{}> => {
  const commentsRepository = AppDataSource.getRepository(Comment);

  const commentToDelete = await commentsRepository.findOne({
    where: { id: commentToDeleteId },
    relations: { user: true, post: { user: true } },
  });

  if (!commentToDelete) {
    throw new AppError('comment not found', 404);
  }

  if (reqUser.isAdm) {
    await commentsRepository.remove(commentToDelete);
    return {};
  }

  if (commentToDelete.user.id !== reqUser.id) {
    if (!(commentToDelete.post.user.id === reqUser.id)) {
      throw new AppError('user does not have permission', 401);
    }
  }

  await commentsRepository.remove(commentToDelete);
  return {};
};

export default deleteCommentService;
