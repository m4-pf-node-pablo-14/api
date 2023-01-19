import { IQueryParams } from './../../interfaces/queryParams.interface';
import AppDataSource from '../../data-source';
import Comment from '../../entities/comments.entities';
import { getPageParams } from '../../scripts/pageParams.script';
import { Repository } from 'typeorm';

interface IReturned {
  page: number;
  commentsCount: number;
  numberOfPages: number;
  comments: Comment[];
}

const listCommentsByPostService = async (
  postId: string,
  queryParams: IQueryParams,
): Promise<IReturned> => {
  const commentsRepository: Repository<Comment> =
    AppDataSource.getRepository(Comment);

  const commentsCountObject = await commentsRepository
    .createQueryBuilder('comments')
    .innerJoinAndSelect('comments.post', 'post')
    .where('post.id = :postId', { postId: postId })
    .select('COUNT(comments)', 'count')
    .getRawOne();

  const commentsCount = Number(commentsCountObject.count);

  const pageParams = getPageParams(queryParams, commentsCount);

  const comments: Comment[] = await commentsRepository
    .createQueryBuilder('comments')
    .innerJoinAndSelect('comments.post', 'post')
    .leftJoinAndSelect('comments.likes', 'likes')
    .where('post.id = :postId', { postId: postId })
    .select(['comments', 'likes'])
    .limit(pageParams.limit)
    .offset(pageParams.offset)
    .getMany();

  return {
    page: pageParams.page,
    commentsCount: commentsCount,
    numberOfPages: pageParams.numberOfPages,
    comments: comments,
  };
};

export default listCommentsByPostService;
