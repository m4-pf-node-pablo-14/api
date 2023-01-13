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
exports.deletePostController = exports.listPostsController = exports.updatePostsController = exports.createPostsController = void 0;
const createPosts_service_1 = __importDefault(require("../services/posts/createPosts.service"));
const updatePosts_service_1 = __importDefault(require("../services/posts/updatePosts.service"));
const listPosts_service_1 = __importDefault(require("../services/posts/listPosts.service"));
const deletePosts_service_1 = __importDefault(require("../services/posts/deletePosts.service"));
const createPostsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield (0, createPosts_service_1.default)(req.body, req.user.id);
    return res.status(201).json(post);
});
exports.createPostsController = createPostsController;
const updatePostsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield (0, updatePosts_service_1.default)(req.body, req.params.id, req.user.id);
    return res.json(post);
});
exports.updatePostsController = updatePostsController;
const listPostsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield (0, listPosts_service_1.default)(req.query);
    return res.json(posts);
});
exports.listPostsController = listPostsController;
const deletePostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, deletePosts_service_1.default)(req.params.id, req.user.id);
    return res.status(204).json({});
});
exports.deletePostController = deletePostController;
//# sourceMappingURL=posts.controller.js.map