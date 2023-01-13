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
const data_source_1 = __importDefault(require("../../../data-source"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
const mocks_1 = require("../../mocks");
describe('/follow', () => {
    let connection;
    const object = {
        createUserTwo: null,
        authorization: null,
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then((res) => {
            connection = res;
        })
            .catch((err) => {
            console.error('Error during Data Source initialization', err);
        });
        yield (0, supertest_1.default)(app_1.default).post('/users').send(mocks_1.mockedUserRequest);
        const createUserTwo = yield (0, supertest_1.default)(app_1.default)
            .post('/users')
            .send(mocks_1.mockedUserRequestTwo);
        const authorization = yield (0, supertest_1.default)(app_1.default)
            .post('/login')
            .send(mocks_1.mockedLoginRequest);
        object.createUserTwo = createUserTwo.body.id;
        object.authorization = authorization.body.token;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test('Should be able to follow the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(`/follow/${object.createUserTwo}`)
            .set('Authorization', `Bearer ${object.authorization}`);
        expect(response.body).toHaveProperty('message');
        expect(response.status).toBe(201);
    }));
    test('It must be possible to unfollow the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const responseTwo = yield (0, supertest_1.default)(app_1.default)
            .delete(`/follow/${object.createUserTwo}`)
            .set('Authorization', `Bearer ${object.authorization}`);
        expect(responseTwo.status).toBe(204);
    }));
});
//# sourceMappingURL=followRoutes.test.js.map