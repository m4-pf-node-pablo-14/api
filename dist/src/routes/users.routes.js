"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users.controllers");
const ensureAuth_middleware_1 = __importDefault(require("../middlewares/ensureAuth.middleware"));
const ensureDataIsValid_middleware_1 = __importDefault(require("../middlewares/ensureDataIsValid.middleware"));
const ensureUserIsExist_middleware_1 = __importDefault(require("../middlewares/ensureUserIsExist.middleware"));
const user_serializes_1 = require("../serializers/user.serializes");
const userRouter = (0, express_1.Router)();
userRouter.post('', (0, ensureDataIsValid_middleware_1.default)(user_serializes_1.userSerializer), users_controllers_1.createUserController);
userRouter.get('', ensureAuth_middleware_1.default, ensureUserIsExist_middleware_1.default, users_controllers_1.listUsersController);
userRouter.get('/followers', ensureAuth_middleware_1.default, ensureUserIsExist_middleware_1.default, users_controllers_1.listUsersFollowerController);
userRouter.get('/following', ensureAuth_middleware_1.default, ensureUserIsExist_middleware_1.default, users_controllers_1.listUsersFollowingController);
userRouter.get('/posts', ensureAuth_middleware_1.default, ensureUserIsExist_middleware_1.default, users_controllers_1.listUserPostsController);
userRouter.get('/comments', ensureAuth_middleware_1.default, ensureUserIsExist_middleware_1.default, users_controllers_1.listUserCommentsController);
userRouter.get('/recomendedFollows', ensureAuth_middleware_1.default, ensureUserIsExist_middleware_1.default, users_controllers_1.listUsersWithSameFollowerController);
userRouter.get('/postsLiked', ensureAuth_middleware_1.default, ensureUserIsExist_middleware_1.default, users_controllers_1.listPostsLikedController);
userRouter.patch('', ensureAuth_middleware_1.default, (0, ensureDataIsValid_middleware_1.default)(user_serializes_1.userUpdateSerializer), users_controllers_1.updateUserController);
userRouter.delete('', ensureAuth_middleware_1.default, ensureUserIsExist_middleware_1.default, users_controllers_1.deleteUserController);
exports.default = userRouter;
//# sourceMappingURL=users.routes.js.map