import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import {User} from "../user/entity/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<User|null> {
        const user = await this.usersService.findOneByEmail(email);
        if (user && await user.comparePassword(password)) {
            delete user.password;
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        await this.usersService.updateLastLogin(user.id, new Date());
        return {
            token: this.jwtService.sign(payload),
        };
    }
}
