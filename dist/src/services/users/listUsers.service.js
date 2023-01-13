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
const data_source_1 = __importDefault(require("../../data-source"));
const user_entities_1 = __importDefault(require("../../entities/user.entities"));
const user_serializes_1 = require("../../serializers/user.serializes");
const users_scripts_1 = require("../../scripts/users.scripts");
const listUsersService = (queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.default.getRepository(user_entities_1.default);
    const userCountObject = yield userRepository
        .createQueryBuilder('users')
        .select('COUNT(*)', 'count')
        .getRawOne();
    const usersCount = Number(userCountObject.count);
    const pageParams = (0, pageParams_script_1.getPageParams)(queryParams, usersCount);
    const users = yield userRepository
        .createQueryBuilder('users')
        .innerJoinAndSelect('users.address', 'address')
        .orderBy('users.createdAt')
        .limit(pageParams.limit)
        .offset(pageParams.offset)
        .select(['users', 'address'])
        .getMany();
    const usersValidated = yield user_serializes_1.listUsersSerializer.validate(users, {
        stripUnknown: true,
    });
    const rowsOfCount = yield userRepository
        .createQueryBuilder('users')
        .leftJoinAndSelect('users.following', 'following')
        .leftJoinAndSelect('users.followers', 'followers')
        .leftJoinAndSelect('users.posts', 'posts')
        .orderBy('users.createdAt')
        .limit(pageParams.limit)
        .offset(pageParams.offset)
        .select('users.id')
        .addSelect('COUNT(following)', 'followingCount')
        .addSelect('COUNT(followers)', 'followersCount')
        .addSelect('COUNT(posts)', 'postsCount')
        .groupBy('users.id')
        .getRawMany();
    const newUsers = (0, users_scripts_1.mergeUsersAndRows)(usersValidated, rowsOfCount);
    const returnedObject = {
        page: pageParams.page,
        usersCount: usersCount,
        numberOfPages: pageParams.numberOfPages,
        users: newUsers,
    };
    return returnedObject;
});
exports.default = listUsersService;
//# sourceMappingURL=listUsers.service.js.map