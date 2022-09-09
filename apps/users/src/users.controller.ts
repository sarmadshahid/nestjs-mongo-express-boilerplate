import { JwtAuthGuard } from '@lib/common/auth/jwt/jwt-auth.guard';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Request,
    UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LocalAuthGuard } from '../../../libs/common/src/auth/local/local-auth.guard';

import { CreateUser } from './models/create-user.model';
import { UpdateUser } from './models/update-user.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getHello(): string {
        return this.usersService.getHello();
    }

    @Post('user')
    async signUp(@Body() user: CreateUser) {
        return await this.usersService.signUp(user);
    }

    @Get('user/:email')
    async getUser(@Param('email') email: string) {
        return await this.usersService.getUser(email);
    }

    @UseGuards(JwtAuthGuard)
    @Put('user/:email')
    async updateUser(@Body() user: UpdateUser, @Param('email') email: string) {
        return await this.usersService.updateUser(user, email);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('user/:email')
    async deleteUser(@Param('email') email: string) {
        return await this.usersService.deleteUser(email);
    }
}
