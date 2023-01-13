import User from '../entities/user.entities';
import { INewUser, IUserResponse } from '../interfaces/users.interfaces';

interface IRowsOfCounts {
  followingCount: string;
  followersCount: string;
  postsCount: string;
  users_id: string;
}

const mergeUsersAndRows = (
  users: IUserResponse[],
  rowsOfCounts: IRowsOfCounts[],
): INewUser[] => {
  const newUsers: INewUser[] = [];

  users.forEach((user) => {
    rowsOfCounts.forEach((row) => {
      if (user.id === row.users_id) {
        const newUser = {
          ...user,
          followersCount: Number(row.followersCount),
          followingCount: Number(row.followingCount),
          postsCount: Number(row.postsCount),
        };

        newUsers.push(newUser);
      }
    });
  });

  return newUsers;
};

export { mergeUsersAndRows };
