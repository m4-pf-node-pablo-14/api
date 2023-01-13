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
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsersSerializer = exports.userResponserSerializer = exports.userUpdateSerializer = exports.userLoginSerializer = exports.userSerializer = void 0;
const yup = __importStar(require("yup"));
const userSerializer = yup.object().shape({
    bio: yup.string().notRequired(),
    email: yup.string().email().required(),
    last_name: yup.string().required(),
    name: yup.string().required(),
    password: yup.string().required(),
    username: yup.string().required(),
    isAdm: yup.boolean().notRequired(),
    address: yup.object().shape({
        city: yup.string().required(),
        district: yup.string().required(),
        number: yup.string().required(),
        state: yup.string().max(2).required(),
        zipCode: yup.string().max(8).required(),
    }),
});
exports.userSerializer = userSerializer;
const userLoginSerializer = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});
exports.userLoginSerializer = userLoginSerializer;
const userUpdateSerializer = yup.object().shape({
    bio: yup.string(),
    email: yup.string().email(),
    last_name: yup.string(),
    name: yup.string(),
    password: yup.string(),
    username: yup.string(),
    address: yup.object().shape({
        district: yup.string().notRequired(),
        zipCode: yup.string().max(8).notRequired(),
        number: yup.string().notRequired(),
        city: yup.string().notRequired(),
        state: yup.string().max(2).notRequired(),
    }),
});
exports.userUpdateSerializer = userUpdateSerializer;
const userResponserSerializer = yup.object().shape({
    address: yup.object().shape({
        id: yup.string(),
        city: yup.string(),
        district: yup.string(),
        number: yup.string(),
        state: yup.string().max(2),
        zipCode: yup.string().max(8),
    }),
    bio: yup.string().nullable(),
    last_name: yup.string(),
    name: yup.string(),
    username: yup.string(),
    email: yup.string().email(),
    id: yup.string().uuid(),
});
exports.userResponserSerializer = userResponserSerializer;
const listUsersSerializer = yup.array(userResponserSerializer);
exports.listUsersSerializer = listUsersSerializer;
//# sourceMappingURL=user.serializes.js.map