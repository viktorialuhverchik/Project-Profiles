import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from "./guard/local-auth.guard";
import { AuthService } from "./auth.service";
import { Request } from "express";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { UserService } from "../user/user.service";
import { User } from "../user/entity/user.entity";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() request: Request) {
        return this.authService.login(request.user);
    }

    @Post('register')
    async register(@Body() userDto: CreateUserDto) {
        const user: User = await this.userService.create(userDto);

        return this.authService.login(user);
    }
}
