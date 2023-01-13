interface IRowsOfCounts {
    likesCount: string,
    commentsCount: string,
    posts_id: string
}

export const mergePostsAndRows = (posts, rowsOfCounts: IRowsOfCounts[]) => {

    const newPosts = []

    posts.forEach(post => {

        rowsOfCounts.forEach(row => {

        if(post.id === row.posts_id){
          const newPost = {
            ...post,
            likesCount: Number(row.likesCount),
            commentsCount: Number(row.commentsCount)
          }
          
          newPosts.push(newPost)
        }
      })
    })

    return newPosts
}