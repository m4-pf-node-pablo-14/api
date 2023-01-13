"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bcryptjs_1 = require("bcryptjs");
const data_source_1 = __importDefault(require("../../data-source"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const jwt = __importStar(require("jsonwebtoken"));
require("dotenv/config");
const user_entities_1 = __importDefault(require("../../entities/user.entities"));
const createLoginService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield data_source_1.default.getRepository(user_entities_1.default).findOneBy({
        email: userData.email,
    });
    if (!user) {
        throw new AppError_1.default('wrong email or password');
    }
    const passwordMatch = (0, bcryptjs_1.compareSync)(userData.password, user.password);
    if (!passwordMatch) {
        throw new AppError_1.default('wrong email or password');
    }
    const token = jwt.sign({}, process.env.SECRET_KEY, {
        expiresIn: '24h',
        subject: user.id,
    });
    return { token };
});
exports.default = createLoginService;
//# sourceMappingURL=createLogin.service.js.map