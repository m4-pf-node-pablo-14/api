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
const data_source_1 = __importDefault(require("../../data-source"));
const address_entities_1 = __importDefault(require("../../entities/address.entities"));
const user_entities_1 = __importDefault(require("../../entities/user.entities"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_serializes_1 = require("../../serializers/user.serializes");
const createUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.default.getRepository(user_entities_1.default);
    const addressRepository = data_source_1.default.getRepository(address_entities_1.default);
    const userVerify = yield userRepository.find({
        where: [{ email: userData.email }, { username: userData.username }],
        withDeleted: true,
    });
    if (userVerify[0]) {
        throw new AppError_1.default('user already exists');
    }
    const address = addressRepository.create(userData.address);
    yield addressRepository.save(address);
    delete userData.address;
    const user = userRepository.create(Object.assign(Object.assign({}, userData), { address }));
    yield userRepository.save(user);
    const createdUser = yield user_serializes_1.userResponserSerializer.validate(user, {
        stripUnknown: true,
    });
    return createdUser;
});
exports.default = createUserService;
//# sourceMappingURL=createUser.service.js.map