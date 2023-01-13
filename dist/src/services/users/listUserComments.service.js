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
const comments_scripts_1 = require("./../../scripts/comments.scripts");
const pageParams_script_1 = require("./../../scripts/pageParams.script");
const data_source_1 = __importDefault(require("../../data-source"));
const comments_entities_1 = __importDefault(require("../../entities/comments.entities"));
const listUserCommentsService = (userId, queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    const commentsRepository = data_source_1.default.getRepository(comments_entities_1.default);
    const commentsCountObject = yield commentsRepository
        .createQueryBuilder('comments')
        .innerJoinAndSelect('comments.user', 'user')
        .where('user.id = :userId', { userId: userId })
        .select('COUNT(comments)', 'comments')
        .getRawOne();
    const commentCount = Number(commentsCountObject.comments);
    const pageParams = (0, pageParams_script_1.getPageParams)(queryParams, commentCount);
    const comments = yield commentsRepository
        .createQueryBuilder('comments')
        .innerJoinAndSelect('comments.user', 'user')
        .where('user.id = :userId', { userId: userId })
        .orderBy('comments.createdAt')
        .select(['comments', 'user.id', 'user.username'])
        .limit(pageParams.limit)
        .offset(pageParams.offset)
        .getMany();
    const rowsOfCounts = yield commentsRepository
        .createQueryBuilder('comments')
        .innerJoinAndSelect('comments.user', 'user')
        .leftJoinAndSelect('comments.likes', 'likes')
        .where('user.id = :userId', { userId: userId })
        .orderBy('comments.createdAt')
        .select('comments.id')
        .addSelect('COUNT(likes)', 'likesCount')
        .groupBy('comments.id')
        .limit(pageParams.limit)
        .offset(pageParams.offset)
        .getRawMany();
    const newComments = (0, comments_scripts_1.mergeCommentsAndRows)(comments, rowsOfCounts);
    const returnedObject = {
        page: pageParams.page,
        commentsCount: commentCount,
        numberOfPages: pageParams.numberOfPages,
        users: newComments,
    };
    return returnedObject;
});
exports.default = listUserCommentsService;
//# sourceMappingURL=listUserComments.service.js.map