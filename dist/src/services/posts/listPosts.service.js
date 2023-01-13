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
const listPostsService = (queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    const postsRepository = data_source_1.default.getRepository(posts_entities_1.default);
    const postsCountObject = yield postsRepository
        .createQueryBuilder('posts')
        .select('COUNT(*)', 'count')
        .getRawOne();
    const postsCount = Number(postsCountObject.count);
    let page = Number(queryParams.page) || 1;
    const limit = Number(queryParams.limit) || 10;
    const numberOfPages = Math.ceil(postsCount / limit);
    const isLastPage = queryParams.lastPage || false;
    if (isLastPage) {
        page = numberOfPages;
    }
    const offset = Number(page) * limit - limit || 0;
    const posts = yield postsRepository
        .createQueryBuilder('posts')
        .innerJoinAndSelect('posts.user', 'user')
        .leftJoinAndSelect('posts.comments', 'comments')
        .leftJoinAndSelect('comments.likes', 'likess')
        .leftJoinAndSelect('posts.likes', 'likes')
        .select([
        'posts',
        'comments',
        'likess',
        'likes',
        'user.id',
        'user.username',
    ])
        .limit(limit)
        .offset(offset)
        .getMany();
    const returnedObject = {
        page: page,
        postsCount: postsCount,
        posts: posts,
        numberOfPages: numberOfPages,
    };
    return returnedObject;
});
exports.default = listPostsService;
//# sourceMappingURL=listPosts.service.js.map