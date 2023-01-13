"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../data-source"));
const comments_entities_1 = __importDefault(require("../../entities/comments.entities"));
const commentToLikes_entities_1 = __importDefault(require("../../entities/commentToLikes.entities"));
const user_entities_1 = __importDefault(require("../../entities/user.entities"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createLikeCommentService = (commentId, requesterUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const commentRepository = data_source_1.default.getRepository(comments_entities_1.default);
    const userRepositoory = data_source_1.default.getRepository(user_entities_1.default);
    const likesCommentsRepository = data_source_1.default.getRepository(commentToLikes_entities_1.default);
    const comment = yield commentRepository.findOneBy({
        id: commentId,
    });
    if (!comment) {
        throw new AppError_1.default('comment not found', 404);
    }
    const isCommentLiked = yield commentRepository
        .createQueryBuilder('comments')
        .innerJoinAndSelect('comments.likes', 'likes')
        .innerJoinAndSelect('likes.user', 'user')
        .where('user.id = :userId', { userId: requesterUserId })
        .getOne();
    if (isCommentLiked) {
        throw new AppError_1.default('comment already liked', 400);
    }
    const user = yield userRepositoory.findOneBy({
        id: requesterUserId,
    });
    const likeToComment = likesCommentsRepository.create({
        comment,
        user,
    });
    yield likesCommentsRepository.save(likeToComment);
    return likeToComment;
});
exports.default = createLikeCommentService;
//# sourceMappingURL=createLikeComment.service.js.map