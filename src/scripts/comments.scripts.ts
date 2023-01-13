interface IRowsOfCounts {
    likesCount: string,
    comments_id: string
}

export const mergeCommentsAndRows = (comments, rowsOfCounts: IRowsOfCounts[]) => {

    const newComments = []

    comments.forEach(comment => {

        rowsOfCounts.forEach(row => {

        if(comment.id === row.comments_id){
          const newUser = {
            ...comment,
            likesCount: Number(row.likesCount),
          }
          
          newComments.push(newUser)
        }
      })
    })

    return newComments
}