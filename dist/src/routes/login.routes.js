"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controllers_1 = require("../controllers/login.controllers");
const ensureDataIsValid_middleware_1 = __importDefault(require("../middlewares/ensureDataIsValid.middleware"));
const user_serializes_1 = require("../serializers/user.serializes");
const loginRouter = (0, express_1.Router)();
loginRouter.post('', (0, ensureDataIsValid_middleware_1.default)(user_serializes_1.userLoginSerializer), login_controllers_1.createLoginController);
exports.default = loginRouter;
//# sourceMappingURL=login.routes.js.map