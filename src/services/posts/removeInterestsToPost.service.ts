import AppDataSource from "../../data-source"
import InterestsPost from "../../entities/interestsPost.entities"
import Post from "../../entities/posts.entities"

export const removeInterestsToPostService = async (postId: string) => {

    const postsRepository = AppDataSource.getRepository(Post)
    const interestsPostRepository = AppDataSource.getRepository(InterestsPost)

    const interestsPostArray = await interestsPostRepository
    .createQueryBuilder('interestsPost')
    .leftJoin('interestsPost.post', 'post')
    .where('post.id = :postId', {postId: postId}) 
    .getMany()

    interestsPostArray.forEach(async interestPost => {

        await interestsPostRepository.remove(interestPost)
    })
}