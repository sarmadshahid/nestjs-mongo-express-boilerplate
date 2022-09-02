import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

import { DatabaseConnectionConfig } from '../config/config.interface';
import { ConfigService } from '../config/config.service';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    const databaseConfig =
      this.configService.get<DatabaseConnectionConfig>('database');
    const connectionString = `mongodb://${databaseConfig.username}:${databaseConfig.password}@${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.name}?authSource=admin`;
    return {
      uri: connectionString,
    };
  }
}
