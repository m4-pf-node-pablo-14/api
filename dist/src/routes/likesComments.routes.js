"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const likesComments_controllers_1 = require("./../controllers/likesComments.controllers");
const express_1 = require("express");
const ensureAuth_middleware_1 = __importDefault(require("../middlewares/ensureAuth.middleware"));
const likesCommentsRouter = (0, express_1.Router)();
likesCommentsRouter.post('/:id', ensureAuth_middleware_1.default, likesComments_controllers_1.createLikeCommentController);
likesCommentsRouter.delete('/:id', ensureAuth_middleware_1.default, likesComments_controllers_1.deleteLikeCommentController);
exports.default = likesCommentsRouter;
//# sourceMappingURL=likesComments.routes.js.map