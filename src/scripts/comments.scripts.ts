import Comment from '../entities/comments.entities';
import { INewComment } from '../interfaces/comments.interface';

interface IRowsOfCounts {
  likesCount: string;
  comments_id: string;
}

const mergeCommentsAndRows = (
  comments: Comment[],
  rowsOfCounts: IRowsOfCounts[],
): INewComment[] => {
  const newComments: INewComment[] = [];

  comments.forEach((comment) => {
    rowsOfCounts.forEach((row) => {
      if (comment.id === row.comments_id) {
        const newUser = {
          ...comment,
          likesCount: Number(row.likesCount),
        };

        newComments.push(newUser);
      }
    });
  });

  return newComments;
};

export { mergeCommentsAndRows };
