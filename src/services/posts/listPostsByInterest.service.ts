import { IQueryParams } from './../../interfaces/queryParams.interface';
import AppDataSource from '../../data-source';
import { getPageParams } from '../../scripts/pageParams.script';
import {
  mergePostCountArrays,
  mergePostsAndRows,
} from '../../scripts/posts.scripts';
import Post from '../../entities/posts.entities';

export const listPostsByInterestService = async (
  interestName: string,
  queryParams: IQueryParams,
) => {
  const postsRepository = AppDataSource.getRepository(Post);

  const postsCountObject = await postsRepository
    .createQueryBuilder('posts')
    .leftJoinAndSelect('posts.interestsPost', 'interestspost')
    .leftJoinAndSelect('interestspost.interest', 'interest')
    .where('interest.name = :interestName', { interestName: interestName })
    .select('COUNT(posts)', 'count')
    .getRawOne();
  const postsCount = Number(postsCountObject.count);

  const pageParams = getPageParams(queryParams, postsCount);

  const posts = await postsRepository
    .createQueryBuilder('posts')
    .leftJoinAndSelect('posts.interestsPost', 'interestspost')
    .leftJoinAndSelect('interestspost.interest', 'interest')
    .where('interest.name = :interestName', { interestName: interestName })
    .innerJoinAndSelect('posts.user', 'user')
    .orderBy('posts.createdAt')
    .select(['posts', 'user.id', 'user.username'])
    .limit(pageParams.limit)
    .offset(pageParams.offset)
    .getMany();

  const likesCount = await postsRepository
    .createQueryBuilder('posts')
    .leftJoinAndSelect('posts.interestsPost', 'interestspost')
    .leftJoinAndSelect('interestspost.interest', 'interest')
    .where('interest.name = :interestName', { interestName: interestName })
    .innerJoinAndSelect('posts.user', 'user')
    .leftJoinAndSelect('posts.likes', 'likes')
    .orderBy('posts.createdAt')
    .select('posts.id')
    .addSelect('COUNT(likes)', 'likesCount')
    .groupBy('posts.id')
    .limit(pageParams.limit)
    .offset(pageParams.offset)
    .getRawMany();

  const commentsCount = await postsRepository
    .createQueryBuilder('posts')
    .leftJoinAndSelect('posts.interestsPost', 'interestspost')
    .leftJoinAndSelect('interestspost.interest', 'interest')
    .where('interest.name = :interestName', { interestName: interestName })
    .innerJoinAndSelect('posts.user', 'user')
    .leftJoinAndSelect('posts.comments', 'comments')
    .orderBy('posts.createdAt')
    .select('posts.id')
    .addSelect('COUNT(comments)', 'commentsCount')
    .groupBy('posts.id')
    .limit(pageParams.limit)
    .offset(pageParams.offset)
    .getRawMany();

  const rawsOfCounts = mergePostCountArrays(likesCount, commentsCount);

  const newPosts = mergePostsAndRows(posts, rawsOfCounts);

  const returnedObject = {
    page: pageParams.page,
    postsCount: postsCount,
    numberOfPages: pageParams.numberOfPages,
    interest: interestName,
    posts: newPosts,
  };

  return returnedObject;
};
