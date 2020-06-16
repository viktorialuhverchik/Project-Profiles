import { Repository, UpdateResult } from 'typeorm';
import { User } from "./entity/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
export declare class UserService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    updateUsersStatus(users: User[], command: string): Promise<void>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
    updateLastLogin(id: number, date: Date): Promise<UpdateResult>;
    create(userDto: CreateUserDto): Promise<User>;
    remove(id: number): Promise<void>;
    deleteUsers(users: User[]): Promise<void>;
}
