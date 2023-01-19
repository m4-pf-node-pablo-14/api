import { Repository } from 'typeorm';
import AppDataSource from '../../data-source';
import Interest from '../../entities/interests.entities';
import { IInterst } from '../../interfaces/interests.interfaces';
import { mergeInterestsAndRows } from '../../scripts/interests.scripts';
import { getPageParams } from '../../scripts/pageParams.script';
import { IQueryParams } from './../../interfaces/queryParams.interface';

interface IReturned {
  page: number;
  interestsCount: number;
  numberOfPages: number;
  interests: IInterst[];
}

const listInterestsService = async (
  queryParams: IQueryParams,
): Promise<IReturned> => {
  const interestsRepository: Repository<Interest> =
    AppDataSource.getRepository(Interest);

  const interestsCountObject = await interestsRepository
    .createQueryBuilder('interests')
    .select('COUNT(interests)', 'count')
    .getRawOne();

  const interestsCount = Number(interestsCountObject.count);

  const pageParams = getPageParams(queryParams, interestsCount);

  const interests: Interest[] = await interestsRepository
    .createQueryBuilder('interest')
    .getMany();

  const rowsOfCount = await interestsRepository
    .createQueryBuilder('interests')
    .leftJoinAndSelect('interests.interestsPost', 'interestspost')
    .orderBy('interests.name')
    .select('interests.id')
    .addSelect('COUNT(interestspost)', 'postsCount')
    .limit(pageParams.limit)
    .offset(pageParams.offset)
    .groupBy('interests.id')
    .getRawMany();

  const newInterests: IInterst[] = mergeInterestsAndRows(
    interests,
    rowsOfCount,
  );

  return {
    page: pageParams.page,
    interestsCount: interestsCount,
    numberOfPages: pageParams.numberOfPages,
    interests: newInterests,
  };
};

export default listInterestsService;
