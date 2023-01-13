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
const posts_entities_1 = __importDefault(require("../../entities/posts.entities"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const deletePostService = (postToDeleteId, requesterUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const postsRepository = data_source_1.default.getRepository(posts_entities_1.default);
    const postToDelete = yield postsRepository
        .createQueryBuilder('posts')
        .innerJoinAndSelect('posts.user', 'user')
        .where('posts.id = :postId', { postId: postToDeleteId })
        .getOne();
    if (!postToDelete) {
        throw new AppError_1.default('post not found', 404);
    }
    if (postToDelete.user.id !== requesterUserId) {
        throw new AppError_1.default('user does not have permission to delete this post', 401);
    }
    yield postsRepository.remove(postToDelete);
});
exports.default = deletePostService;
//# sourceMappingURL=deletePosts.service.js.map