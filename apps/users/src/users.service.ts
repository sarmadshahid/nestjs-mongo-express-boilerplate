import { DatabaseService } from '@lib/common/database/database.service';
import { User, UserDocument } from '@lib/common/schemas/user.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUser } from './models/create-user.model';
import { UpdateUser } from './models/update-user.model';

@Injectable()
export class UsersService {
    constructor(
        private readonly databaseService: DatabaseService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}
    getHello(): string {
        return 'Hello world from users!';
    }

    async createUser(user: CreateUser) {
        const exists = await this.databaseService.isExists(this.userModel, {
            email: user.email,
        });
        if (exists) {
            throw new HttpException(
                'User already present',
                HttpStatus.BAD_REQUEST,
            );
        }
        await this.databaseService.addItem(this.userModel, user);
    }

    async getUser(email: string) {
        return await this.databaseService.getSingleItem(this.userModel, {
            email: email,
        });
    }

    async updateUser(user: UpdateUser, email: string) {
        return await this.databaseService.updateItem(
            this.userModel,
            { email: email },
            user,
        );
    }

    async deleteUser(email: string) {
        return await this.databaseService.deleteItem(this.userModel, {
            email: email,
        });
    }
}
