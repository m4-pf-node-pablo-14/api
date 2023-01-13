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
exports.deslikePostController = exports.createLikePostController = void 0;
const createLikePost_service_1 = __importDefault(require("../services/likePost/createLikePost.service"));
const deleteLikePost_service_1 = __importDefault(require("../services/likePost/deleteLikePost.service"));
const createLikePostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const like = yield (0, createLikePost_service_1.default)(req.user.id, req.params.id);
    return res.status(201).json(like);
});
exports.createLikePostController = createLikePostController;
const deslikePostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, deleteLikePost_service_1.default)(req.user.id, req.params.id);
    return res.status(204).json({});
});
exports.deslikePostController = deslikePostController;
//# sourceMappingURL=likePost.controller.js.map