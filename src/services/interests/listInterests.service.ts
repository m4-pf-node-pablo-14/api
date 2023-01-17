import { group } from 'console';
import AppDataSource from '../../data-source';
import Interest from '../../entities/interests.entitie';
import InterestsPost from '../../entities/interestsPost.entities';
import Post from '../../entities/posts.entities';
import { mergeInterestsAndRows } from '../../scripts/interests.scripts';
import { getPageParams } from '../../scripts/pageParams.script';
import { IQueryParams } from './../../interfaces/queryParams.interface';

export const listInterestsService = async (queryParams: IQueryParams) => {

    const interestsRepository = AppDataSource.getRepository(Interest)
    const interestPostRepository = AppDataSource.getRepository(InterestsPost)
    const postsRepository = AppDataSource.getRepository(Post)

    const interestsCountObject = await interestsRepository
    .createQueryBuilder('interests')
    .select('COUNT(interests)', 'count')
    .getRawOne()
    const interestsCount = Number(interestsCountObject.count)

    const pageParams = getPageParams(queryParams, interestsCount)

    const interests = await interestsRepository
    .createQueryBuilder('interest')
    .leftJoinAndSelect('interest.interestsPost', 'interestsPost')
    .leftJoinAndSelect('interestsPost.post', 'post')
    .getMany()

    const interestsPost = await interestPostRepository
    .createQueryBuilder('interestsPost')
    .leftJoinAndSelect('interestsPost.interest', 'interest')
    .leftJoinAndSelect('interestsPost.post', 'post')
    .getMany()

    const posts = await postsRepository
    .createQueryBuilder('posts')
    .leftJoinAndSelect('posts.interestsPost', 'interestspost')
    .leftJoinAndSelect('interestspost.interest', 'interests')
    .getMany()

    //LUCAS NÃO APAGA POR ENQUANTO

    /* const interests = await interestPostRepository
    .createQueryBuilder('interestspost')
    .leftJoinAndSelect('interestspost.interest', 'interests')
    .orderBy('interests.name')
    .getMany() */

    /* const rowsOfCount = await interestsRepository
    .createQueryBuilder('interests')
    .leftJoinAndSelect('interests.interestsPost', 'interestspost')
    .orderBy('interests.name')
    .select('interests.id')
    .addSelect('COUNT(interestspost)', 'postsCount')
    .groupBy('interests.id')
    .getRawMany() */

    /* const newInterests = mergeInterestsAndRows(interests, rowsOfCount) */

    const returnedObject = {
        page: pageParams.page,
        interestsCount: interestsCount,
        numberOfPages: pageParams.numberOfPages,
        interests: interests
    }

    console.log(interests)

    return returnedObject
}