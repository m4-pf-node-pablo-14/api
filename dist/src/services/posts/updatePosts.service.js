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
const updatePostsService = (postData, postToUpdateId, requesterUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const postsRepository = data_source_1.default.getRepository(posts_entities_1.default);
    const postToUpdate = yield postsRepository
        .createQueryBuilder('Post')
        .innerJoinAndSelect('Post.user', 'User')
        .where('Post.id = :id', { id: postToUpdateId })
        .getOne();
    if (requesterUserId !== postToUpdate.user.id) {
        throw new AppError_1.default('You don\'t have permission', 401);
    }
    if (!postToUpdate) {
        throw new AppError_1.default('Post not found', 404);
    }
    const newPost = yield postsRepository.save(Object.assign(Object.assign({}, postToUpdate), postData));
    return newPost;
});
exports.default = updatePostsService;
//# sourceMappingURL=updatePosts.service.js.map