import { createInterestService } from './../interests/createInterest.service';
import AppDataSource from "../../data-source"
import Interest from "../../entities/interests.entitie"
import InterestsPost from "../../entities/interestsPost.entities"
import Post from "../../entities/posts.entities"
import AppError from "../../errors/AppError"


export const insertInterestsToPostService = async (interestsArray: string[], postId: string) => {

    const postsRepository = AppDataSource.getRepository(Post)
    const interestsRepository = AppDataSource.getRepository(Interest)
    const interestsPostRepository = AppDataSource.getRepository(InterestsPost)

    if(!interestsArray){
        return {}
    }

    const post = await postsRepository.findOneBy({
        id: postId
    })

    if(!post){
        throw new AppError("Post not found", 404)
    }

    interestsArray.forEach(async elem => {

        let interest = await interestsRepository.findOneBy({
            name: elem
        })

        if(!interest){
            interest = await createInterestService({name: elem})
        }
        await interestsPostRepository.save({
            post,
            interest
        })
    })
}