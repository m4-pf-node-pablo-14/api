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
exports.deleteLikeCommentController = exports.createLikeCommentController = void 0;
const createLikeComment_service_1 = __importDefault(require("../services/likeComments/createLikeComment.service"));
const deleteLikeComment_service_1 = __importDefault(require("../services/likeComments/deleteLikeComment.service"));
const createLikeCommentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const like = yield (0, createLikeComment_service_1.default)(req.params.id, req.user.id);
    return res.status(201).json(like);
});
exports.createLikeCommentController = createLikeCommentController;
const deleteLikeCommentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, deleteLikeComment_service_1.default)(req.params.id, req.user.id);
    return res.status(204).json({});
});
exports.deleteLikeCommentController = deleteLikeCommentController;
//# sourceMappingURL=likesComments.controllers.js.map