import { getPageParams } from './../../scripts/pageParams.script';
import AppDataSource from '../../data-source';
import Follow from '../../entities/follow.entities';

const listUsersFollowerService = async (userId: string, queryParams) => {

  const followsRepository = AppDataSource.getRepository(Follow);

  const followsCountObject = await followsRepository
  .createQueryBuilder('follows')
  .innerJoinAndSelect('follows.followers', 'follower')
  .where('follower.id = :userId', {userId: userId})
  .select('COUNT(follows)', 'count')
  .getRawOne()
  const followsCount = Number(followsCountObject.count)

  const pageParams = getPageParams(queryParams, followsCount)

  const follows = await followsRepository
  .createQueryBuilder('follows')
  .innerJoinAndSelect('follows.followers', 'follower')
  .where('follower.id = :userId', {userId: userId})
  .select(['follows', 'follower.id', 'follower.username'])
  .orderBy('follows.id')
  .limit(pageParams.limit)
  .offset(pageParams.offset)
  .getMany()

  const returnedObject = {
    page: pageParams.page,
    followersCount: followsCount,
    numberOfPages: pageParams.numberOfPages,
    followers: follows,
  }

  return returnedObject
};

export default listUsersFollowerService;
