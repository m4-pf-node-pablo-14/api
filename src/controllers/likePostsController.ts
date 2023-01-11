import { NewLikePostService } from "../services/likePostService/likePostServices";
import { Response } from "express";

export const PostLikeController = async (request, respose: Response) => {
  const userid = request.params.id;
  const postId = request.params.postId;
  await NewLikePostService(userid, postId);

  return respose.status(200);
};
