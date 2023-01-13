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
const AppError_1 = __importDefault(require("../../errors/AppError"));
const comments_entities_1 = __importDefault(require("../../entities/comments.entities"));
const updateCommentService = (commentData, commentToUpdateId, requesterUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const commentsRepository = data_source_1.default.getRepository(comments_entities_1.default);
    const commentToUpdate = yield commentsRepository
        .createQueryBuilder('comments')
        .innerJoinAndSelect('comments.user', 'user')
        .where('comments.id = :commentId', { commentId: commentToUpdateId })
        .select(['comments', 'user.id', 'user.username'])
        .getOne();
    if (!commentToUpdate) {
        throw new AppError_1.default('comment not found', 404);
    }
    if (commentToUpdate.user.id !== requesterUserId) {
        throw new AppError_1.default('user does not have permission', 401);
    }
    const updatedComment = yield commentsRepository.save(Object.assign(Object.assign({}, commentToUpdate), commentData));
    return updatedComment;
});
exports.default = updateCommentService;
//# sourceMappingURL=updateComment.service.js.map