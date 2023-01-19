import { Repository } from 'typeorm';
import AppDataSource from '../../data-source';
import Comment from '../../entities/comments.entities';
import AppError from '../../errors/AppError';
import { IReqUser } from '../../interfaces/users.interfaces';

const deleteCommentService = async (
  commentToDeleteId: string,
  reqUser: IReqUser,
): Promise<{}> => {
  const commentsRepository: Repository<Comment> =
    AppDataSource.getRepository(Comment);

  const commentToDelete: Comment = await commentsRepository.findOne({
    where: { id: commentToDeleteId },
    relations: { user: true, post: { user: true } },
  });

  if (reqUser.isAdm) {
    await commentsRepository.remove(commentToDelete);
    return {};
  }

  if (commentToDelete.user.id !== reqUser.id) {
    if (!(commentToDelete.post.user.id === reqUser.id)) {
      throw new AppError('user does not have permission', 403);
    }
  }

  await commentsRepository.remove(commentToDelete);
  return {};
};

export default deleteCommentService;
