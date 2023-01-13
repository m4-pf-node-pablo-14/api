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
const listUsersFollowerService = (tokenId) => __awaiter(void 0, void 0, void 0, function* () {
    const followRepository = data_source_1.default.getRepository(follow_entities_1.default);
    const followers = yield followRepository
        .createQueryBuilder('follow')
        .where('follow.followers = :tokenId', { tokenId })
        .getMany();
    return followers;
});
exports.default = listUsersFollowerService;
//# sourceMappingURL=listUsersFollower.service.js.map