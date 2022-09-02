import { CommonModule } from '@lib/common';
import { MongooseConfigService } from '@lib/common/database/mongoose-config.service';
import { User, UserSchema } from '@lib/common/schemas/user.schema';
import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    CommonModule,
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [Logger, UsersService],
})
export class UsersModule {}
