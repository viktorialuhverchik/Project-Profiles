import { AuthService } from "./auth.service";
import { Request } from "express";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { UserService } from "../user/user.service";
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    login(request: Request): Promise<{
        token: string;
    }>;
    register(userDto: CreateUserDto): Promise<{
        token: string;
    }>;
}
