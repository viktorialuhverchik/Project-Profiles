import {BadRequestException, Body, Controller, Delete, Get, Put, UseGuards} from '@nestjs/common';
import { UserService } from "./user.service";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { User } from "./entity/user.entity";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get('all')
    findAll() {
        return this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Put('update-status')
    async updateUsersStatus(
        @Body('users') users: User[],
        @Body('command') command: string
    ) {
        try {
            await this.userService.updateUsersStatus(users, command);

            return true;
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete')
    async deleteUsers(@Body('users') users: User[]) {
        try {
            await this.userService.deleteUsers(users);

            return true;
        } catch (e) {
            throw new BadRequestException(e);
        }
    }
}

