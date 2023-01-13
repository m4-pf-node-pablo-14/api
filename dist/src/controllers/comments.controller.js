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
exports.updateCommentController = exports.deleteCommentController = exports.createCommentsController = void 0;
const createComments_service_1 = __importDefault(require("../services/comments/createComments.service"));
const deleteComment_service_1 = __importDefault(require("../services/comments/deleteComment.service"));
const updateComment_service_1 = __importDefault(require("../services/comments/updateComment.service"));
const createCommentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield (0, createComments_service_1.default)(req.params.id, req.body, req.user.id);
    return res.status(201).json(post);
});
exports.createCommentsController = createCommentsController;
const deleteCommentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, deleteComment_service_1.default)(req.params.id, req.user.id);
    return res.status(204).json({});
});
exports.deleteCommentController = deleteCommentController;
const updateCommentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedComment = yield (0, updateComment_service_1.default)(req.body, req.params.id, req.user.id);
    res.json(updatedComment);
});
exports.updateCommentController = updateCommentController;
//# sourceMappingURL=comments.controller.js.map