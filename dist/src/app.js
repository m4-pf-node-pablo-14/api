"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const handleError_1 = __importDefault(require("./errors/handleError"));
const comments_routes_1 = __importDefault(require("./routes/comments.routes"));
const follow_routes_1 = __importDefault(require("./routes/follow.routes"));
const likePost_routes_1 = __importDefault(require("./routes/likePost.routes"));
const likesComments_routes_1 = __importDefault(require("./routes/likesComments.routes"));
const login_routes_1 = __importDefault(require("./routes/login.routes"));
const posts_routes_1 = __importDefault(require("./routes/posts.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/users', users_routes_1.default);
app.use('/login', login_routes_1.default);
app.use('/follow', follow_routes_1.default);
app.use('/posts', posts_routes_1.default);
app.use('/comments', comments_routes_1.default);
app.use('/like/post', likePost_routes_1.default);
app.use('/like/comment', likesComments_routes_1.default);
app.use(handleError_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map