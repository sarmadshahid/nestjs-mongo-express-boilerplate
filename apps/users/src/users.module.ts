import { CommonModule } from '@lib/common';
import { DatabaseConnectionConfig } from '@lib/common/config/config.interface';
import { ConfigService } from '@lib/common/config/config.service';
import { User, UserSchema } from '@lib/common/schemas/user.schema';
import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    CommonModule,
    MongooseModule.forRootAsync({
      imports: [CommonModule],
      useFactory: async (configService: ConfigService) => {
        const databaseConfig = configService.get<DatabaseConnectionConfig>('database');
        const connectionString = `mongodb://${databaseConfig.username}:${databaseConfig.password}@${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.name}?authSource=admin`
        return {
          uri: connectionString
        };
      },
      inject: [ConfigService]
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ])
  ],
  controllers: [UsersController],
  providers: [Logger, UsersService],
})
export class UsersModule {}
