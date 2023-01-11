
export interface IPostRequest {
    img?: string
    description?: string
}

export interface IPost {
    id: string
    img: string
    description: string
    createdAt: Date
    updateAt: Date
    likes: []
    comments: []

}