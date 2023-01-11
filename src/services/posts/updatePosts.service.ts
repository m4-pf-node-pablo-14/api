import AppDataSource from "../../data-source"
import Post from "../../entities/posts.entities"
import User from "../../entities/user.entities"
import AppError from "../../errors/AppError"

const updatePostsService = async (req: any, postId: string) => {
    const postsRepository = AppDataSource.getRepository(Post)
    const userRepository = AppDataSource.getRepository(User)
    
    const findUser = await userRepository.findOneBy({
        id: req.user.id
    })
    const findPost = await postsRepository.createQueryBuilder('Post').innerJoinAndSelect('Post.users', 'User').where('Post.id = :id', {id: postId}).getOne()

    if (req.user.id !== findPost.users.id) {
        throw new AppError("You don't have permission", 400)
    }
    
    if (!findUser) {
        throw new AppError("User not found", 404)
    }
    if (!findPost) {
        throw new AppError("Post not found", 404)
    }
    
    const newPost =  {
        ...findPost,
        ...req.body,
        users: findUser
    }
    
    return newPost
}

export default updatePostsService;