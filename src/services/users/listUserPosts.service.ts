import { mergePostsAndRows } from './../../scripts/posts.scripts';
import { getPageParams } from './../../scripts/pageParams.script';
import { IQueryParams } from './../../interfaces/queryParams.interface';
import AppDataSource from '../../data-source';
import Post from '../../entities/posts.entities';
import { INewPost } from '../../interfaces/posts.interfaces';

interface IReturned {
  page: number;
  postsCount: number;
  numberOfPages: number;
  posts: INewPost[];
}

const listUserPostsService = async (
  userId: string,
  queryParams: IQueryParams,
): Promise<IReturned> => {
  const postsRepository = AppDataSource.getRepository(Post);

  const postsCountObject = await postsRepository
    .createQueryBuilder('posts')
    .innerJoinAndSelect('posts.user', 'user')
    .where('user.id =:userId', { userId: userId })
    .select('COUNT(posts)', 'count')
    .getRawOne();
  const postsCount = Number(postsCountObject.count);

  const pageParams = getPageParams(queryParams, postsCount);

  const posts = await postsRepository
    .createQueryBuilder('posts')
    .innerJoinAndSelect('posts.user', 'user')
    .where('user.id = :userId', { userId: userId })
    .orderBy('posts.createdAt')
    .limit(pageParams.limit)
    .offset(pageParams.offset)
    .select(['posts', 'user.id', 'user.username'])
    .getMany();

  const rowsOfCounts = await postsRepository
    .createQueryBuilder('posts')
    .innerJoinAndSelect('posts.user', 'user')
    .leftJoinAndSelect('posts.likes', 'likes')
    .leftJoinAndSelect('posts.comments', 'comments')
    .where('user.id = :userId', { userId: userId })
    .orderBy('posts.createdAt')
    .limit(pageParams.limit)
    .offset(pageParams.offset)
    .select('posts.id')
    .addSelect('COUNT(comments)', 'commentsCount')
    .addSelect('COUNT(likes)', 'likesCount')
    .groupBy('posts.id')
    .getRawMany();

  const newPosts = mergePostsAndRows(posts, rowsOfCounts);

  const returnedObject = {
    page: pageParams.page,
    postsCount: postsCount,
    numberOfPages: pageParams.numberOfPages,
    posts: newPosts,
  };

  return returnedObject;
};

export default listUserPostsService;
