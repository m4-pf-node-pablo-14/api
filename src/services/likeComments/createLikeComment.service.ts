import AppDataSource from '../../data-source';
import Comment from '../../entities/comments.entities';
import CommentToLikes from '../../entities/commentToLikes.entities';
import User from '../../entities/user.entities';
import AppError from '../../errors/AppError';
import { responseCreateLikeCommentSerializer } from '../../serializers/posts.serializers';
import { IResponseCreateLikeComment } from '../../interfaces/posts.interfaces';
import { Repository } from 'typeorm';

const createLikeCommentService = async (
  commentId: string,
  requesterUserId: string,
): Promise<IResponseCreateLikeComment> => {
  const commentRepository: Repository<Comment> =
    AppDataSource.getRepository(Comment);

  const likesCommentsRepository: Repository<CommentToLikes> =
    AppDataSource.getRepository(CommentToLikes);

  const comment: Comment = await commentRepository.findOneBy({
    id: commentId,
  });

  const isCommentLiked: Comment = await commentRepository
    .createQueryBuilder('comments')
    .innerJoinAndSelect('comments.likes', 'likes')
    .innerJoinAndSelect('likes.user', 'user')
    .where('user.id = :userId', { userId: requesterUserId })
    .getOne();

  if (isCommentLiked) {
    throw new AppError('comment already liked', 403);
  }

  const user: User = await AppDataSource.getRepository(User).findOneBy({
    id: requesterUserId,
  });

  const likeToComment: CommentToLikes = likesCommentsRepository.create({
    comment,
    user,
  });
  await likesCommentsRepository.save(likeToComment);

  return await responseCreateLikeCommentSerializer.validate(likeToComment, {
    stripUnknown: true,
  });
};

export default createLikeCommentService;
