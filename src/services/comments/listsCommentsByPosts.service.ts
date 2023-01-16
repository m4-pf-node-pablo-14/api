import { IQueryParams } from './../../interfaces/queryParams.interface';
import AppDataSource from '../../data-source';
import Comment from '../../entities/comments.entities';
import Post from '../../entities/posts.entities';
import AppError from '../../errors/AppError';
import { getPageParams } from '../../scripts/pageParams.script';

export const listCommentsByPostService = async (
  postId: string,
  queryParams: IQueryParams,
) => {
  const post = await AppDataSource.getRepository(Post).findOneBy({
    id: postId,
  });

  if (!post) {
    throw new AppError('post not found', 404);
  }

  const commentsRepository = AppDataSource.getRepository(Comment);

  const commentsCountObject = await commentsRepository
    .createQueryBuilder('comments')
    .innerJoinAndSelect('comments.post', 'post')
    .where('post.id = :postId', { postId: postId })
    .select('COUNT(comments)', 'count')
    .getRawOne();

  const commentsCount = Number(commentsCountObject.count);

  const pageParams = getPageParams(queryParams, commentsCount);

  const comments = await commentsRepository
    .createQueryBuilder('comments')
    .innerJoinAndSelect('comments.post', 'post')
    .leftJoinAndSelect('comments.likes', 'likes')
    .where('post.id = :postId', { postId: postId })
    .select(['comments', 'likes'])
    .limit(pageParams.limit)
    .offset(pageParams.offset)
    .getMany();

  const returnedObject = {
    page: pageParams.page,
    commentsCount: commentsCount,
    numberOfPages: pageParams.numberOfPages,
    comments: comments,
  };

  return returnedObject;
};
