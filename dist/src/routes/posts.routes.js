"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const posts_serializers_1 = require("./../serializers/posts.serializers");
const express_1 = require("express");
const ensureAuth_middleware_1 = __importDefault(require("../middlewares/ensureAuth.middleware"));
const ensureDataIsValid_middleware_1 = __importDefault(require("../middlewares/ensureDataIsValid.middleware"));
const ensurePostDataExists_middleware_1 = __importDefault(require("../middlewares/ensurePostDataExists.middleware"));
const posts_controller_1 = require("../controllers/posts.controller");
const postRouter = (0, express_1.Router)();
postRouter.post('', ensureAuth_middleware_1.default, (0, ensureDataIsValid_middleware_1.default)(posts_serializers_1.postRequestSerializer), ensurePostDataExists_middleware_1.default, posts_controller_1.createPostsController);
postRouter.patch('/:id', ensureAuth_middleware_1.default, (0, ensureDataIsValid_middleware_1.default)(posts_serializers_1.postRequestSerializer), ensurePostDataExists_middleware_1.default, posts_controller_1.updatePostsController);
postRouter.get('', ensureAuth_middleware_1.default, posts_controller_1.listPostsController);
postRouter.delete('/:id', ensureAuth_middleware_1.default, posts_controller_1.deletePostController);
exports.default = postRouter;
//# sourceMappingURL=posts.routes.js.map