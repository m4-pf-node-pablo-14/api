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
const likes_entities_1 = __importDefault(require("../../entities/likes.entities"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const deslikePostService = (userId, likePostID) => __awaiter(void 0, void 0, void 0, function* () {
    const likeRepository = data_source_1.default.getRepository(likes_entities_1.default);
    const likePost = yield likeRepository.findOne({
        where: {
            id: likePostID,
            user: {
                id: userId,
            },
        },
    });
    if (!likePost) {
        throw new AppError_1.default('post not liked ', 404);
    }
    yield likeRepository.remove(likePost);
});
exports.default = deslikePostService;
//# sourceMappingURL=deleteLikePost.service.js.map