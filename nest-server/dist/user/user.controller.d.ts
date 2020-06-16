import { UserService } from "./user.service";
import { User } from "./entity/user.entity";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    updateUsersStatus(users: User[], command: string): Promise<boolean>;
    deleteUsers(users: User[]): Promise<boolean>;
}
