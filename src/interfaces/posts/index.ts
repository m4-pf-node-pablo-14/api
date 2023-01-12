import User from "../../entities/user.entities"

export interface IPostRequest {
    img?: string
    description?: string
}

/* export interface IPost {
    id: string
    img?: string
    description?: string
    createdAt: Date
    updateAt: Date
    likes?: string[]
    comments?: string[]
    user?: User
} */