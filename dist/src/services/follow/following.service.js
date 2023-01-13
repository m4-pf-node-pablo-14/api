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
const follow_entities_1 = __importDefault(require("../../entities/follow.entities"));
const user_entities_1 = __importDefault(require("../../entities/user.entities"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const followService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const followRepository = data_source_1.default.getRepository(follow_entities_1.default);
    const find = yield followRepository.findOne({
        where: {
            following: { id: data.following },
            followers: { id: data.followers },
        },
    });
    if (find) {
        throw new AppError_1.default('You already follow this user', 404);
    }
    const userRepository = data_source_1.default.getRepository(user_entities_1.default);
    const userFollowing = yield userRepository.findOneBy({ id: data.following });
    const userFollowers = yield userRepository.findOneBy({ id: data.followers });
    const newFollow = followRepository.create({
        following: userFollowing,
        followers: userFollowers,
    });
    yield followRepository.save(newFollow);
});
exports.default = followService;
//# sourceMappingURL=following.service.js.map