"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergePostsAndRows = void 0;
const mergePostsAndRows = (posts, rowsOfCounts) => {
    const newPosts = [];
    posts.forEach((post) => {
        rowsOfCounts.forEach((row) => {
            if (post.id === row.posts_id) {
                const newPost = Object.assign(Object.assign({}, post), { likesCount: Number(row.likesCount), commentsCount: Number(row.commentsCount) });
                newPosts.push(newPost);
            }
        });
    });
    return newPosts;
};
exports.mergePostsAndRows = mergePostsAndRows;
//# sourceMappingURL=posts.scripts.js.map