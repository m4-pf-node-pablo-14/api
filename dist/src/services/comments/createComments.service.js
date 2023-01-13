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
const user_entities_1 = __importDefault(require("../../entities/user.entities"));
const posts_entities_1 = __importDefault(require("../../entities/posts.entities"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createCommentsService = (postId, commentData, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const postRepository = data_source_1.default.getRepository(posts_entities_1.default);
    const commentRepository = data_source_1.default.getRepository(comments_entities_1.default);
    const userRepository = data_source_1.default.getRepository(user_entities_1.default);
    const user = yield userRepository.findOneBy({
        id: userId,
    });
    const findPost = yield postRepository.findOneBy({
        id: postId,
    });
    if (!user) {
        throw new AppError_1.default('User not found', 404);
    }
    if (!findPost) {
        throw new AppError_1.default('Not found!', 404);
    }
    const comment = commentRepository.create(Object.assign(Object.assign({}, commentData), { user, post: findPost }));
    yield commentRepository.save(comment);
    return comment;
});
exports.default = createCommentsService;
//# sourceMappingURL=createComments.service.js.map