"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_entities_1 = __importDefault(require("./user.entities"));
let Follow = class Follow {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Follow.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entities_1.default, (user) => user.following, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", user_entities_1.default)
], Follow.prototype, "following", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entities_1.default, (user) => user.followers, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", user_entities_1.default)
], Follow.prototype, "followers", void 0);
Follow = __decorate([
    (0, typeorm_1.Entity)('follow')
], Follow);
exports.default = Follow;
//# sourceMappingURL=follow.entities.js.map