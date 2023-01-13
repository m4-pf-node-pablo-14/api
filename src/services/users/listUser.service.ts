import { IQueryParams } from './../../interfaces/queryParams.interface';
import { getPageParams } from './../../scripts/pageParams.script';
import AppDataSource from '../../data-source';
import User from '../../entities/user.entities';
import { listUsersSerializer } from '../../serializers/user.serializes';
import { mergeUsersAndRows } from '../../scripts/users.scripts';

const listUsersService = async (queryParams: IQueryParams) => {

  const userRepository = await AppDataSource.getRepository(User)

  const userCountObject = await userRepository
  .createQueryBuilder('users')
  .select('COUNT(*)', 'count')
  .getRawOne();
  const usersCount = Number(userCountObject.count);

  const pageParams = getPageParams(queryParams, usersCount)

  const users = await userRepository
  .createQueryBuilder('users')
  .innerJoinAndSelect('users.address', 'address')
  .orderBy('users.createdAt')
  .limit(pageParams.limit)
  .offset(pageParams.offset)
  .select(['users', 'address'])
  .getMany()

  const usersValidated = await listUsersSerializer.validate(users, {
    stripUnknown: true
  })

  const rowsOfCount = await userRepository
  .createQueryBuilder('users')
  .leftJoinAndSelect('users.following', 'following')
  .leftJoinAndSelect('following.followers', 'followerVerify')
  .leftJoinAndSelect('users.followers', 'followers')
  .leftJoinAndSelect('users.posts', 'posts')
  .orderBy('users.createdAt')
  .limit(pageParams.limit)
  .offset(pageParams.offset)
  .select('users.id')
  .addSelect('COUNT(following)', 'followingCount')
  .addSelect('COUNT(followers)', 'followersCount')
  .addSelect('COUNT(posts)', 'postsCount')
  .groupBy('users.id')
  .getRawMany()

  const newUsers = mergeUsersAndRows(usersValidated, rowsOfCount)

  const returnedObject = {
    page: pageParams.page,
    usersCount: usersCount,
    numberOfPages: pageParams.numberOfPages,
    users: newUsers
  }
    
  return returnedObject
};

export default listUsersService;
