"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const likePost_controller_1 = require("../controllers/likePost.controller");
const ensureAuth_middleware_1 = __importDefault(require("../middlewares/ensureAuth.middleware"));
const likePostRouter = (0, express_1.Router)();
likePostRouter.post('/:id', ensureAuth_middleware_1.default, likePost_controller_1.createLikePostController);
likePostRouter.delete('/:id', ensureAuth_middleware_1.default, likePost_controller_1.deslikePostController);
exports.default = likePostRouter;
//# sourceMappingURL=likePost.routes.js.map