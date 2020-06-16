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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entity/user.entity");
let UserService = class UserService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async updateUsersStatus(users, command) {
        const userIds = users.map(user => user.id);
        await this.usersRepository
            .createQueryBuilder('user')
            .update()
            .set({ blocked: command === 'block' })
            .where("id IN (:userIds)", { userIds })
            .execute();
    }
    findAll() {
        return this.usersRepository.find();
    }
    findOne(id) {
        return this.usersRepository.findOne(id);
    }
    findOneByEmail(email) {
        return this.usersRepository
            .createQueryBuilder('user')
            .select([
            'user.id',
            'user.email',
            'user.name',
            'user.password',
        ])
            .where('user.email = :email', { email })
            .getOne();
    }
    updateLastLogin(id, date) {
        return this.usersRepository.update(id, { lastLoginDate: date });
    }
    async create(userDto) {
        let existsUser = await this.findOneByEmail(userDto.email);
        if (existsUser) {
            throw new common_1.BadRequestException('User already exists');
        }
        let entity = Object.assign(new user_entity_1.User(), userDto);
        return this.usersRepository.save(entity);
    }
    async remove(id) {
        await this.usersRepository.delete(id);
    }
    async deleteUsers(users) {
        const userIds = users.map(user => user.id);
        await this.usersRepository
            .createQueryBuilder('user')
            .delete()
            .where("id IN (:userIds)", { userIds })
            .execute();
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map