import AppDataSource from "../../data-source"
import Post from "../../entities/posts.entities"

interface IQueryParams {
    limit?: string
}

export const listPostsService = async (queryParams: IQueryParams, page: number) => {
    const limit = Number(queryParams.limit) || 10
    const offset = Number(page) * limit || 0

    const postsRepository = AppDataSource.getRepository(Post)

    const posts = postsRepository.createQueryBuilder("posts").limit(limit).offset(offset).select("posts")
    

    return posts
}