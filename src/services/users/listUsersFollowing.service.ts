import { getPageParams } from './../../scripts/pageParams.script';
import { IQueryParams } from './../../interfaces/queryParams.interface';
import AppDataSource from '../../data-source';
import Follow from '../../entities/follow.entities';
import { Repository } from 'typeorm';

interface IReturned {
  page: number;
  followersCount: number;
  numberOfPages: number;
  followers: Follow[];
}

const listUsersFollowingService = async (
  userId: string,
  queryParams: IQueryParams,
): Promise<IReturned> => {
  const followsRepository: Repository<Follow> =
    AppDataSource.getRepository(Follow);

  const followingCountObject = await followsRepository
    .createQueryBuilder('follows')
    .innerJoinAndSelect('follows.following', 'following')
    .where('following.id = :userId', { userId: userId })
    .select('COUNT(follows)', 'count')
    .getRawOne();
  const followingCount = Number(followingCountObject.count);

  const pageParams = getPageParams(queryParams, followingCount);

  const follows: Follow[] = await followsRepository
    .createQueryBuilder('follows')
    .innerJoin('follows.following', 'followingUser')
    .innerJoinAndSelect('follows.followers', 'following')
    .where('followingUser.id = :userId', { userId: userId })
    .select(['follows', 'following.id', 'following.username'])
    .orderBy('follows.id')
    .limit(pageParams.limit)
    .offset(pageParams.offset)
    .getMany();

  return {
    page: pageParams.page,
    followersCount: followingCount,
    numberOfPages: pageParams.numberOfPages,
    followers: follows,
  };
};

export default listUsersFollowingService;
