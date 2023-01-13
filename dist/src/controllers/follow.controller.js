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
exports.deleteFollowController = exports.followController = void 0;
const following_service_1 = __importDefault(require("../services/follow/following.service"));
const deleteFollow_service_1 = __importDefault(require("../services/follow/deleteFollow.service"));
const followController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        following: req.user.id,
        followers: req.params.id,
    };
    yield (0, following_service_1.default)(data);
    return res.status(201).json({ message: 'successfully following' });
});
exports.followController = followController;
const deleteFollowController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        following: req.user.id,
        followers: req.params.id,
    };
    yield (0, deleteFollow_service_1.default)(data);
    return res.status(204).json({ message: 'Successfully Unfollow' });
});
exports.deleteFollowController = deleteFollowController;
//# sourceMappingURL=follow.controller.js.map