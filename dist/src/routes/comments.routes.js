"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comments_serializers_1 = require("./../serializers/comments.serializers");
const express_1 = require("express");
const comments_controller_1 = require("../controllers/comments.controller");
const ensureAuth_middleware_1 = __importDefault(require("../middlewares/ensureAuth.middleware"));
const ensureDataIsValid_middleware_1 = __importDefault(require("../middlewares/ensureDataIsValid.middleware"));
const commentRouter = (0, express_1.Router)();
commentRouter.post('/:id', ensureAuth_middleware_1.default, (0, ensureDataIsValid_middleware_1.default)(comments_serializers_1.commentRequestSerializer), comments_controller_1.createCommentsController);
commentRouter.delete('/:id', ensureAuth_middleware_1.default, comments_controller_1.deleteCommentController);
commentRouter.patch('/:id', ensureAuth_middleware_1.default, (0, ensureDataIsValid_middleware_1.default)(comments_serializers_1.commentRequestSerializer), comments_controller_1.updateCommentController);
exports.default = commentRouter;
//# sourceMappingURL=comments.routes.js.map