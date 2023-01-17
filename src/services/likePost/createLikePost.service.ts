import AppDataSource from "../../data-source";
import Likes from "../../entities/likes.entities";
import Post from "../../entities/posts.entities";
import User from "../../entities/user.entities";
import AppError from "../../errors/AppError";
import { responseCreateLikePostSerializer } from "../../serializers/posts.serializers";
import { IResponseCreateLike } from "../../interfaces/posts.interfaces";

const createLikePostService = async (
  userId: string,
  postId: string
): Promise<IResponseCreateLike> => {
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

  const userfind = await AppDataSource.getRepository(User).findOne({
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

  const validatedResponseCreatedLike = await responseCreateLikePostSerializer.validate(likePost, {
    stripUnknown: true,
  });

  return validatedResponseCreatedLike;
};

export default createLikePostService;
