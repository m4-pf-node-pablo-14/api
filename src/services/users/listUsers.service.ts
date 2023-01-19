import { IQueryParams } from '../../interfaces/queryParams.interface';
import { getPageParams } from '../../scripts/pageParams.script';
import AppDataSource from '../../data-source';
import User from '../../entities/user.entities';
import { listUsersSerializer } from '../../serializers/user.serializes';
import {
  mergeUserCountArrays,
  mergeUsersAndRows,
} from '../../scripts/users.scripts';
import { INewUser, IUserResponse } from '../../interfaces/users.interfaces';
import { Repository } from 'typeorm';

interface IReturned {
  page: number;
  usersCount: number;
  numberOfPages: number;
  users: INewUser[];
}

const listUsersService = async (
  queryParams: IQueryParams,
): Promise<IReturned> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const userCountObject = await userRepository
    .createQueryBuilder('users')
    .select('COUNT(*)', 'count')
    .getRawOne();
  const usersCount = Number(userCountObject.count);

  const pageParams = getPageParams(queryParams, usersCount);

  const users: User[] = await userRepository
    .createQueryBuilder('users')
    .innerJoinAndSelect('users.address', 'address')
    .orderBy('users.createdAt')
    .limit(pageParams.limit)
    .offset(pageParams.offset)
    .select(['users', 'address'])
    .getMany();

  const usersValidated: IUserResponse[] = await listUsersSerializer.validate(
    users,
    {
      stripUnknown: true,
    },
  );

  const postsCount = await userRepository
    .createQueryBuilder('users')
    .leftJoinAndSelect('users.posts', 'posts')
    .orderBy('users.createdAt')
    .limit(pageParams.limit)
    .offset(pageParams.offset)
    .select('users.id')
    .addSelect('COUNT(posts)', 'postsCount')
    .groupBy('users.id')
    .getRawMany();

  const followersCount = await userRepository
    .createQueryBuilder('users')
    .leftJoinAndSelect('users.followers', 'followers')
    .orderBy('users.createdAt')
    .limit(pageParams.limit)
    .offset(pageParams.offset)
    .select('users.id')
    .addSelect('COUNT(followers)', 'followersCount')
    .groupBy('users.id')
    .getRawMany();

  const followingCount = await userRepository
    .createQueryBuilder('users')
    .leftJoinAndSelect('users.following', 'following')
    .orderBy('users.createdAt')
    .limit(pageParams.limit)
    .offset(pageParams.offset)
    .select('users.id')
    .addSelect('COUNT(following)', 'followingCount')
    .groupBy('users.id')
    .getRawMany();

  const postsAndFollowersCountArray = mergeUserCountArrays(
    postsCount,
    followersCount,
  );

  const rowsOfCount = mergeUserCountArrays(
    postsAndFollowersCountArray,
    followingCount,
  );

  const newUsers: INewUser[] = mergeUsersAndRows(usersValidated, rowsOfCount);

  return {
    page: pageParams.page,
    usersCount: usersCount,
    numberOfPages: pageParams.numberOfPages,
    users: newUsers,
  };
};

export default listUsersService;
