"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const follow_controller_1 = require("../controllers/follow.controller");
const ensureAuth_middleware_1 = __importDefault(require("../middlewares/ensureAuth.middleware"));
const followRoutes = (0, express_1.Router)();
followRoutes.post('/:id', ensureAuth_middleware_1.default, follow_controller_1.followController);
followRoutes.delete('/:id', ensureAuth_middleware_1.default, follow_controller_1.deleteFollowController);
exports.default = followRoutes;
//# sourceMappingURL=follow.routes.js.map