"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeCommentsAndRows = void 0;
const mergeCommentsAndRows = (comments, rowsOfCounts) => {
    const newComments = [];
    comments.forEach((comment) => {
        rowsOfCounts.forEach((row) => {
            if (comment.id === row.comments_id) {
                const newUser = Object.assign(Object.assign({}, comment), { likesCount: Number(row.likesCount) });
                newComments.push(newUser);
            }
        });
    });
    return newComments;
};
exports.mergeCommentsAndRows = mergeCommentsAndRows;
//# sourceMappingURL=comments.scripts.js.map