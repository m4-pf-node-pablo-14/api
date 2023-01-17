import AppDataSource from '../../data-source';
import Interest from '../../entities/interests.entitie';
import { mergeInterestsAndRows } from '../../scripts/interests.scripts';
import { getPageParams } from '../../scripts/pageParams.script';
import { IQueryParams } from './../../interfaces/queryParams.interface';

export const listInterestsService = async (queryParams: IQueryParams) => {

    const interestsRepository = AppDataSource.getRepository(Interest)

  const interestsCountObject = await interestsRepository
    .createQueryBuilder('interests')
    .select('COUNT(interests)', 'count')
    .getRawOne();
  const interestsCount = Number(interestsCountObject.count);

  const pageParams = getPageParams(queryParams, interestsCount);

  const interests = await interestsRepository
    .createQueryBuilder('interest')
    .getMany()


    const rowsOfCount = await interestsRepository
    .createQueryBuilder('interests')
    .leftJoinAndSelect('interests.interestsPost', 'interestspost')
    .orderBy('interests.name')
    .select('interests.id')
    .addSelect('COUNT(interestspost)', 'postsCount')
    .limit(pageParams.limit)
    .offset(pageParams.offset)
    .groupBy('interests.id')
    .getRawMany()

    const newInterests = mergeInterestsAndRows(interests, rowsOfCount)

    const returnedObject = {
        page: pageParams.page,
        interestsCount: interestsCount,
        numberOfPages: pageParams.numberOfPages,
        interests: newInterests
    }

    return returnedObject;
};
 
