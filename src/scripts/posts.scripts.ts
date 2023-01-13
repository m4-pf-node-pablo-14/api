import Post from '../entities/posts.entities';
import { INewPost } from '../interfaces/posts.interfaces';

interface IRowsOfCounts {
  likesCount: string;
  commentsCount: string;
  posts_id: string;
}

const mergePostsAndRows = (
  posts: Post[],
  rowsOfCounts: IRowsOfCounts[],
): INewPost[] => {
  const newPosts: INewPost[] = [];

  posts.forEach((post) => {
    rowsOfCounts.forEach((row) => {
      if (post.id === row.posts_id) {
        const newPost = {
          ...post,
          likesCount: Number(row.likesCount),
          commentsCount: Number(row.commentsCount),
        };

        newPosts.push(newPost);
      }
    });
  });

  return newPosts;
};

export { mergePostsAndRows };
