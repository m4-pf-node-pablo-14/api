import AppDataSource from '../../data-source';
import Comment from '../../entities/comments.entities';
import User from '../../entities/user.entities';
import Post from '../../entities/posts.entities';
import AppError from '../../errors/AppError';

const createCommentsService = async (postId: string, req: any) => {
  const postRepository = AppDataSource.getRepository(Post);
  const commentRepository = AppDataSource.getRepository(Comment);
  const userRepository = AppDataSource.getRepository(User);
  console.log(req.user);

  const user = await userRepository.findOneBy({
    id: req.user.id,
  });

  const findPost = await postRepository.findOneBy({
    id: postId,
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (!findPost) {
    throw new AppError('Not found!', 404);
  }

  const comment = {
    text: req.body,
    // user: user.id,
    // post: findPost.id
  };

  const newComment = commentRepository.create(comment);

  await commentRepository.save(newComment);

  return newComment;
};

export default createCommentsService;
