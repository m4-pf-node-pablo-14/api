import AppDataSource from "../../data-source"
import Likes from "../../entities/likes.entities"
import User from "../../entities/user.entities"
import AppError from "../../errors/AppError"
import { countInterests } from "../../scripts/interests.scripts"

export const setUserInterestsService = async (userId: string) => {

    const likesToPostsRepository = AppDataSource.getRepository(Likes)
    const userRepository = AppDataSource.getRepository(User)

    const latestLikes = await likesToPostsRepository
    .createQueryBuilder('likes')
    .innerJoin('likes.user', 'user')
    .innerJoinAndSelect('likes.post', 'post')
    .leftJoinAndSelect('post.interestsPost', 'interestPost')
    .innerJoinAndSelect('interestPost.interest', 'interest')
    .where('user.id = :userId', {userId: userId})
    .orderBy('likes.createdAt', 'DESC')
    .limit(20)
    .getMany()

    const userInterests = countInterests(latestLikes)

    const user = await userRepository.findOneBy({
        id: userId
    })

    if(!user){
        throw new AppError('user not found', 404)
    }

    user.mainInterest = userInterests.mainInterest.mainInterestName
    user.recentInterest = userInterests.recentInterest.recentInterestName

    await userRepository.save(user)
}