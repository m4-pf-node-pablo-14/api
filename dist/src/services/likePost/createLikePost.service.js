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
const likes_entities_1 = __importDefault(require("../../entities/likes.entities"));
const posts_entities_1 = __importDefault(require("../../entities/posts.entities"));
const user_entities_1 = __importDefault(require("../../entities/user.entities"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createLikePostService = (userId, postId) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.default.getRepository(user_entities_1.default);
    const postRepository = data_source_1.default.getRepository(posts_entities_1.default);
    const likeRepository = data_source_1.default.getRepository(likes_entities_1.default);
    const postFind = yield postRepository.findOne({
        where: {
            id: postId,
        },
    });
    if (!postFind) {
        throw new AppError_1.default('Post not found', 404);
    }
    const userfind = yield userRepository.findOne({
        where: {
            id: userId,
        },
    });
    if (!userfind) {
        throw new AppError_1.default('User not found', 404);
    }
    const postalreadyliked = yield likeRepository
        .createQueryBuilder('likes')
        .innerJoinAndSelect('likes.post', 'post')
        .innerJoinAndSelect('likes.user', 'user')
        .where('likes.post.id = :postId', { postId })
        .andWhere('likes.user.id = :userId', { userId })
        .getOne();
    if (postalreadyliked) {
        throw new AppError_1.default('Post already liked', 400);
    }
    const likePost = likeRepository.create({
        post: postFind,
        user: userfind,
    });
    yield likeRepository.save(likePost);
    return likePost;
});
exports.default = createLikePostService;
//# sourceMappingURL=createLikePost.service.js.map