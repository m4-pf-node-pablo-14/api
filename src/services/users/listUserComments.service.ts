import { mergeCommentsAndRows } from './../../scripts/comments.scripts';
import { getPageParams } from './../../scripts/pageParams.script';
import { IQueryParams } from './../../interfaces/queryParams.interface';
import AppDataSource from '../../data-source';
import Comment from '../../entities/comments.entities';
import { INewComment } from '../../interfaces/comments.interface';
import { Repository } from 'typeorm';

interface IReturned {
  page: number;
  commentsCount: number;
  numberOfPages: number;
  users: INewComment[];
}

const listUserCommentsService = async (
  userId: string,
  queryParams: IQueryParams,
): Promise<IReturned> => {
  const commentsRepository: Repository<Comment> =
    AppDataSource.getRepository(Comment);

  const commentsCountObject = await commentsRepository
    .createQueryBuilder('comments')
    .innerJoinAndSelect('comments.user', 'user')
    .where('user.id = :userId', { userId: userId })
    .select('COUNT(comments)', 'comments')
    .getRawOne();
  const commentCount = Number(commentsCountObject.comments);

  const pageParams = getPageParams(queryParams, commentCount);

  const comments: Comment[] = await commentsRepository
    .createQueryBuilder('comments')
    .innerJoinAndSelect('comments.user', 'user')
    .where('user.id = :userId', { userId: userId })
    .orderBy('comments.createdAt')
    .select(['comments', 'user.id', 'user.username'])
    .limit(pageParams.limit)
    .offset(pageParams.offset)
    .getMany();

  const rowsOfCounts = await commentsRepository
    .createQueryBuilder('comments')
    .innerJoinAndSelect('comments.user', 'user')
    .leftJoinAndSelect('comments.likes', 'likes')
    .where('user.id = :userId', { userId: userId })
    .orderBy('comments.createdAt')
    .select('comments.id')
    .addSelect('COUNT(likes)', 'likesCount')
    .groupBy('comments.id')
    .limit(pageParams.limit)
    .offset(pageParams.offset)
    .getRawMany();

  const newComments: INewComment[] = mergeCommentsAndRows(
    comments,
    rowsOfCounts,
  );

  return {
    page: pageParams.page,
    commentsCount: commentCount,
    numberOfPages: pageParams.numberOfPages,
    users: newComments,
  };
};

export default listUserCommentsService;
