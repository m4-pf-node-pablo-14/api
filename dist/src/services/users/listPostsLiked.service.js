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
const pageParams_script_1 = require("../../scripts/pageParams.script");
const posts_scripts_1 = require("./../../scripts/posts.scripts");
const data_source_1 = __importDefault(require("../../data-source"));
const posts_entities_1 = __importDefault(require("../../entities/posts.entities"));
const listPostsLikedService = (requesterUserId, queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    const postsRepository = data_source_1.default.getRepository(posts_entities_1.default);
    const postsCountObject = yield postsRepository
        .createQueryBuilder('posts')
        .innerJoinAndSelect('posts.user', 'user')
        .leftJoinAndSelect('posts.likes', 'likes')
        .innerJoinAndSelect('likes.user', 'userLike')
        .where('userLike.id = :userId', { userId: requesterUserId })
        .select('COUNT(*)', 'count')
        .getRawOne();
    const postsCount = Number(postsCountObject.count);
    const pageParams = (0, pageParams_script_1.getPageParams)(queryParams, postsCount);
    const posts = yield postsRepository
        .createQueryBuilder('posts')
        .innerJoinAndSelect('posts.user', 'user')
        .leftJoinAndSelect('posts.likes', 'likes')
        .innerJoinAndSelect('likes.user', 'userLike')
        .where('userLike.id = :userId', { userId: requesterUserId })
        .orderBy('posts.createdAt')
        .limit(pageParams.limit)
        .offset(pageParams.offset)
        .select(['posts', 'user.id', 'user.username'])
        .getMany();
    const rowsOfCounts = yield postsRepository
        .createQueryBuilder('posts')
        .innerJoinAndSelect('posts.user', 'user')
        .leftJoinAndSelect('posts.likes', 'likes')
        .innerJoinAndSelect('likes.user', 'userLike')
        .where('userLike.id = :userId', { userId: requesterUserId })
        .orderBy('posts.createdAt')
        .limit(pageParams.limit)
        .offset(pageParams.offset)
        .leftJoinAndSelect('posts.comments', 'comments')
        .select('posts.id')
        .addSelect('COUNT(likes)', 'likesCount')
        .addSelect('COUNT(comments)', 'commentsCount')
        .groupBy('posts.id')
        .getRawMany();
    const newPosts = (0, posts_scripts_1.mergePostsAndRows)(posts, rowsOfCounts);
    const returnedObject = {
        page: pageParams.page,
        postsCount: postsCount,
        numberOfPages: pageParams.numberOfPages,
        postsLiked: newPosts,
    };
    return returnedObject;
});
exports.default = listPostsLikedService;
//# sourceMappingURL=listPostsLiked.service.js.map