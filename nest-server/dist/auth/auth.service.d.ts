import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { User } from "../user/entity/user.entity";
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UserService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<User | null>;
    login(user: any): Promise<{
        token: string;
    }>;
}
