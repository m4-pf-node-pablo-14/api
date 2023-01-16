import { IComment } from './../../interfaces/comments.interface';
import AppDataSource from '../../data-source';
import Comment from '../../entities/comments.entities';
import User from '../../entities/user.entities';
import Post from '../../entities/posts.entities';
import AppError from '../../errors/AppError';
import { ICommentRequest } from '../../interfaces/comments.interface';
import { commentSerializer } from '../../serializers/comments.serializers';

const createCommentsService = async (
  postId: string,
  commentData: ICommentRequest,
  userId: string,
): Promise<IComment> => {
  const postRepository = AppDataSource.getRepository(Post);
  const commentRepository = AppDataSource.getRepository(Comment);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id: userId,
  });

  const findPost = await postRepository.findOneBy({
    id: postId,
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (!findPost) {
    throw new AppError('Not found!', 404);
  }

  const comment = commentRepository.create({
    ...commentData,
    user,
    post: findPost,
  });

  await commentRepository.save(comment);

  const validatedComment = await commentSerializer.validate(comment, {
    stripUnknown: true,
  });

  return validatedComment;
};

export default createCommentsService;
