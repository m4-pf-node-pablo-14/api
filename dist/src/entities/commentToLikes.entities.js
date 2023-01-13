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
const comments_entities_1 = __importDefault(require("./comments.entities"));
const user_entities_1 = __importDefault(require("./user.entities"));
let CommentToLikes = class CommentToLikes {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CommentToLikes.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CommentToLikes.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entities_1.default, (user) => user.commentLikes, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", user_entities_1.default)
], CommentToLikes.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => comments_entities_1.default, (comment) => comment.likes, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", comments_entities_1.default)
], CommentToLikes.prototype, "comment", void 0);
CommentToLikes = __decorate([
    (0, typeorm_1.Entity)('comment_likes')
], CommentToLikes);
exports.default = CommentToLikes;
//# sourceMappingURL=commentToLikes.entities.js.map