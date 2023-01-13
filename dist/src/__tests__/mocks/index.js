"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newComentPostUpdated = exports.newComentPostCreated = exports.newPostUpdated = exports.newPostCreated = exports.ErrorMockedLoginRequest = exports.mockedLoginRequest = exports.ErrorMockedUserRequestTwo = exports.mockedUserRequestTwo = exports.mockedUserRequest = void 0;
exports.mockedUserRequest = {
    name: 'vinicius',
    last_name: 'quirino',
    password: '12345678Vv.',
    email: 'vinicius123@hotmail.com',
    username: 'vini123',
    bio: 'Dev Senior',
    address: {
        city: 'Santa Quitéria',
        district: 'Rua Jerusalém',
        number: '72',
        state: 'CE',
        zipCode: '62280000',
    },
};
exports.mockedUserRequestTwo = {
    name: 'Lucas',
    last_name: 'Bueno',
    password: '12345678Vv.',
    email: 'Lucas@hotmail.com',
    username: 'Lucas123',
    bio: 'Dev Senior',
    address: {
        city: 'Florianopolis',
        district: 'Vila Doideira',
        number: '72',
        state: 'SC',
        zipCode: '17340487',
    },
};
exports.ErrorMockedUserRequestTwo = {
    name: "Lucas",
    password: "12345678Vv.",
    email: "Lucas@hotmail.com",
    username: "Lucas123",
    bio: "Dev Senior",
    address: {
        city: "Florianopolis",
        district: "Vila Doideira",
        number: "72",
        state: "SC",
        zipCode: "17340487",
    },
};
exports.mockedLoginRequest = {
    email: "vinicius123@hotmail.com",
    password: "12345678Vv.",
};
exports.ErrorMockedLoginRequest = {
    email: "vinicius@hotmail.com",
    password: "12345678Vv.",
};
exports.newPostCreated = {
    img: "https://img.freepik.com/fotos-gratis/praia-tropical_74190-188.jpg?w=900&t=st=1673629540~exp=1673630140~hmac=819788b872002748d8b66b63ff8250376c321454fb496254632bf8d0b7ac3855",
    description: "This is a new post",
};
exports.newPostUpdated = {
    img: "https://img.freepik.com/fotos-gratis/praia-tropical_74190-188.jpg?w=900&t=st=1673629540~exp=1673630140~hmac=819788b872002748d8b66b63ff8250376c321454fb496254632bf8d0b7ac3855",
    description: "This is a new post updated",
};
exports.newComentPostCreated = {
    text: "this is a new coment post",
};
exports.newComentPostUpdated = {
    text: "this is a new coment post updated",
};
//# sourceMappingURL=index.js.map