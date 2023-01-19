import { IComment } from './../../interfaces/comments.interface';
import AppDataSource from '../../data-source';
import Comment from '../../entities/comments.entities';
import User from '../../entities/user.entities';
import Post from '../../entities/posts.entities';
import { ICommentRequest } from '../../interfaces/comments.interface';
import { commentSerializer } from '../../serializers/comments.serializers';
import { Repository } from 'typeorm';

const createCommentService = async (
  postId: string,
  commentData: ICommentRequest,
  userId: string,
): Promise<IComment> => {
  const user: User = await AppDataSource.getRepository(User).findOneBy({
    id: userId,
  });

  const findPost: Post = await AppDataSource.getRepository(Post).findOneBy({
    id: postId,
  });

  const commentRepository: Repository<Comment> =
    AppDataSource.getRepository(Comment);

  const comment: Comment = commentRepository.create({
    ...commentData,
    user,
    post: findPost,
  });

  await commentRepository.save(comment);

  return await commentSerializer.validate(comment, {
    stripUnknown: true,
  });
};

export default createCommentService;
