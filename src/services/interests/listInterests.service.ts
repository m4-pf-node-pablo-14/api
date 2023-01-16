import AppDataSource from '../../data-source';
import Interest from '../../entities/interests.entitie';
import InterestsPost from '../../entities/interestsPost.entities';
import { mergeInterestsAndRows } from '../../scripts/interests.scripts';
import { getPageParams } from '../../scripts/pageParams.script';
import { IQueryParams } from './../../interfaces/queryParams.interface';

export const listInterestsService = async (queryParams: IQueryParams) => {

    const interestsRepository = AppDataSource.getRepository(Interest)
    const interestPostRepository = AppDataSource.getRepository(InterestsPost)

    const interestsCountObject = await interestsRepository
    .createQueryBuilder('interests')
    .select('COUNT(interests)', 'count')
    .getRawOne()
    const interestsCount = Number(interestsCountObject.count)

    const pageParams = getPageParams(queryParams, interestsCount)

    /* const interests = await interestsRepository
    .createQueryBuilder('interests')
    .leftJoinAndSelect('interests.interestsPost', 'interestspost')
    .leftJoinAndSelect('interestspost.post', 'posts')
    .orderBy('interests.name')
    .limit(pageParams.limit)
    .offset(pageParams.offset)
    .getMany() */

    const interests = await interestPostRepository
    .createQueryBuilder('interestspost')
    .leftJoinAndSelect('interestspost.interest', 'interests')
    .select('interests')
    .getMany()

    const rowsOfCount = await interestsRepository
    .createQueryBuilder('interests')
    .leftJoinAndSelect('interests.interestsPost', 'interestspost')
    .orderBy('interests.name')
    .select('interests.id')
    .addSelect('COUNT(interestspost)', 'postsCount')
    .groupBy('interests.id')
    .getRawMany()

    /* const newInterests = mergeInterestsAndRows(interests, rowsOfCount) */

    const returnedObject = {
        page: pageParams.page,
        interestsCount: interestsCount,
        numberOfPages: pageParams.numberOfPages,
        interests: interests
    }

    return returnedObject
}