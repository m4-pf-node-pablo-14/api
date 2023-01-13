"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../errors/AppError"));
const ensurePostDataExistsMiddleware = (req, res, next) => {
    const postData = req.body;
    const keys = Object.keys(postData);
    if (!keys[0]) {
        throw new AppError_1.default('img or description fild needs to have content', 400);
    }
    return next();
};
exports.default = ensurePostDataExistsMiddleware;
//# sourceMappingURL=ensurePostDataExists.middleware.js.map