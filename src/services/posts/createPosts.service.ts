import AppDataSource from "../../data-source"
import Post from "../../entities/posts.entities"
import User from "../../entities/user.entities"
import AppError from "../../errors/AppError"

const createPostsService = async (data: any) => {
    const postsRepository =  AppDataSource.getRepository(Post)
    const userRepository = AppDataSource.getRepository(User)

    const findUser = await userRepository.findOneBy({
        id: data.user.id
    })
    
    const post = postsRepository.create({
        img: data.body.img,
        description: data.body.description,
        users: findUser
    });
    
    await postsRepository.save(post)

    return post
}

export default createPostsService;