import {BadRequestException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from "./entity/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async updateUsersStatus(users: User[], command: string): Promise<void> {
        const userIds: number[] = users.map(user => user.id);

        await this.usersRepository
            .createQueryBuilder('user')
            .update()
            .set({ blocked: command === 'block' })
            .where("id IN (:userIds)", { userIds })
            .execute();
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User> {
        return this.usersRepository.findOne(id);
    }

    findOneByEmail(email: string): Promise<User> {
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

    updateLastLogin(id: number, date: Date): Promise<UpdateResult> {
        return this.usersRepository.update(id, { lastLoginDate: date });
    }

    async create(userDto: CreateUserDto): Promise<User> {
        let existsUser = await this.findOneByEmail(userDto.email);

        if (existsUser) {
            throw new BadRequestException('User already exists');
        }

        let entity = Object.assign(new User(), userDto);
        return this.usersRepository.save(entity);
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async deleteUsers(users: User[]): Promise<void> {
        const userIds: number[] = users.map(user => user.id);

        await this.usersRepository
            .createQueryBuilder('user')
            .delete()
            .where("id IN (:userIds)", { userIds })
            .execute();
    }
}