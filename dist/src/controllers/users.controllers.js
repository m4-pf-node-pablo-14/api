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
exports.deleteUserController = exports.updateUserController = exports.listPostsLikedController = exports.listUsersWithSameFollowerController = exports.listUserPostsController = exports.listUsersFollowingController = exports.listUsersFollowerController = exports.listUserCommentsController = exports.listUsersController = exports.createUserController = void 0;
const createUser_service_1 = __importDefault(require("../services/users/createUser.service"));
const deleteUser_service_1 = __importDefault(require("../services/users/deleteUser.service"));
const listPostsLiked_service_1 = __importDefault(require("../services/users/listPostsLiked.service"));
const listUsers_service_1 = __importDefault(require("../services/users/listUsers.service"));
const listUserComments_service_1 = __importDefault(require("../services/users/listUserComments.service"));
const listUserPosts_service_1 = __importDefault(require("../services/users/listUserPosts.service"));
const listUsersFollower_service_1 = __importDefault(require("../services/users/listUsersFollower.service"));
const listUsersFollowing_service_1 = __importDefault(require("../services/users/listUsersFollowing.service"));
const listUsersWithSameFollower_service_1 = __importDefault(require("../services/users/listUsersWithSameFollower.service"));
const updateUser_service_1 = __importDefault(require("../services/users/updateUser.service"));
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, createUser_service_1.default)(req.body);
    return res.status(201).json(user);
});
exports.createUserController = createUserController;
const listUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, listUsers_service_1.default)(req.query);
    return res.json(users);
});
exports.listUsersController = listUsersController;
const listUserCommentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield (0, listUserComments_service_1.default)(req.user.id, req.query);
    return res.json(comments);
});
exports.listUserCommentsController = listUserCommentsController;
const listUsersFollowerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const followers = yield (0, listUsersFollower_service_1.default)(req.user.id);
    return res.json(followers);
});
exports.listUsersFollowerController = listUsersFollowerController;
const listUsersFollowingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const following = yield (0, listUsersFollowing_service_1.default)(req.user.id);
    return res.json(following);
});
exports.listUsersFollowingController = listUsersFollowingController;
const listUserPostsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield (0, listUserPosts_service_1.default)(req.user.id);
    return res.json(posts);
});
exports.listUserPostsController = listUserPostsController;
const listUsersWithSameFollowerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, listUsersWithSameFollower_service_1.default)(req.user.id);
    return res.json(users);
});
exports.listUsersWithSameFollowerController = listUsersWithSameFollowerController;
const listPostsLikedController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield (0, listPostsLiked_service_1.default)(req.user.id, req.query);
    return res.json(posts);
});
exports.listPostsLikedController = listPostsLikedController;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, updateUser_service_1.default)(req.body, req.user.id);
    return res.json(user);
});
exports.updateUserController = updateUserController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, deleteUser_service_1.default)(req.user.id);
    return res.status(204).json({});
});
exports.deleteUserController = deleteUserController;
//# sourceMappingURL=users.controllers.js.map