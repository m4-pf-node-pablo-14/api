import AppDataSource from '../../data-source';
import Comment from '../../entities/comments.entities';

const listUserCommentsService = async (tokenId: string): Promise<Comment[]> => {
  const comments = await AppDataSource.getRepository(Comment).find({
    where: { user: { id: tokenId } },
  });

  return comments;
};

export default listUserCommentsService;
