"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeUsersAndRows = void 0;
const mergeUsersAndRows = (users, rowsOfCounts) => {
    const newUsers = [];
    users.forEach((user) => {
        rowsOfCounts.forEach((row) => {
            if (user.id === row.users_id) {
                const newUser = Object.assign(Object.assign({}, user), { followersCount: Number(row.followersCount), followingCount: Number(row.followingCount), postsCount: Number(row.postsCount) });
                newUsers.push(newUser);
            }
        });
    });
    return newUsers;
};
exports.mergeUsersAndRows = mergeUsersAndRows;
//# sourceMappingURL=users.scripts.js.map