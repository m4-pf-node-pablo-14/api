interface IRowsOfCounts {
    followingCount: string,
    followersCount: string,
    postsCount: string,
    users_id: string
}

export const mergeUsersAndRows = (users, rowsOfCounts: IRowsOfCounts[]) => {

    const newUsers = []

    users.forEach(user => {

        rowsOfCounts.forEach(row => {

        if(user.id === row.users_id){
          const newUser = {
            ...user,
            followersCount: Number(row.followersCount),
            followingCount: Number(row.followingCount),
            postsCount: Number(row.postsCount)
          }
          
          newUsers.push(newUser)
        }
      })
    })

    return newUsers
}