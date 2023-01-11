import AppDataSource from "../../data-source";
import Likes from "../../entities/likes.entities";
import Post from "../../entities/posts.entities";
import User from "../../entities/user.entities";
import AppError from "../../errors/AppError";
export const NewLikePostService = async (postId: string, userId: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const postRepository = AppDataSource.getRepository(Post);
  const likeRepository = AppDataSource.getRepository(Likes);

  const postFind = await postRepository.findOne({
    where: {
      id: postId,
    },
  });
  if (!postFind) {
    throw new AppError("Post not found", 404);
  }

  const userfind = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!userfind) {
    throw new AppError("User not found", 404);
  }

  const postalreadyliked = await likeRepository
    .createQueryBuilder("likes")
    .innerJoinAndSelect("likes.post", "post")
    .innerJoinAndSelect("likes.user", "user")
    .where("likes.post.id = :postId", { postId })
    .andWhere("likes.user.id = :userId", { userId })
    .getOne();

  if (postalreadyliked) {
    throw new AppError("Post already liked", 400);
  }

  const likePost = likeRepository.create({
    post: postFind,
    user: userfind,
  });

  await likeRepository.save(likePost);

  return likePost;
};

const deleteLikePostService = async (postId: string, userId: string) => {
  const postRepository = AppDataSource.getRepository(Post);
  const likeRepository = AppDataSource.getRepository(Likes);
  const userRepository = AppDataSource.getRepository(User);

  const postFind = await postRepository.findOne({
    where: {
      id: postId,
    },
  });

  if (!postFind) {
    throw new AppError("Post not found", 404);
  }
  const userfind = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!userfind) {
    throw new AppError("User not found", 404);
  }

  const deslikePost = await likeRepository
    .createQueryBuilder("likes")
    .delete()
    .where("likes.post.id = :postId", { postId })
    .andWhere("likes.user.id = :userId", { userId })
    .execute();

  return deslikePost;
};

// const deslikePost = likeRepository.delete({
//   post: postFind,
//   user: userfind,
// });
// }
