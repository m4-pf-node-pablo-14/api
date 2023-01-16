import { IQueryParams } from './../../interfaces/queryParams.interface';
import { getPageParams } from '../../scripts/pageParams.script';
import {
  mergePostCountArrays,
  mergePostsAndRows,
} from './../../scripts/posts.scripts';
import AppDataSource from '../../data-source';
import Post from '../../entities/posts.entities';
import { INewPost } from '../../interfaces/posts.interfaces';

interface IReturned {
  page: number;
  postsCount: number;
  numberOfPages: number;
  postsLiked: INewPost[];
}

const listPostsLikedService = async (
  requesterUserId: string,
  queryParams: IQueryParams,
): Promise<IReturned> => {
  const postsRepository = AppDataSource.getRepository(Post);

  const postsCountObject = await postsRepository
    .createQueryBuilder('posts')
    .innerJoinAndSelect('posts.user', 'user')
    .leftJoinAndSelect('posts.likes', 'likes')
    .innerJoinAndSelect('likes.user', 'userLike')
    .where('userLike.id = :userId', { userId: requesterUserId })
    .select('COUNT(*)', 'count')
    .getRawOne();
  const postsCount = Number(postsCountObject.count);

  const pageParams = getPageParams(queryParams, postsCount);

  const posts = await postsRepository
    .createQueryBuilder('posts')
    .innerJoinAndSelect('posts.user', 'user')
    .leftJoinAndSelect('posts.likes', 'likes')
    .innerJoinAndSelect('likes.user', 'userLike')
    .where('userLike.id = :userId', { userId: requesterUserId })
    .orderBy('posts.createdAt')
    .limit(pageParams.limit)
    .offset(pageParams.offset)
    .select(['posts', 'user.id', 'user.username'])
    .getMany();

  const likesCount = await postsRepository
    .createQueryBuilder('posts')
    .innerJoinAndSelect('posts.user', 'user')
    .leftJoinAndSelect('posts.likes', 'likes')
    .innerJoinAndSelect('likes.user', 'userLike')
    .where('userLike.id = :userId', { userId: requesterUserId })
    .orderBy('posts.createdAt')
    .limit(pageParams.limit)
    .offset(pageParams.offset)
    .select('posts.id')
    .addSelect('COUNT(likes)', 'likesCount')
    .groupBy('posts.id')
    .getRawMany();

  const commentsCount = await postsRepository
    .createQueryBuilder('posts')
    .innerJoinAndSelect('posts.user', 'user')
    .leftJoinAndSelect('posts.likes', 'likes')
    .innerJoinAndSelect('likes.user', 'userLike')
    .leftJoinAndSelect('posts.comments', 'comments')
    .where('userLike.id = :userId', { userId: requesterUserId })
    .orderBy('posts.createdAt')
    .limit(pageParams.limit)
    .offset(pageParams.offset)
    .select('posts.id')
    .addSelect('COUNT(comments)', 'commentsCount')
    .groupBy('posts.id')
    .getRawMany();

  const rowsOfCounts = mergePostCountArrays(likesCount, commentsCount);

  const newPosts = mergePostsAndRows(posts, rowsOfCounts);

  const returnedObject = {
    page: pageParams.page,
    postsCount: postsCount,
    numberOfPages: pageParams.numberOfPages,
    postsLiked: newPosts,
  };

  return returnedObject;
};

export default listPostsLikedService;
