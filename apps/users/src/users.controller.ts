import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

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
  async createUser(@Body() user: CreateUser) {
    return await this.usersService.createUser(user);
  }

  @Get('user/:email')
  async getUser(@Param('email') email: string) {
    return await this.usersService.getUser(email);
  }

  @Put('user/:email')
  async updateUser(@Body() user: UpdateUser, @Param('email') email: string) {
    return await this.usersService.updateUser(user, email);
  }

  @Delete('user/:email')
  async deleteUser(@Param('email') email: string) {
    return await this.usersService.deleteUser(email);
  }
}
