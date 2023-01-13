import { mergePostsAndRows } from './../../scripts/posts.scripts';
import { getPageParams } from './../../scripts/pageParams.script';
import { IQueryParams } from './../../interfaces/queryParams.interface';
import AppDataSource from '../../data-source';
import Post from '../../entities/posts.entities';

interface IReturned {
  page: number;
  postsCount: number;
  posts: Post[];
  numberOfPages: number;
}

const listPostsService = async (queryParams: IQueryParams): Promise<IReturned> => {
  const postsRepository = AppDataSource.getRepository(Post);

  const postsCountObject = await postsRepository
  .createQueryBuilder('posts')
  .innerJoinAndSelect('posts.user', 'user') // retira os posts com usuários deletados
  .select('COUNT(posts)', 'count')
  .getRawOne();
  const postsCount = Number(postsCountObject.count);

  const pageParams = getPageParams(queryParams, postsCount)

  const posts = await postsRepository
  .createQueryBuilder('posts')
  .innerJoinAndSelect('posts.user', 'user')
  .leftJoinAndSelect('posts.comments', 'comments')
  .leftJoinAndSelect('comments.likes', 'likess')
  .leftJoinAndSelect('posts.likes', 'likes')
  .orderBy('posts.createdAt')
  .select(['posts','user.id','user.username',])
  .limit(pageParams.limit)
  .offset(pageParams.offset)
  .getMany();

  const rawsOfCounts = await postsRepository
  .createQueryBuilder('posts')
  .innerJoinAndSelect('posts.user', 'user')
  .leftJoinAndSelect('posts.likes', 'likes')
  .orderBy('posts.createdAt')
  .leftJoinAndSelect('posts.comments', 'comments')
  .select('posts.id')
  .addSelect('COUNT(likes)', 'likesCount')
  .addSelect('COUNT(comments)', 'commentsCount')
  .groupBy('posts.id')
  .limit(pageParams.limit)
  .offset(pageParams.offset)
  .getRawMany()

  const newPosts = mergePostsAndRows(posts, rawsOfCounts)


  const returnedObject = {
    page: pageParams.page,
    postsCount: postsCount,
    numberOfPages: pageParams.numberOfPages,
    posts: newPosts,
  };

  return returnedObject;
};

export default listPostsService;
